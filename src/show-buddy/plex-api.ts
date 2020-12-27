import { fetchWithTimeout } from "../utils/fetchWithTimeout";

const endpoint = "http://192.168.178.73:32400";

const plexRequest = async (path: string) => {
  const response = await fetchWithTimeout(`${endpoint}${path}`, {
    headers: new Headers({ Accept: "application/json" }),
    ms: 2000,
  });
  const json = await response.json();
  return json.MediaContainer.Metadata as {
    type: "show" | "episode";
    title: string;
    key: string;
  }[];
};

export const fetchShows = async () => {
  try {
    const shows = await plexRequest(`/library/sections/2/all`);
    return shows.map((show) => show.title);
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const fetchEpisodes = async (showName: string) => {
  try {
    const shows = await plexRequest(`/search?query=${showName}`);

    const showKey = shows.filter((show) => show.type === "show")[0].key;

    const seasons = await plexRequest(showKey);
    const episodes = await Promise.all(
      seasons.map((season) => plexRequest(season.key))
    );

    console.log(episodes);
  } catch (e) {
    return [];
  }
};
