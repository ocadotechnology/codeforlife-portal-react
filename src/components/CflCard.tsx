import React from 'react';
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions
} from '@mui/material';

import { ImageProps } from 'codeforlife/lib/esm/components';

const CflCard: React.FC<{
  text: { title: string; content: string },
  img: ImageProps,
  btn: { btnText: string, endIcon: JSX.Element, href?: string, target?: string },
}> = ({ text, img, btn }) => {
  const btnHref = btn.href ? btn.href : '';

  return (
    <>
      <Card
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <CardMedia
          component="img"
          height={242}
          image={img.src}
          title={img.alt}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h5">{text.title}</Typography>
          <Typography>{text.content}</Typography>
        </CardContent>
        <CardActions>
          <Button endIcon={btn.endIcon} href={btnHref} target={btn.target}>{btn.btnText}</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CflCard;
