import React, { useContext  } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { TvsContext } from "../../contexts/tvsContext";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

export default function TvCard({ tv, action }) {
  const { favourites, addToFavourites, mustWatch, addToMustWatch } = useContext(TvsContext);

  if (favourites.find((id) => id === tv.id)) {
    tv.favourite = true;
  } else {
    tv.favourite = false
  }

  if (mustWatch.find((id) => id === tv.id)) {
    tv.mustWatch = true;
  } else {
    tv.mustWatch = false
  }

  return (
    <Card sx={styles.card}>
      <CardHeader
        sx={styles.header}
        avatar={
          tv.favourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
      }
        title={
          <Typography variant="h5" component="p">
            {tv.title}{" "}
          </Typography>
        }
        action={
          tv.mustWatch ? (
            <Avatar sx={styles.avatar}>
              <PlaylistAddIcon />
            </Avatar>
          ) : null
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          tv.poster_path
            ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {tv.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {tv.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
      {action(tv)}
        <Link to={`/tvs/${tv.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
