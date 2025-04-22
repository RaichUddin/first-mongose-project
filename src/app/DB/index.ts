/* eslint-disable prettier/prettier */

import config from '../config';
import { USER_ROLE } from '../modules/user/user.constant';
import { UserModel } from '../modules/user/user.model';

const superUser = {
  id: '0001',
  email: 'rabbitrade10@gmail.com',
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExists = await UserModel.findOne({
    role: USER_ROLE.superAdmin,
  });
  if (!isSuperAdminExists) {
    await UserModel.create(superUser);
    console.log('Super Admin Created Successfully');
  } else {
    console.log('Super Admin Already Exists');
  }
};

export default seedSuperAdmin;
