import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  useTheme
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

const SlideHeight = '500px';
const ImageHeight = '400px';

function Item(props: ItemProps): any {
  const theme = useTheme();

  return (
    <Grid container margin={0} spacing={3} bgcolor={theme.palette.info.main} className='flex-center' height={SlideHeight}>
      <Grid xs={6} padding={0}>
        <Grid bgcolor='White' margin={3} className='flex-center' height={ImageHeight}>
          <Image src={props.img.src} alt={props.img.alt} maxWidth={ImageHeight} />
        </Grid>
      </Grid>
      <Grid xs={6} padding={0} className='flex-center'>
        <Typography variant='h5' margin={3}>{props.description}</Typography>
      </Grid>
    </Grid>
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
    <Carousel height={SlideHeight}>
      {
        items.map((item, i) => <Item key={i} img={item.image} description={item.description} />)
      }
    </Carousel>
  );
};

export default TeacherSlides;
