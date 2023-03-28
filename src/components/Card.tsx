import React from "react";
import { Image } from "codeforlife/lib/esm/components";
import { Paper, Typography, Button, Box } from "@mui/material";
import { Unstable_Grid2 as Grid } from "@mui/material";
import {
  FULL_WIDTH,
  FULL_HEIGHT,
  FIT_CONTENT_HEIGHT,
} from "../constants/sizes";
import { ChevronRightRounded } from "@mui/icons-material";

interface CardProps {
  title: string;
  description: string;
  img: { alt?: string; src: string };
}

const test = (color: string) => {
  return { outline: `2px dashed ${color}` };
};

const boxShadow = {
  boxShadow: "0rem 0.5rem 0.8rem 0rem rgba(0, 0, 0, 0.2)",
};

const bottomCardFlexBox = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  alignItems: "flex-start",
  alignContent: "flex-start",
  justifyContent: "flex-end",
  background: "lime",
  flexWrap: "wrap",
};

const Card: React.FC<CardProps> = ({ title, description, img }) => {
  return (
    <Paper elevation={7} sx={{ height: "100%", background: "#00f0f0" }}>
      <Image alt={img.alt || ""} src={img.src} />
      <Box px={3} pb={3} sx={bottomCardFlexBox}>
        <Box sx={{background:"blue"}}>
          <Typography variant="h5">{title}</Typography>
        </Box>
        <Box sx={{background:"green"}}>
          <Typography variant="body1">{description}</Typography>
        </Box>
        <Box sx={{background:"red", height:"100%"}}>
          <Button endIcon={<ChevronRightRounded />}>Read more</Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Card;
/*
 */
