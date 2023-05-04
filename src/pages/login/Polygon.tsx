import theme from 'app/theme';
import React from 'react';
import { userType } from 'components/types';
import { ColourProps } from './interfaces';

const polygonStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '10%',
  zIndex: 1,
  right: '-10%'
};

const polygonColour: ColourProps = {
  student: theme.palette.primary.main,
  teacher: theme.palette.tertiary.main,
  independent: theme.palette.secondary.main
};

const Polygon: React.FC<{ userType: userType }> = ({ userType }) => {
  return (
    <svg
      style={polygonStyle}
      width="140px"
      height="160px"
      viewBox="0 0 140 160"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Polygon</title>
      <g
        id="Secondary/Login/Teacher"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Teacher-login-1---stage-2"
          transform="translate(-913.000000, -435.000000)"
          fill={polygonColour[userType]}
        >
          <polygon
            id="Polygon"
            points="983 435 1052.28203 475 1052.28203 555 983 595 913.717968 555 913.717968 475"
          ></polygon>
        </g>
      </g>
    </svg>
  );
};

export default Polygon;
