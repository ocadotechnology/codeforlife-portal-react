import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  Stack,
  Divider,
  Link
} from '@mui/material';

const TableOfContents: React.FC<{
  contents: Array<{ header: string, element: React.ReactElement }>
}> = ({ contents }) => {
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
            <Link
              key={index}
              onClick={() => { handleHeaderClick(index); }}
            >
              {content.header}
            </Link>
          );
        })}
      </Stack>
    );
  }

  return (
    <Grid container>
      <Grid xs={12} sm={6}>
        {generateLinkStack(0, halfLength)}
      </Grid>
      <Grid xs={12} sm={6}>
        {generateLinkStack(halfLength, contents.length)}
      </Grid>
      {contents.map((content, index) => (
        <Grid key={index} xs={12}>
          <Divider />
          <Typography ref={headerRefs[index]} variant='h6'>
            {index + 1}. {content.header}
          </Typography>
          {content.element}
        </Grid>
      ))}
    </Grid>
  );
};

export default TableOfContents;
