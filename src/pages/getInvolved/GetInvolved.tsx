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
import { ImageTextProps } from "components/interfaces/interfaces";

const CardStyle = {
  // this creates cards that will have matching heights
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
} as React.CSSProperties;

const GetInvolvedCard: React.FC<ImageTextProps> = ({ text, img }) => {
  return (
    <Card sx={CardStyle}>
      <CardMedia sx={{ height: 242 }} image={img.src} title={img.alt} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5">
          {text.title}
        </Typography>
        <Typography variant="body1">{text.content}</Typography>
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
            <GetInvolvedCard
              text={{
                title: "Starting a coding club of your own",
                content:
                  "Become a Code for Life ambassador by starting up a coding club. Find out more about how you can get involved with this by visiting our coding club page.",
              }}
              img={{
                alt: "Clubs",
                src: Clubs,
              }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <GetInvolvedCard
              text={{
                title: "Contribute through code",
                content:
                  "We welcome volunteers from all backgrounds to help us with our coding adventure. Take a look at our contribution guide to find out how to get involved in our open source projects.",
              }}
              img={{
                alt: "Github",
                src: Github,
              }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <GetInvolvedCard
              text={{
                title: "University partnerships",
                content:
                  "Please get in touch at codeforlife@ocado.com if you are interested in working on Code for Life projects with your students including coding, user experience, data analytics and new feature design.",
              }}
              img={{
                alt: "Universities",
                src: Universities,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </BasePage>
  );
};

export default GetInvolved;
