import React from 'react';
import { styled } from '@mui/material/styles';
import {
  TableCell,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableBody
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

export const TableCellStyled = styled(TableCell)(({ theme }) => ({
  outline: `1px solid ${theme.palette.common.white}`,
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

export const TableRowStyled = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

interface CflTableProps {
  titles: string[];
  children: React.ReactNode;
}
const CflTable: React.FC<CflTableProps> = ({
  titles,
  children
}): JSX.Element => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRowStyled>
            {titles.map((title) => (
              <TableCellStyled key={`table-title-${title}`}>
                {title}
              </TableCellStyled>
            ))}
          </TableRowStyled>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CflTable;
