import React, { useState } from "react";

export const TvsContext = React.createContext(null);

const TvsContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState( {} ) 
  const [favourites, setFavourites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]);

  const addToFavourites = (tv) => {
    let updatedFavourites = [...favourites];
    if (!favourites.includes(tv.id)) {
      updatedFavourites.push(tv.id);
    }
    setFavourites(updatedFavourites);
  };

  const addToMustWatch = (tv) => {
    let updatedMustWatch = [...mustWatch];
    if (!mustWatch.includes(tv.id)) {
      updatedMustWatch.push(tv.id);
    }
    setMustWatch(updatedMustWatch);
    //console.log(updatedMustWatch);
  };


  const removeFromFavourites = (tv) => {
    setFavourites(favourites.filter((tId) => tId !== tv.id));
  };

  const addReview = (tv, review) => {  
    setMyReviews( {...myReviews, [tv.id]: review } )
  };

  return (
    <TvsContext.Provider
      value={{
        favourites,
        mustWatch,
        addToFavourites,
        addToMustWatch,
        removeFromFavourites,
        addReview,  
      }}
    >
      {props.children}
    </TvsContext.Provider>
  );
};

export default TvsContextProvider;
