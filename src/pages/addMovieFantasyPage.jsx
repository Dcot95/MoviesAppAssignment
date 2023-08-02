import React from "react";
import PageTemplate from "../components/templateMoviePage";
import FantasyForm from "../components/fantasyForm";
import Spinner from "../components/spinner";

const FantasyMoviePage = (props) => {
  
/*  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  */
  return (
   // <PageTemplate>
      <FantasyForm />
   // </PageTemplate>
  );
};

export default FantasyMoviePage;
