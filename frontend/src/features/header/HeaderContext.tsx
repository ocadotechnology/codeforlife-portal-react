import React from 'react';

const HeaderContext = React.createContext<undefined | {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}>(undefined);

export default HeaderContext;
