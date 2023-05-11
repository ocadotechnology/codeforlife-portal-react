export interface DefaultLoginProps {
  username: string;
  password: string;
}

export const AccessCodeLoginProps = {
  accessCode: ''
};

export const SchoolStudentLoginProps = {
  firstname: '',
  password: '',
  accessCode: ''
};

export interface ShapeColorProps {
  student: string;
  teacher: string;
  independent: string;
}
