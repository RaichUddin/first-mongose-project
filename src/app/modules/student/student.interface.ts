export type Guardian = {
  fatherName: string;
  fatherOcupasion: string;
  fatherContactNumber: string;
  motherName: string;
  motherOcupasion: string;
  motherContactNumber: string;
};
export type LocalGuardian = {
  name: string;
  ocupasion: string;
  contactNumber: string;
  address: string;
};
export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type Student = {
  id: string;
  name: UserName;

  email: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  contactNumber: string;
  emergencyContactNumber: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage: string;
  isActive: 'active' | 'inactive';
};
