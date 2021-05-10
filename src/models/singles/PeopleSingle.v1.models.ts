import {LinkModels} from "../Link.models";

/**
 * People Model Version One
 *
 * A People resource is an individual person or character within the Star Wars universe.
 */
export class PeopleSingleV1Models {
    /**
     *
     * @param { string } name - The name of this person.
     * @param { string } birth_year - The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope.
     * @param { string } eye_color - The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye.
     * @param { string } gender - The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender.
     * @param { string } hair_color - The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair.
     * @param { string } height - The height of the person in centimeters.
     * @param { string } mass - The mass of the person in kilograms.
     * @param { string } skin_color - The skin color of this person.
     * @param { string } homeworld - The URL of a planet resource, a planet that this person was born on or inhabits.
     * @param { Array<LinkModels> } films - An array of film resource id and label that this person has been in.
     * @param { Array<LinkModels> } species - An array of species resource id and label that this person belongs to.
     * @param { Array<LinkModels> } starships - An array of starship resource id and label that this person has piloted.
     * @param { Array<LinkModels> } vehicles - An array of vehicle resource id and label that this person has piloted.
     * @param { string } url - The hypermedia URL of this resource.
     * @param { string } created - The ISO 8601 date format of the time that this resource was created.
     * @param { string } edited - The ISO 8601 date format of the time that this resource was edited.
     */
    constructor(
        public name: string,
        public birth_year: string,
        public eye_color: string,
        public gender: string,
        public hair_color: string,
        public height: string,
        public mass: string,
        public skin_color: string,
        public homeworld: string,
        public films: Array<LinkModels>,
        public species: Array<LinkModels>,
        public starships: Array<LinkModels>,
        public vehicles: Array<LinkModels>,
        public url: string,
        public created: string,
        public edited: string
    ) {}
}
