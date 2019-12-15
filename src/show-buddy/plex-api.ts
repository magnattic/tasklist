const endpoint = "http://192.168.178.73:32400";

const plexRequest = async (path: string) => {
  const response = await fetch(`${endpoint}${path}`, {
    headers: new Headers({ Accept: "application/json" })
  });
  const json = await response.json();
  return json.MediaContainer.Metadata as {
    type: "show" | "episode";
    title: string;
    key: string;
  }[];
};

export const fetchShows = async () => {
  const shows = await plexRequest(`/library/sections/2/all`);
  return shows.map(show => show.title);
};

export const fetchEpisodes = async (showName: string) => {
  const shows = await plexRequest(`/search?query=${showName}`);

  const showKey = shows.filter(show => show.type === "show")[0].key;

  const seasons = await plexRequest(showKey);
  const episodes = await Promise.all(
    seasons.map(season => plexRequest(season.key))
  );

  console.log(episodes);
};

fetchEpisodes("The Mandalorian");
