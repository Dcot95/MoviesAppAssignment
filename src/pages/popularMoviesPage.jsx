import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getPopularMovies } from "../api/tmdb-api";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const PopularMoviesPage = (props) => {
  const { data, error, isLoading, isError } = useQuery("popular", getPopularMovies);
  

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];

  return (
    <PageTemplate
      title='Popular Movies'
      movies={movies}
      action={(movie) => {
        return <AddToMustWatchIcon movie={movie} />
      }}
    />
  );
};
export default PopularMoviesPage;
