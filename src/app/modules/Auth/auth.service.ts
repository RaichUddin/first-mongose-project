/* eslint-disable prettier/prettier */
import config from '../../config';
import AppError from '../../errors/appError';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from './auth.utils';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../utilits/sendEmail';

const loginUser = async (payload: TLoginUser) => {
  const user = await UserModel.isUserExists(payload.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, ' this User is not found !');
  }

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, ' This User is deleted !');
  }
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, ' This User is Blocked !');
  }

  if (!(await UserModel.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      ' this User pasword is not matched !',
    );
  }
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await UserModel.isUserExists(userData.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, ' this User is not found !');
  }

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, ' This User is deleted !');
  }
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, ' This User is Blocked !');
  }

  if (
    !(await UserModel.isPasswordMatched(payload?.oldPassword, user?.password))
  ) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      ' this User pasword is not matched !',
    );
  }
  const newHasedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt),
  );
  await UserModel.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHasedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );
  return null;
};

const refreshToken = async (token: string) => {
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { userId, iat } = decoded;
  const user = await UserModel.isUserExists(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, ' this User is not found !');
  }

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, ' This User is deleted !');
  }
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, ' This User is Blocked !');
  }
  if (
    user.passwordChangedAt &&
    UserModel.isJWTIssuedBeforePasswordChanged(
      user.passwordChangedAt,
      iat as number,
    )
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_access_expires_in as string,
  );
  return {
    accessToken,
  };
};

const forgetPassword = async (userId: string) => {
  const user = await UserModel.isUserExists(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, ' this User is not found !');
  }

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, ' This User is deleted !');
  }
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, ' This User is Blocked !');
  }
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const resetToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    '10m',
  );
  const resetUiLink = `${config.reset_password_link}?id=${user.id}&token=${resetToken}`;
  sendEmail(user.email, resetUiLink);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const user = await UserModel.isUserExists(payload.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, ' this User is not found !');
  }

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, ' This User is deleted !');
  }
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, ' This User is Blocked !');
  }

  const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;

  if (payload.id !== decoded.userId) {
    throw new AppError(httpStatus.FORBIDDEN, ' This User is not match !');
  }
  const newHasedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt),
  );
  await UserModel.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHasedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );
};

export const AuthService = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
