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
  description?: React.ReactNode;
  contents: Array<{ header: string, element: React.ReactElement }>;
}

export const ids = {
  leftLinkStack: 'left-link-stack',
  rightLinkStack: 'right-link-stack'
};

const TableOfContents: React.FC<TableOfContentsProps> = ({
  description,
  contents
}) => {
  const headerRefs = contents.map(() => React.useRef<HTMLSpanElement>(null));
  const halfLength = Math.ceil(contents.length / 2);

  function handleHeaderClick(index: number): void {
    const header = headerRefs[index].current;
    if (header !== null) header.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function generateLinkStack(
    stackId: string,
    sliceStart: number,
    sliceEnd: number
  ): React.ReactElement {
    return (
      <Stack id={stackId} gap={2}>
        {contents.slice(sliceStart, sliceEnd).map((content, index) => {
          index += sliceStart;
          return (
            <Box key={index}>
              <Typography display='inline'>
                {index + 1}.{' '}
              </Typography>
              <Link
                className='body'
                onClick={() => { handleHeaderClick(index); }}
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
      {description !== undefined &&
        <Grid xs={12} mb={5}>
          {description}
        </Grid>
      }
      <Grid container xs={12} spacing={2}>
        <Grid id={ids.leftLinkStack} xs={12} sm={6}>
          {generateLinkStack(ids.leftLinkStack, 0, halfLength)}
        </Grid>
        <Grid id={ids.rightLinkStack} xs={12} sm={6}>
          {generateLinkStack(ids.rightLinkStack, halfLength, contents.length)}
        </Grid>
      </Grid>
      {contents.map((content, index) => (
        <Grid key={index} xs={12} mt={index === 0 ? 2 : 0}>
          <Divider sx={{ my: 2 }} />
          <Typography
            ref={headerRefs[index]}
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

export default TableOfContents;
