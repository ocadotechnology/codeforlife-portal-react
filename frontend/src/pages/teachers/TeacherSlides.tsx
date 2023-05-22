import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Paper,
  Typography
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Image, ImageProps } from 'codeforlife/lib/esm/components';
import IconStepByStepImage from '../../images/icon_step_by_step.png';
import IconUkFlagImage from '../../images/icon_uk_flag.png';
import IconTrackingImage from '../../images/icon_tracking.png';

interface ItemProps {
  key: number,
  img: ImageProps,
  description: string
};

function Item(props: ItemProps): any {
  return (
    <Paper>
      <Grid container spacing={3}>
        <Grid xs={6}>
          <Image src={props.img.src} alt={props.img.alt} maxWidth='500px' />
        </Grid>
        <Grid xs={6}>
          <Typography>{props.description}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

const TeacherSlides: React.FC = () => {
  const items = [
    {
      image: {
        alt: 'IconStepByStepImage',
        src: IconStepByStepImage
      },
      description: 'The step-by-step nature of Rapid Router makes it simple for you and your students to gain experience quickly.'
    },
    {
      image: {
        alt: 'IconUkFlagImage',
        src: IconUkFlagImage
      },
      description: 'Our resources are aligned to the UK National computing curriculum, so you can gain the knowledge and confidence you need.'
    },
    {
      image: {
        alt: 'IconTrackingImage',
        src: IconTrackingImage
      },
      description: 'Easy to use teacher dashboard includes scores to track student progress as well as comprehensive teaching resources.'
    }
  ];

  return (
    <Carousel>
      {
        items.map((item, i) => <Item key={i} img={item.image} description={item.description} />)
      }
    </Carousel>
  );
};

export default TeacherSlides;
