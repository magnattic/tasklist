import { createContext } from "react";
import { ShowApi } from "./ShowApi";
import { TmdbShowApi } from "./TmdbApi";

export const ShowContext = createContext<ShowApi>(TmdbShowApi);
