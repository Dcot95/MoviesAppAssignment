import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import { getTvGenres } from "../../api/tmdb-api";
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

export default function FilterTvsCard(props) {
  const { data, error, isLoading, isError } = useQuery("tvgenres", getTvGenres);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const tvgenres = data.tvgenres;
  if (tvgenres[0].name !== "All") {
    tvgenres.unshift({ id: "0", name: "All" });
  }

  const handleUserImput = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); // NEW
  };

  const handleTextChange = (e, props) => {
    handleUserImput(e, "title", e.target.value);
  };

  const handleTvGenreChange = (e) => {
    handleUserImput(e, "tvgenre", e.target.value);
  };

  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <FilterAltIcon fontSize="large" />
            Filter the tvs.
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
            <InputLabel id="tvgenre-label">TvGenre</InputLabel>
            <Select
              labelId="tvgenre-label"
              id="tvgenre-select"
              value={props.tvgenreFilter}
              onChange={handleTvGenreChange}
            >
              {tvgenres.map((tvgenre) => {
                return (
                  <MenuItem key={tvgenre.id} value={tvgenre.id}>
                    {tvgenre.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SortIcon fontSize="large" />
            Sort the tvs.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
