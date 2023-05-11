import theme from 'app/theme';
import React from 'react';
import { userType } from 'components/types';
import { ShapeColorProps } from './interfaces';

export const circleStyle: React.CSSProperties = {
  position: 'absolute',
  top: '10%',
  zIndex: 1,
  left: '-10%'
};
const circleColours: ShapeColorProps = {
  independent: theme.palette.primary.main,
  student: theme.palette.tertiary.main,
  teacher: theme.palette.secondary.main
};

const Circle: React.FC<{ userType: userType }> = ({ userType }) => {
  return (
    <svg
      style={circleStyle}
      width="160px"
      height="160px"
      viewBox="0 0 160 160"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Oval</title>
      <g
        id="Secondary/Login/Teacher"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Teacher-login-1---stage-2"
          transform="translate(-375.000000, -210.000000)"
          fill={circleColours[userType]}
        >
          <circle id="Oval" cx="455" cy="290" r="80"></circle>
        </g>
      </g>
    </svg>
  );
};

export default Circle;
