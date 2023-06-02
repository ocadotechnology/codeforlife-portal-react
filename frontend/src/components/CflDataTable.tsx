import { DeleteOutlined, SecurityOutlined } from '@mui/icons-material';
import {
  styled,
  tableCellClasses,
  useTheme,
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Stack,
  Typography
} from '@mui/material';
import React from 'react';

const TableCellStyled = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: theme.palette.info.dark,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    background: theme.palette.action.hover,
    color: theme.palette.common.black
  }
}));

const CflDataTable: React.FC = () => {
  const randomStudentNames = [
    'John Doe',
    'John Smith',
    'Jane Doe',
    'Jane Smith',
    'John Doe',
    'John Smith'
  ];

  const [checked, setChecked] = React.useState<boolean[]>(
    Array(randomStudentNames.length).fill(false)
  );

  const handleSelectAllClick: () => void = () => {
    if (checked.includes(true)) {
      setChecked(Array(randomStudentNames.length).fill(false));
    } else {
      setChecked(Array(randomStudentNames.length).fill(true));
    }
  };
  const handleChange: (idx: number) => void = (idx: number) => {
    const newChecked = [...checked];
    newChecked[idx] = !checked[idx];
    setChecked(newChecked);
  };
  const theme = useTheme();

  return (
    <Box>
      <pre>{JSON.stringify(checked, null, 2)}</pre>
      <pre>
        checked.includes(true): {checked.includes(true) ? 'true' : 'false'}
      </pre>
      <pre>
        {'checked.every(() => true)'}:
        {checked.every((el) => el) ? 'true' : 'false'}
      </pre>
      <Table>
        <TableHead>
          <TableRow>
            <TableCellStyled>Student details</TableCellStyled>
            <TableCellStyled padding="checkbox">
              <Checkbox
                checked={checked.every((el) => el)}
                indeterminate={
                  checked.includes(true) && !checked.every((el) => el)
                }
                onChange={handleSelectAllClick}
              />
            </TableCellStyled>
            <TableCellStyled>Action</TableCellStyled>
          </TableRow>
        </TableHead>
        <TableBody>
          {randomStudentNames.map((studentName, idx) => (
            <TableRow key={`${studentName}-${idx}`}>
              <TableCellStyled>{studentName}</TableCellStyled>
              <TableCellStyled padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={checked[idx]}
                  onChange={() => {
                    handleChange(idx);
                  }}
                />
              </TableCellStyled>
              <TableCellStyled>Action</TableCellStyled>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Typography variant="subtitle1">
          {checked.filter((el) => el).length} / {checked.length} selected
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button disabled={!checked.includes(true)}>Release</Button>
        <Button disabled={!checked.includes(true)}>Move</Button>
        <Button
          disabled={!checked.includes(true)}
          endIcon={<SecurityOutlined />}
        >
          Reset password and login link
        </Button>
        <Button
          disabled={!checked.includes(true)}
          endIcon={<DeleteOutlined />}
          color="error"
        >
          Delete
        </Button>
      </Stack>
    </Box>
  );
};

export default CflDataTable;
