import {LinkModels} from "../Link.models";

export class FilmSingleV1Models {
    /**
     *
     * @param { string } title - The title of this film
     * @param { number } episode - The episode number of this film.
     * @param { string } opening_crawl - The opening paragraphs at the beginning of this film.
     * @param { string } director - The name of the director of this film.
     * @param { string } producer - The name(s) of the producer(s) of this film. Comma separated.
     * @param { string } release_date - The ISO 8601 date format of film release at original creator country.
     * @param { Array<LinkModels> } species - An array of species resource URLs that are in this film.
     * @param { Array<LinkModels> } starships -  An array of starship resource URLs that are in this film.
     * @param { Array<LinkModels> } vehicles - An array of vehicle resource URLs that are in this film.
     * @param { Array<LinkModels> } characters - An array of people resource URLs that are in this film.
     * @param { Array<LinkModels>} planets -  An array of planet resource URLs that are in this film.
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
        public species: Array<LinkModels>,
        public starships: Array<LinkModels>,
        public vehicles: Array<LinkModels>,
        public characters: Array<LinkModels>,
        public planets: Array<LinkModels>,
        public url: string,
        public created: string,
        public edited: string
    ) {}
}
