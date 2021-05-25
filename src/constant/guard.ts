import {
    FilmsV1Models,
    PeopleV1Models,
    PlanetsV1Models,
    SpeciesV1Models,
    StarshipsV1Models,
    VehiclesV1Models
} from "../models/api";

const isPeople = (obj: any): obj is PeopleV1Models<string> => {
    return obj.hair_color !== undefined
}

const isPlanets = (obj: any): obj is PlanetsV1Models<string> => {
    return obj.population !== undefined
}

const isFilms = (obj: any): obj is FilmsV1Models<string> => {
    return obj.title !== undefined
}

const isSpecies = (obj: any): obj is SpeciesV1Models<string, string> => {
    return obj.average_height !== undefined
}

const isStarships = (obj: any): obj is StarshipsV1Models<string> => {
    return obj.hyperdrive_rating !== undefined
}

const isVehicles = (obj: any): obj is VehiclesV1Models<string> => {
    return obj.max_atmosphering_speed !== undefined
}

export { isPeople, isPlanets, isFilms, isSpecies, isStarships, isVehicles }
