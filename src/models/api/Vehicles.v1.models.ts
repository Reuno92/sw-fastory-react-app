/**
 * Vehicles Models Version One
 *
 * A Vehicle resource is a single transport craft that does not have hyperdrive capability.
 */
export class VehiclesV1Models {
  /**
   *
   * @param { string } name - The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike".
   * @param { string } model - The model or official name of this vehicle. Such as "All-Terrain Attack Transport".
   * @param { string } vehicles_class - The class of this vehicle, such as "Wheeled" or "Repulsorcraft".
   * @param { string } manufacturer - The manufacturer of this vehicle. Comma separated if more than one.
   * @param { string } length - The length of this vehicle in meters.
   * @param { string } cost_in_length - The cost of this vehicle new, in Galactic Credits.
   * @param { string } crew - The number of personnel needed to run or pilot this vehicle.
   * @param { string } passengers - The number of non-essential people this vehicle can transport.
   * @param { string } max_atmosphering_speed - The maximum speed of this vehicle in the atmosphere.
   * @param { string } cargo_capacity - The maximum number of kilograms that this vehicle can transport.
   * @param { string } consumables - The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply.
   * @param { string } films - An array of Film URL Resources that this vehicle has appeared in.
   * @param { string } pilots - An array of People URL Resources that this vehicle has been piloted by.
   * @param { string } url - The hypermedia URL of this resource.
   * @param { string } created - The ISO 8601 date format of the time that this resource was created.
   * @param { string } edited - The ISO 8601 date format of the time that this resource was edited.
   */
  constructor(
    public name: string,
    public model: string,
    public vehicles_class: string,
    public manufacturer: string,
    public length: string,
    public cost_in_length: string,
    public crew: string,
    public passengers: string,
    public max_atmosphering_speed: string,
    public cargo_capacity: string,
    public consumable: string,
    public films: string,
    public pilots: string,
    public url: string,
    public created: string,
    public edited: string
  ) {}
}
