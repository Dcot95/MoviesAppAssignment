import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieList from "../movieList";

const styles = {
  root: {
    padding: "20px",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 2,
    right: 2,
  },
};

function MovieListPageTemplate({ movies, title, vote_average, action }) {
  const [titleFilter, setTitleFilter] = useState("");
  const [vote_averageFilter, setVote_averageFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [release_dateFilter, setRelease_dateFilter] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(titleFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      // Convert vote_averageFilter to a number for comparison
      const filterValue = parseFloat(vote_averageFilter);
      return vote_averageFilter !== "" ? m.vote_average === filterValue : true;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      // Convert release_dateFilter to a comparable format (e.g., timestamp)
      const filterValue = Date.parse(release_dateFilter);
      // Check if the release_date of the movie is equal to the filter value
      return release_dateFilter !== "" ? Date.parse(m.release_date) === filterValue : true;
    });

  const handleChange = (type, value) => {
    if (type === "title") setTitleFilter(value);
    else if (type === "vote_average") setVote_averageFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else setRelease_dateFilter(value);
  };

  return (
   <>
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <Header title={title} />
        </Grid>
        <Grid item container spacing={5}>
        <MovieList action={action} movies={displayedMovies} />
        </Grid>
      </Grid>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={handleChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
          release_dateFilter={release_dateFilter}
          vote_averageFilter={vote_averageFilter}
        />
      </Drawer>
    </>  
  );
}
export default MovieListPageTemplate;
