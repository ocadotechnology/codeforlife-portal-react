import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  Divider
} from '@mui/material';

export interface TableOfContentsProps {
  contents: Array<{ header: string, element: React.ReactElement }>
}

const TableOfContentsChildren: React.FC<TableOfContentsProps> = ({ contents }) => {
  return (
    <Grid container spacing={0}>
      {contents.map((content, index) => (
        <Grid key={index} xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography
            variant='h5'
          >
            {index + 1}. {content.header}
          </Typography>
          {content.element}
        </Grid>
      ))}
    </Grid>
  );
};

export default TableOfContentsChildren;
