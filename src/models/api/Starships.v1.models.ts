/**
 * Starship Model Version One
 *
 * A Starship resource is a single transport craft that has hyperdrive capability.
 */
export class StarshipsV1Models {
  /**
   *
   * @param { string } name - The name of this starship. The common name, such as "Death Star".
   * @param { string } model - The model or official name of this starship. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station".
   * @param { string } starship_class - The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation"
   * @param { string } manufacturer - The manufacturer of this starship. Comma separated if more than one.
   * @param { string } cost_in_credits - The cost of this starship new, in galactic credits.
   * @param { string } length - The length of this starship in meters.
   * @param { string } crew - The number of personnel needed to run or pilot this starship.
   * @param { string } passengers - The number of non-essential people this starship can transport.
   * @param { string } max_atmospheric_speed - The maximum speed of this starship in the atmosphere. "N/A" if this starship is incapable of atmospheric flight.
   * @param { string } hyperdrive_rating - The class of this starships hyperdrive.
   * @param { string } MGLT - The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth.
   * @param { string } cargo_capacity - The maximum number of kilograms that this starship can transport.
   * @param { string } consumables - The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.
   * @param { Array<string> } films - An array of Film URL Resources that this starship has appeared in.
   * @param { Array<string> } pilots - An array of People URL Resources that this starship has been piloted by.
   * @param { string } url - The hypermedia URL of this resource.
   * @param { string } created - The ISO 8601 date format of the time that this resource was created.
   * @param { string } edited - The ISO 8601 date format of the time that this resource was edited.
   */
  constructor(
    public name: string,
    public model: string,
    public starship_class: string,
    public manufacturer: string,
    public cost_in_credits: string,
    public length: string,
    public crew: string,
    public passengers: string,
    public max_atmospheric_speed: string,
    public hyperdrive_rating: string,
    public MGLT: string,
    public cargo_capacity: string,
    public consumables: string,
    public films: Array<string>,
    public pilots: Array<string>,
    public url: string,
    public created: string,
    public edited: string
  ) {}
}
