import React from 'react';
import {
  Typography,
  Button,
  ButtonProps,
  Card,
  CardContent,
  CardMedia,
  CardMediaProps,
  CardActions,
  CardProps
} from '@mui/material';

export interface CflCardProps extends CardProps {
  text: {
    title: string;
    content: string;
  };
  mediaProps: {
    image: NonNullable<CardMediaProps['image']>;
    title: NonNullable<CardMediaProps['title']>;
  };
  buttonProps: ButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

const CflCard: React.FC<CflCardProps> = ({
  text,
  mediaProps,
  buttonProps,
  style,
  ...otherCardProps
}) => {
  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        maxWidth: '400px',
        ...style
      }}
      {...otherCardProps}
    >
      <CardMedia
        component="img"
        height={242}
        {...mediaProps}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5">
          {text.title}
        </Typography>
        <Typography mb={0}>
          {text.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button {...buttonProps} />
      </CardActions>
    </Card>
  );
};

export default CflCard;
