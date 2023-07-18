import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  heartIcon: {
    color: "red",
    fontSize: 40,
  },
};

const TvHeader = (props) => {
  const tv = props.tv;
  const favouriteTvs = JSON.parse(localStorage.getItem("tvfavourites"));
  const isTvFavorite = favouriteTvs.some((t) => t.id === tv.id);
  
  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back">
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>
      
        {isTvFavorite ? (
          <Avatar sx={styles.avatar}>
          <FavoriteIcon style={styles.heartIcon} />
          </Avatar>
        ) : null}
      
      <Typography variant="h4" component="h3">
        {tv.title}
        {"   "}
        <a href={tv.homepage}>
          <HomeIcon color="primary" fontSize="large" />
        </a>
        <br />
        <span>{`${tv.tagline}`} </span>
      </Typography>
      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default TvHeader;
