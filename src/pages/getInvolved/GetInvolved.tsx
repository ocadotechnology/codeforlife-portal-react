import React from "react";
import {
  Unstable_Grid2 as Grid,
  Typography,
  Button,
  Container,
} from "@mui/material";

import BasePage from "pages/BasePage";
import PageBanner from "components/PageBanner";
import Github from "images/github.png";
import Clubs from "images/clubs.png";
import Universities from "images/universities.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { ChevronRightRounded } from "@mui/icons-material";
import GetInvolvedHero from "images/get_involved_hero.png";
import theme from "app/theme";

const CardStyle = {
  // this creates cards that will have matching heights
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
} as React.CSSProperties;

const FirstCard: React.FC = () => {
  return (
    <Card sx={CardStyle}>
      <CardMedia sx={{ height: 242 }} image={Clubs} title="Clubs" />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5">
          Starting a coding club of your own
        </Typography>
        <Typography variant="body1">
          Become a Code for Life ambassador by starting up a coding club. Find
          out more about how you can get involved with this by visiting our
          coding club page.
        </Typography>
      </CardContent>
      <CardContent>
        <Button variant="contained" endIcon={<ChevronRightRounded />}>
          Read more
        </Button>
      </CardContent>
    </Card>
  );
};

const SecondCard: React.FC = () => {
  return (
    <Card sx={CardStyle}>
      <CardMedia sx={{ height: 242 }} image={Github} title="Github" />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5">
          Contribute through code
        </Typography>
        <Typography variant="body1">
          We welcome volunteers from all backgrounds to help us with our coding
          adventure. Take a look at our contribution guide to find out how to
          get involved in our open source projects.
        </Typography>
      </CardContent>
      <CardContent>
        <Button variant="contained" endIcon={<ChevronRightRounded />}>
          Read more
        </Button>
      </CardContent>
    </Card>
  );
};

const ThirdCard: React.FC = () => {
  return (
    <Card sx={CardStyle}>
      <CardMedia
        sx={{ height: 242 }}
        image={Universities}
        title="Universities"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5">
          University partnerships
        </Typography>
        <Typography sx={{ flexGrow: 1 }} variant="body1">
          Please get in touch at codeforlife@ocado.com if you are interested in
          working on Code for Life projects with your students including:
          coding, user experience, data analytics and new feature design.
        </Typography>
      </CardContent>
      <CardContent>
        <Button variant="contained" endIcon={<ChevronRightRounded />}>
          Read more
        </Button>
      </CardContent>
    </Card>
  );
};

const GetInvolvedBanner: React.FC = () => {
  return (
    <PageBanner
      text={{
        title: "Get involved",
        content:
          "How you can get involved with the creation of Code for Life products and resources",
      }}
      img={{ alt: "Get involved", src: GetInvolvedHero }}
    />
  );
};

const GetInvolved: React.FC = () => {
  return (
    <BasePage>
      <GetInvolvedBanner />
      <Container>
        <Grid spacing={4} container direction="row" p={4} xs={12}>
          <Grid xs={12} md={6} lg={4}>
            <FirstCard />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <SecondCard />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <ThirdCard />
          </Grid>
        </Grid>
      </Container>
    </BasePage>
  );
};

export default GetInvolved;
