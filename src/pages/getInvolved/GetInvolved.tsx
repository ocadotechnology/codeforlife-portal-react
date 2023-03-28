import React from "react";
import { Container, Unstable_Grid2 as Grid, Paper } from "@mui/material";

import BasePage from "pages/BasePage";
import { PageBanner } from "pages/aboutUs/AboutUs";
import Github from "images/github.png";
import Clubs from "images/clubs.png";
import Card from "components/Card";
import Universities from "images/universities.png";
import { FULL_HEIGHT } from "constants/sizes";

const GetInvolved: React.FC = () => {
  return (
    <BasePage>
      <Container>
        <Grid
          spacing={1}
          container
          direction="row"
          justifyContent="center"
          p={0}
          xs={12}
        >
          <Grid p="inherit" xs={12} md={6} lg={4} >
            <Card
              title="Starting a coding club of your own"
              description="Become a Code for Life ambassador by starting up a coding club. Find out more about how you can get involved with this by visiting our coding club page."
              img={{ alt: "Github image", src: Clubs }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <Card
              title="Contribute through code"
              description="We welcome volunteers from all backgrounds to help us with our coding adventure. Take a look at our contribution guide to find out how to get involved in our open source projects."
              img={{ alt: "Github image", src: Github }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <Card
              title="University partnerships"
              description="Please get in touch at codeforlife@ocado.com if you are interested in working on Code for Life projects with your students including: coding, user experience, data analytics and new feature design."
              img={{ alt: "Github image", src: Universities }}
            />
          </Grid>
        </Grid>
      </Container>
    </BasePage>
  );
};

export default GetInvolved;
/*
 */
