import React, { useState } from "react";

export const TvsContext = React.createContext(null);

const TvsContextProvider = (props) => {
  const [myTvReviews, setMyTvReviews] = useState( {} ) 
  const [tvfavourites, setTvFavourites] = useState([]);
  const [tvmustWatch, setTvMustWatch] = useState([]);

  const addToTvFavourites = (tv) => {
    let updatedTvFavourites = [...tvfavourites];
    if (!tvfavourites.includes(tv.id)) {
      updatedTvFavourites.push(tv.id);
    }
    setTvFavourites(updatedTvFavourites);
  };

  const addToTvMustWatch = (tv) => {
    let updatedTvMustWatch = [...tvmustWatch];
    if (!tvmustWatch.includes(tv.id)) {
      updatedTvMustWatch.push(tv.id);
    }
    setTvMustWatch(updatedTvMustWatch);
    //console.log(updatedMustWatch);
  };


  const removeFromTvFavourites = (tv) => {
    setTvFavourites(tvfavourites.filter((tId) => tId !== tv.id));
  };

  const addTvReview = (tv, tvreview) => {  
    setMyTvReviews( {...myTvReviews, [tv.id]: tvreview } )
  };

  return (
    <TvsContext.Provider
      value={{
        tvfavourites,
        tvmustWatch,
        addToTvFavourites,
        addToTvMustWatch,
        removeFromTvFavourites,
        addTvReview,  
      }}
    >
      {props.children}
    </TvsContext.Provider>
  );
};

export default TvsContextProvider;
