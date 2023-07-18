import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateTvListPage";
import { getTvs } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'

const TvHomePage = () => {
  const { data, error, isLoading, isError } = useQuery("discover", getTvs);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const tvs = data ? data.results : [];


  return (
    <PageTemplate
      title="Discover Tvs"
      tvs={tvs}
      action={(tv) => {
        return <AddToFavouritesIcon tv={tv} />
      }}
    />
  );
};
export default TvHomePage;
