interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

export const getUser = (): UserData => {
  // TODO: get user data
  return {
    firstName: 'John',
    lastName: 'Doe',
    email: 'aa@aa.aa'
  };
};

interface SchoolData {
  schoolName: string;
  schoolPostcode: string;
  schoolCountry: string;
  accessCode: string;
}
export const getSchool = (): SchoolData => {
  // TODO: get school data
  return {
    schoolName: 'Real School',
    schoolPostcode: 'AB1 2CD',
    schoolCountry: 'United States of America',
    accessCode: 'AB123'
  };
};

export interface TeacherData {
  teacherName: string;
  isTeacherAdmin: boolean;
  teacherEmail: string;
  teacherClass: string;
}

export const getTeachersData = (): TeacherData[] => {
  // TODO: implement get teachers data from the backend
  return [
    {
      teacherName: 'John Doe',
      isTeacherAdmin: true,
      teacherEmail: 'aa@aa.aa',
      teacherClass: 'Class 1'
    },
    {
      teacherName: 'Jane Doe',
      isTeacherAdmin: false,
      teacherEmail: 'ghejkhrjh@grrtr.ghr',
      teacherClass: 'Class 2'
    },
    {
      teacherName: 'Doe John',
      isTeacherAdmin: true,
      teacherEmail: 'em@il.com',
      teacherClass: 'Class 3'
    }
  ];
};

interface ClassesDataProps {
  className: string;
  accessCode: string;
  teacher: string;
}

export const getClassesData = (): ClassesDataProps[] => {
  // TODO: get classes data from API
  return [
    {
      className: 'Class 1',
      accessCode: 'AB123',
      teacher: 'John Doe'
    },
    {
      className: 'Class 2',
      accessCode: 'AB133',
      teacher: 'John Dave'
    },
    {
      className: 'Class 3',
      accessCode: 'AB143',
      teacher: 'John Due'
    }
  ];
};
