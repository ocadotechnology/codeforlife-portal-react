import React from "react";
import {
  Container,
  Unstable_Grid2 as Grid,
  Paper,
  Typography,
  Button,
} from "@mui/material";

import BasePage from "pages/BasePage";
import { PageBanner } from "pages/aboutUs/AboutUs";
import Github from "images/github.png";
import Clubs from "images/clubs.png";
import Universities from "images/universities.png";
import { FULL_HEIGHT } from "constants/sizes";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { ChevronRightRounded } from "@mui/icons-material";

const GetInvolved: React.FC = () => {
  return (
    <BasePage>
      <Container>
        <Grid
          spacing={1}
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          p={0}
          xs={12}
        >
          <Grid p="inherit" xs={12} md={6} lg={4}>
            <Card sx={{height:"100%"}}>
              <CardMedia sx={{ height: "16rem"}} image={Clubs} title="Clubs" />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Starting a coding club of your own
                </Typography>
                <Typography variant="body1">
                  Become a Code for Life ambassador by starting up a coding
                  club. Find out more about how you can get involved with this
                  by visiting our coding club page.
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" endIcon={<ChevronRightRounded />}>
                  Read more
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <Card sx={{height: "100%"}}>
              <CardMedia sx={{ height: "16rem" }} image={Github} title="Github" />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Contribute through code
                </Typography>
                <Typography variant="body1">
                  We welcome volunteers from all backgrounds to help us with our
                  coding adventure. Take a look at our contribution guide to
                  find out how to get involved in our open source projects.
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" endIcon={<ChevronRightRounded />}>
                  Read more
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <Card sx={{height: "100%"}}>
              <CardMedia sx={{ height: "16rem" }} image={Universities} title="Universities" />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  University partnerships
                </Typography>
                <Typography variant="body1">
                  Please get in touch at codeforlife@ocado.com if you are
                  interested in working on Code for Life projects with your
                  students including: coding, user experience, data analytics
                  and new feature design.
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" endIcon={<ChevronRightRounded />}>
                  Read more
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </BasePage>
  );
};

export default GetInvolved;
/*

<Card
description="We welcome volunteers from all backgrounds to help us with our coding adventure. Take a look at our contribution guide to find out how to get involved in our open source projects."
  img={{ alt: "Github image", src: Github }}
  />
<Card
title="University partnerships"
description="Please get in touch at codeforlife@ocado.com if you are interested in working on Code for Life projects with your students including: coding, user experience, data analytics and new feature design."
img={{ alt: "Github image", src: Universities }}
/>
*/
