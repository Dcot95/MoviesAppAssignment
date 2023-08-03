import React, { useContext } from "react";
import { TvsContext } from "../../contexts/tvsContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToTvFavouritesIcon = ({ tv }) => {
  const context = useContext(TvsContext);

  const onUserSelect = (e) => {
    e.preventDefault();
    context.addToTvFavourites(tv);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToTvFavouritesIcon;
