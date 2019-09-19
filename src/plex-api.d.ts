declare module "plex-api" {
  class PlexApi {
    constructor(url: string);

    query: (path: string) => Promise<any>;
  }

  export default PlexApi;
}
