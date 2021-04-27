/**
 * Root models Version One
 *
 * The Root resource provides information on all available resources within the API.
 */
export class RootV1Models {
  constructor(
    public films: string,
    public people: string,
    public planets: string,
    public species: string,
    public starships: string,
    public vehicles: string
  ) {}
}
