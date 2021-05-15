import {LinkModels} from "../Link.models";

export class PlanetSingleV1Models {
    /**
     *
     * @param { string } name - The name of this planet.
     * @param { string } diameter - The diameter of this planet in kilometers.
     * @param { string } rotation_period - The number of standard hours it takes for this planet to complete a single rotation on its axis.
     * @param { string } orbital_period - The number of standard days it takes for this planet to complete a single orbit of its local star.
     * @param { string } gravity - A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.
     * @param { string } population - The average population of sentient beings inhabiting this planet.
     * @param { string } climate - The climate of this planet. Comma separated if diverse.
     * @param { string } terrain - The terrain of this planet. Comma separated if diverse.
     * @param { string } surface_water - The percentage of the planet surface that is naturally occurring water or bodies of water.
     * @param { Array<LinkModels> } residents - An array of People URL Resources that live on this planet.
     * @param { Array<LinkModels> } films - An array of Film URL Resources that this planet has appeared in.
     * @param { string } url - The hypermedia URL of this resource.
     * @param { string } created - The ISO 8601 date format of the time that this resource was created.
     * @param { string } edited - The ISO 8601 date format of the time that this resource was edited.
     */
    constructor(
        public name: string,
        public diameter: string,
        public rotation_period: string,
        public orbital_period: string,
        public gravity: string,
        public population: string,
        public climate: string,
        public terrain: string,
        public surface_water: string,
        public residents: Array<LinkModels>,
        public films: Array<LinkModels>,
        public url: string,
        public created: string,
        public edited: string
    ) {}
}
