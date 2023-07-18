import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterTvsCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import TvList from "../tvList";

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

function TvListPageTemplate({ tvs, title, action }) {
  const [titleFilter, setTitleFilter] = useState("");
  const [tvgenreFilter, setTvGenreFilter] = useState("0");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const tvgenreId = Number(tvgenreFilter);

  let displayedTvs = tvs
 //   .filter((t) => {
  //    return t.title.toLowerCase().search(titleFilter.toLowerCase()) !== -1;
  //  })
    .filter((t) => {
      return tvgenreId > 0 ? t.tvgenre_ids.includes(tvgenreId) : true;
    });
    const handleChange = (type, value) => {
      if (type === "title") setTitleFilter(value);
      else setTvGenreFilter(value);
    };
  return (
   <>
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <Header title={title} />
        </Grid>
        <Grid item container spacing={5}>
        <TvList action={action} tvs={displayedTvs} />
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
          tvgenreFilter={tvgenreFilter}
        />
      </Drawer>
    </>  
  );
}
export default TvListPageTemplate;
