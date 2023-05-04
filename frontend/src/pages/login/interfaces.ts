import { userType } from 'components/types';

export interface LoginWindowProps {
  userType: userType
  children: React.ReactNode
}

export interface ColourProps {
  [k: string]: string;
  student: string;
  teacher: string;
  independent: string;
}