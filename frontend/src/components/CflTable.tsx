import React from 'react';
import { styled } from '@mui/material/styles';
import {
  TableCell,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Stack,
  StackProps
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

export const TableCellElementStyled = styled(TableCell)(({ theme }) => ({
  outline: `1px solid ${theme.palette.common.white}`,
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white
  }
}));

export interface CflTableCellProps {
  children: React.ReactNode;
  alignItems?: StackProps['alignItems'];
  justifyContent?: StackProps['justifyContent'];
  direction?: StackProps['direction'];
}
export const CflTableCellElement: React.FC<CflTableCellProps> = ({
  children,
  alignItems = 'center',
  justifyContent = 'flex-start',
  direction = 'row'
}) => {
  return (
    <TableCellElementStyled>
      <Stack
        alignItems={alignItems}
        justifyContent={justifyContent}
        direction={direction}
        columnGap={3}
      >
        {children}
      </Stack>
    </TableCellElementStyled>
  );
};

export const TableRowStyled = styled(TableRow)(({ theme }) => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

export const CflTableBody: React.FC<{
  children: React.ReactNode;
}> = ({ children }): JSX.Element => {
  return (
    <TableRowStyled>
      {React.Children.map(children, (child) => (
        <>{child}</>
      ))}
    </TableRowStyled>
  );
};

interface CflTableProps {
  titles: string[];
  children: React.ReactNode;
  className?: string;
}
const CflTable: React.FC<CflTableProps> = ({
  titles,
  children,
  className
}): JSX.Element => {
  return (
    <TableContainer>
      <Table
        className={className}
        style={{ display: 'table' }}
      >
        <TableHead>
          <TableRowStyled>
            {titles.map((title) => (
              <CflTableCellElement key={`table-title-${title}`}>
                {title}
              </CflTableCellElement>
            ))}
          </TableRowStyled>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CflTable;
