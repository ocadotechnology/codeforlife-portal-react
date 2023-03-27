import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  Stack,
  Divider,
  Link,
  Box
} from '@mui/material';

export interface TableOfContentsProps {
  contents: Array<{ header: string, element: React.ReactElement }>
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ contents }) => {
  const headerRefs = contents.map(() => React.useRef<HTMLSpanElement>(null));
  const halfLength = Math.ceil(contents.length / 2);

  function handleHeaderClick(index: number): void {
    const header = headerRefs[index].current;
    if (header !== null) header.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function generateLinkStack(sliceStart: number, sliceEnd: number): React.ReactElement {
    return (
      <Stack>
        {contents.slice(sliceStart, sliceEnd).map((content, index) => {
          index += sliceStart;
          return (
            <Box key={index}>
              <Typography display='inline'>
                {index + 1}.{' '}
              </Typography>
              <Link
                display='inline'
                style={{ color: 'black', textDecorationColor: 'black' }}
                sx={{ ':hover': { fontWeight: 'bold' } }}
                onClick={() => { handleHeaderClick(index); }}
                underline='always'
              >
                {content.header}
              </Link>
            </Box>
          );
        })}
      </Stack>
    );
  }

  return (
    <Grid container spacing={0}>
      <Grid xs={12} sm={6}>
        {generateLinkStack(0, halfLength)}
      </Grid>
      <Grid xs={12} sm={6}>
        {generateLinkStack(halfLength, contents.length)}
      </Grid>
      {contents.map((content, index) => (
        <Grid key={index} xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography
            ref={headerRefs[index]}
            variant='h6'
            fontWeight='bold'
            mb={3}
          >
            {index + 1}. {content.header}
          </Typography>
          {content.element}
        </Grid>
      ))}
    </Grid>
  );
};

export default TableOfContents;
