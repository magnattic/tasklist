import PlexApi from "plex-api";

export const testPlex = () => {
  const client = new PlexApi("192.168.178.73");
  client.query("/").then(
    result => {
      const info = result.MediaContainer;
      console.log(
        "%s running Plex Media Server v%s",
        info.friendlyName,
        info.version
      );

      // array of children, such as Directory or Server items
      // will have the .uri-property attached
      console.log(info._children);
    },
    function(err) {
      console.error("Could not connect to server", err);
    }
  );
};

export const testPlex2 = async () => {
  const response = await fetch(
    "http://192.168.178.73:32400/library/sections/2/all",
    { headers: new Headers({ Accept: "application/json" }) }
  );
  const json = await response.json();
  const shows = json.MediaContainer.Metadata as any[];
  console.log(shows.map(show => show.title));
};
