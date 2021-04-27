/**
 * Species Model Version One
 *
 * A Species resource is a type of person or character within the Star Wars Universe.
 */
export class SpeciesV1Models {
  /**
   *
   * @param { string } name - The name of this species.
   * @param { string } classification - The classification of this species, such as "mammal" or "reptile".
   * @param { string } designation - The designation of this species, such as "sentient".
   * @param { string } average_height - The average height of this species in centimeters.
   * @param { string } average_lifespan - The average lifespan of this species in years.
   * @param { string } eye_colors - A comma-separated string of common eye colors for this species, "none" if this species does not typically have eyes.
   * @param { string } hair_colors - A comma-separated string of common hair colors for this species, "none" if this species does not typically have hair.
   * @param { string } skin_colors - A comma-separated string of common skin colors for this species, "none" if this species does not typically have skin.
   * @param { string } language - The language commonly spoken by this species.
   * @param { string } homeworld - The URL of a planet resource, a planet that this species originates from.
   * @param { string } people - An array of People URL Resources that are a part of this species.
   * @param { string } films - An array of Film URL Resources that this species has appeared in.
   * @param { string } url - The hypermedia URL of this resource.
   * @param { string } created - The ISO 8601 date format of the time that this resource was created.
   * @param { string } edited - The ISO 8601 date format of the time that this resource was edited.
   */
  constructor(
    public name: string,
    public classification: string,
    public designation: string,
    public average_height: string,
    public average_lifespan: string,
    public eye_colors: string,
    public hair_colors: string,
    public skin_colors: string,
    public language: string,
    public homeworld: string,
    public people: string,
    public films: string,
    public url: string,
    public created: string,
    public edited: string
  ) {}
}
