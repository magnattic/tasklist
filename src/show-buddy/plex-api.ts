export const getShows = async () => {
  const response = await fetch(
    "http://192.168.178.73:32400/library/sections/2/all",
    { headers: new Headers({ Accept: "application/json" }) }
  );
  const json = await response.json();
  const shows = json.MediaContainer.Metadata as any[];
  return shows.map(show => show.title);
};
