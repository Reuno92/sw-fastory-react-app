import {useCallback, useReducer} from "react";
import {httpReducer, initialState} from "../reducers/Http.reducer";
import {
    FilmsV1Models,
    PeopleV1Models,
    PlanetsV1Models,
    SpeciesV1Models,
    StarshipsV1Models,
    VehiclesV1Models
} from "../models/api";
import {LinkModels} from "../models/Link.models";

export const FetchSingleApi = () => {

    const [httpSingleState, dispatchSingleState] = useReducer(httpReducer, initialState);
    const clear = useCallback(() => dispatchSingleState({type: "CLEAR"}), []);

    const sendSingleRequest = useCallback(async (uri: string, method: string, entity: string) => {

        const res = await fetch(uri, {
            method: method, headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            }
        });

        switch (entity) {
            case "people": {

                const resJSONPeople: PeopleV1Models<string> = await res.json()
                    .catch(() => dispatchSingleState({
                        type: "ERROR",
                        errorMessage: "Something went wrong during loading data People"
                    }));

                const resFilmPeople: Array<Promise<LinkModels>> = await resJSONPeople.films.map(
                    (film: string) => fetch(film, {method: 'GET'}).then(res => res.json())
                        .then((data: FilmsV1Models<string>) => {
                            return {
                                label: data?.title,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resSpeciesPeople: Array<Promise<LinkModels>> = await resJSONPeople.species.map(
                    (film: string) => fetch(film, {method: "GET"}).then(res => res.json())
                        .then((data: SpeciesV1Models<LinkModels, string>) => {
                            return {
                                label: data?.name,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resStarshipPeople: Array<Promise<LinkModels>> = await resJSONPeople.starships.map(
                    (starship: string) => fetch(starship, { method: "GET"}).then( res => res.json())
                        .then( (data: StarshipsV1Models<string>) => {
                            return {
                                label: data?.name,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resVehiclesPeople: Array<Promise<LinkModels>> = await resJSONPeople.vehicles.map(
                    (vehicle: string) => fetch(vehicle, { method: "GET"}).then( res => res.json())
                        .then( (data: VehiclesV1Models<string>) => {
                            return {
                                label: data?.name,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const FILMS_INTO_PEOPLE = await Promise.all(resFilmPeople);
                const SPECIES_INTO_PEOPLE = await Promise.all(resSpeciesPeople);
                const STARSHIPS_INTO_PEOPLE = await Promise.all(resStarshipPeople);
                const VEHICLES_INTO_PEOPLE = await Promise.all(resVehiclesPeople);

                const DATA_PEOPLE: PeopleV1Models<LinkModels> = {
                    ...resJSONPeople,
                    films: FILMS_INTO_PEOPLE,
                    species: SPECIES_INTO_PEOPLE,
                    starships: STARSHIPS_INTO_PEOPLE,
                    vehicles: VEHICLES_INTO_PEOPLE,
                }

                dispatchSingleState({ type: "RESPONSE", response: DATA_PEOPLE });
                break;
            }

            case "film": {

                const resJSONFilm: FilmsV1Models<string> = await res.json();

                const resFilmPlanets: Array<Promise<LinkModels>> = await resJSONFilm.planets.map(
                    (planet: string) => fetch(planet, { method: "GET"}).then(res => res.json())
                        .then( (data: PlanetsV1Models<string>) => {
                            return {
                                label: data?.name,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resFilmSpecies: Array<Promise<LinkModels>> = await resJSONFilm.species.map(
                    (specie: string) => fetch(specie, { method: "GET"}).then( res => res.json())
                        .then( (data: SpeciesV1Models<LinkModels, string>) => {
                            return {
                                label: data?.name,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resFilmPeople: Array<Promise<LinkModels>> = await resJSONFilm.characters.map(
                    (people: string) => fetch(people, { method: "GET"}).then( res => res.json())
                        .then( (data: PeopleV1Models<string>) => {
                            return {
                                label: data?.name,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resFilmStarships: Array<Promise<LinkModels>> = await resJSONFilm.starships.map(
                    (starship: string) => fetch(starship, { method: 'GET'}).then( res => res.json())
                        .then( (data: StarshipsV1Models<string>) => {
                            return {
                                label: data?.name,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resFilmVehicles: Array<Promise<LinkModels>> = await resJSONFilm.vehicles.map(
                    (vehicles: string) => fetch(vehicles, {method: "GET"}).then( res => res.json())
                        .then( (data: StarshipsV1Models<string>) => {
                            return {
                                label: data?.name,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const PLANETS_INTO_FILM = await Promise.all(resFilmPlanets.map( async inner => inner));
                const SPECIES_INTO_FILM = await Promise.all(resFilmSpecies.map( async inner => inner));
                const PEOPLE_INTO_FILM = await Promise.all(resFilmPeople.map(async inner => inner));
                const STARSHIPS_INTO_FILM = await Promise.all(resFilmStarships.map(async inner => inner));
                const VEHICLES_INTO_FILM = await Promise.all(resFilmVehicles.map(async inner => inner ));

                const DATA_FILMS: FilmsV1Models<LinkModels> = {
                    ...resJSONFilm,
                    planets: PLANETS_INTO_FILM,
                    species: SPECIES_INTO_FILM,
                    characters: PEOPLE_INTO_FILM,
                    starships: STARSHIPS_INTO_FILM,
                    vehicles: VEHICLES_INTO_FILM
                }

                dispatchSingleState({ type: "RESPONSE", response: DATA_FILMS });
                break;
            }

            case "planet":

                const resJSONPlanet: PlanetsV1Models<string> = await res.json();

                const resPlanetFilms: Array<Promise<LinkModels>> = await resJSONPlanet.films.map(
                    (film: string) => fetch(film, { method: "GET"}).then( res => res.json())
                        .then( (data: FilmsV1Models<string>) => {
                            return {
                                label: data?.title,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resPlanetPeople: Array<Promise<LinkModels>> = await resJSONPlanet.residents.map(
                    (people: string) => fetch(people, { method: "GET"}).then( res => res.json())
                        .then( (data: PeopleV1Models<string>) => {
                            return {
                                label: data?.name,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const FILM_INTO_PLANET = await Promise.all(resPlanetFilms);
                const PEOPLE_INTO_PLANET = await Promise.all(resPlanetPeople);

                const DATA_PLANET: PlanetsV1Models<LinkModels> = {
                    ...resJSONPlanet,
                    residents: PEOPLE_INTO_PLANET,
                    films: FILM_INTO_PLANET
                }

                dispatchSingleState({ type: "RESPONSE", response: DATA_PLANET});
                break;

            case "specie":

                const resJSONSpecie: SpeciesV1Models<string, string> = await res.json();

                const resSpecieFilms: Array<Promise<LinkModels>> = await resJSONSpecie.films.map(
                    (film: string) => fetch(film, { method: "GET"}).then( res => res.json())
                        .then( (data: FilmsV1Models<string>) => {
                            return {
                                label: data?.title,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resSpeciePeople: Array<Promise<LinkModels>> = await resJSONSpecie.people.map(
                    (people: string) => fetch(people, { method: "GET"}).then( res => res.json())
                        .then( (data: PeopleV1Models<string>) => {
                            return {
                                label: data?.name,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resSpeciesOrigin = await fetch(resJSONSpecie.homeworld, { method: "GET"}).then( res => res.json()
                    .then( (data: PlanetsV1Models<string>) => {
                        return {
                            label: data?.name,
                            id: data?.url.match(/\d+/gm)![0]
                        } as unknown as LinkModels
                    })
                );

                const FILM_INTO_SPECIE = await Promise.all(resSpecieFilms);
                const PEOPLE_INTO_SPECIE = await Promise.all(resSpeciePeople);

                const DATA_SPECIE: SpeciesV1Models<LinkModels, string> = {
                    ...resJSONSpecie,
                    people: PEOPLE_INTO_SPECIE,
                    films: FILM_INTO_SPECIE,
                    homeworld: resSpeciesOrigin
                }

                dispatchSingleState({ type: "RESPONSE", response: DATA_SPECIE });
                break;

            case "starship":

                const resJSONStarship: StarshipsV1Models<string> = await res.json();

                const resStarshipFilm: Array<Promise<LinkModels>> = await resJSONStarship.films.map(
                    (film: string ) => fetch(film, { method: "GET"}).then( res => res.json())
                        .then( (data: FilmsV1Models<string>) => {
                            return {
                                label: data?.title,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resStarshipPeople: Array<Promise<LinkModels>> = await resJSONStarship.pilots.map(
                    (people: string) => fetch(people, { method: "GET"}).then( res => res.json())
                        .then( (data: PeopleV1Models<string>) => {
                            return {
                                label: data?.name,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const FILM_INTO_STARSHIP = await Promise.all(resStarshipFilm);
                const PEOPLE_INTO_STARSHIP = await Promise.all(resStarshipPeople);

                const DATA_STARSHIP: StarshipsV1Models<LinkModels> = {
                    ...resJSONStarship,
                    films: FILM_INTO_STARSHIP,
                    pilots: PEOPLE_INTO_STARSHIP
                };

                dispatchSingleState({ type: "RESPONSE", response: DATA_STARSHIP });
                break;

            case "vehicle":
                const resJSONVehicle: VehiclesV1Models<string> = await res.json();

                const resVehicleFilm: Array<Promise<LinkModels>> = resJSONVehicle.films.map(
                    (film: string) => fetch( film, { method: "GET"}).then( res => res.json())
                        .then( (data: FilmsV1Models<string>) => {
                            return {
                                label: data?.title,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resVehiclePeople: Array<Promise<LinkModels>> = resJSONVehicle.pilots.map(
                    (people: string) => fetch( people, { method: "GET"}).then( res => res.json())
                        .then( (data: PeopleV1Models<string>) => {
                            return {
                                label: data?.name,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const FILMS_INTO_VEHICLES = await Promise.all(resVehicleFilm);
                const PEOPLE_INTO_VEHICLES = await Promise.all(resVehiclePeople);

                const DATA_VEHICLES: VehiclesV1Models<LinkModels> = {
                    ...resJSONVehicle,
                    films: FILMS_INTO_VEHICLES,
                    pilots: PEOPLE_INTO_VEHICLES,
                };

                dispatchSingleState({type: "RESPONSE", response: DATA_VEHICLES });
                break;
            default: {
                dispatchSingleState({type: "ERROR", errorMessage: "Resource entity is wrong…"})
                break;
            }
        }
    }, []);

    return {
        isLoading: httpSingleState.loading,
        data: httpSingleState.data,
        error: httpSingleState.error,
        sendSingleRequest: sendSingleRequest,
        firstTime: httpSingleState.firstTime,
        clear: clear
    }
}
