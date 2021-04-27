/**
 * Films Model Version One
 *
 * Define resource for films endpoints
 */
export class FilmsV1Models {
  /**
   *
   * @param { string } title - The title of this film
   * @param { number } episode - The episode number of this film.
   * @param { string } opening_crawl - The opening paragraphs at the beginning of this film.
   * @param { string } director - The name of the director of this film.
   * @param { string } producer - The name(s) of the producer(s) of this film. Comma separated.
   * @param { string } release_date - The ISO 8601 date format of film release at original creator country.
   * @param { Array<string> } species - An array of species resource URLs that are in this film.
   * @param { Array<string> } starships -  An array of starship resource URLs that are in this film.
   * @param { Array<string> } vehicles - An array of vehicle resource URLs that are in this film.
   * @param { Array<string> } characters - An array of people resource URLs that are in this film.
   * @param { Array<string>} planets -  An array of planet resource URLs that are in this film.
   * @param { string } url - The hypermedia URL of this resource.
   * @param { string } created - The ISO 8601 date format of the time that this resource was created.
   * @param { string } edited - The ISO 8601 date format of the time that this resource was edited.
   */
  constructor(
    public title: string,
    public episode: number,
    public opening_crawl: string,
    public director: string,
    public producer: string,
    public release_date: string,
    public species: Array<string>,
    public starships: Array<string>,
    public vehicles: Array<string>,
    public characters: Array<string>,
    public planets: Array<string>,
    public url: string,
    public created: string,
    public edited: string
  ) {}
}
