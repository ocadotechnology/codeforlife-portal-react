interface UserData {
  firstName: string;
  lastName: string;
}

export const getUser = (): UserData => {
  // TODO: get user data
  return {
    firstName: 'John',
    lastName: 'Doe'
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
    schoolCountry: 'United Kingdom',
    accessCode: 'AB123'
  };
};

interface TeacherData {
  name: string;
  isAdmin: boolean;
  email: string;
}

export const getTeachersData = (): TeacherData[] => {
  // TODO: implement get teachers data from the backend
  return [
    {
      name: 'John Doe',
      isAdmin: true,
      email: 'aa@aa.aa'
    },
    {
      name: 'Jane Doe',
      isAdmin: false,
      email: 'ghejkhrjh@grrtr.ghr'
    },
    {
      name: 'Doe John',
      isAdmin: true,
      email: 'em@il.com'
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
