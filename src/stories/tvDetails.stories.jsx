import React from "react";
import TvDetails from "../components/tvDetails";
import TvSampleMovie from "./tvsampleData";
import { MemoryRouter } from "react-router";
import TvsContextProvider from "../contexts/tvsContext";

export default {
  title: "Tv Details Page/TvDetails",
  component: TvDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <TvsContextProvider>{Story()}</TvsContextProvider>,
  ],
};

export const Basic = () => <TvDetails tv={TvSampleMovie} />;

Basic.storyName = "Default";
