import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import { getGenres, getYears } from "../../api/tmdb-api";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useQuery } from "react-query";
import Spinner from '../spinner'

const styles = {
  root: {
    maxWidth: 345,
  },
  media: { height: 300 },

  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

export default function FilterMoviesCard(props) {
  const { data: genresData, error: genresError, isLoading: genresLoading, isError: genresIsError } = useQuery("genres", getGenres);
  const { data: yearsData, error: yearsError, isLoading: yearsLoading, isError: yearsIsError } = useQuery("years", getYears);

  if (genresLoading || yearsLoading) {
    return <Spinner />;
  }

  if (genresError || yearsError) {
    return <h1>{genresError?.message || yearsError?.message}</h1>;
  }

  const genres = genresData?.genres || []; // Add a defensive check for genres
  if (genres.length > 0 && genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const years = yearsData?.years || []; // Add a defensive check for providers
  if (years.length > 0 && years[0].name !== "All") {
    years.unshift({ id: "0", name: "All" });
  }

  const handleUserInput = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e) => {
    handleUserInput(e, "title", e.target.value);
  };

  const handleVoteChange = (e) => {
    handleUserInput(e, "vote_average", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleUserInput(e, "genre", e.target.value);
  };

  const handleYearChange = (e) => {
    handleUserInput(e, "year", e.target.value);
  };

  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <FilterAltIcon fontSize="large" />
            Filter the movies.
          </Typography>
          <TextField
            sx={styles.formControl}
            id="filled-search"
            label="Search field"
            type="search"
            value={props.titleFilter}
            variant="filled"
            onChange={handleTextChange}
          />
          <FormControl sx={styles.formControl}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={props.genreFilter}
              onChange={handleGenreChange}
            >
              {genres.map((genre) => {
                return (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            sx={styles.formControl}
            id="filled-search"
            label="Year"
            type="search"
            value={props.yearFilter}
            variant="filled"
            onChange={handleYearChange}
          />
          <TextField
            sx={styles.formControl}
            id="filled-search"
            label="Vote Average"
            type="search"
            value={props.vote_averageFilter}
            variant="filled"
            onChange={handleVoteChange}
          />
        </CardContent>
      </Card>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SortIcon fontSize="large" />
            Sort the movies.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
