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
import {PeopleSingleV1Models} from "../models/singles/PeopleSingle.v1.models";
import {FilmSingleV1Models} from "../models/singles/FilmSingle.v1.models";
import {PlanetSingleV1Models} from "../models/singles/PlanetSingle.v1.models";
import {SpecieSingleV1Models} from "../models/singles/SpecieSingle.v1.models";
import {StarshipSingleV1Models} from "../models/singles/StarshipSingle.v1.models";

export const FetchSingleApi = () => {

    const [httpSingleState, dispatchSingleState] = useReducer(httpReducer, initialState);
    const clear = useCallback(() => dispatchSingleState({type: "CLEAR"}), []);

    const sendSingleRequest = useCallback(async (uri: string, method: string, entity: string) => {

        const res = await fetch(uri, {
            method: method, headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            }
        })

        switch (entity) {
            case "people": {

                const resJSONPeople: PeopleV1Models = await res.json()
                    .catch(() => dispatchSingleState({
                        type: "ERROR",
                        errorMessage: "Something went wrong during loading data People"
                    }));

                const resFilmPeople: Array<Promise<any>> = await resJSONPeople.films.map(
                    (film: string) => fetch(film, {method: 'GET'}).then(res => res.json())
                        .then((data: FilmsV1Models) => {
                            return {
                                label: data?.title,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resSpeciesPeople: Array<Promise<any>> = await resJSONPeople.species.map(
                    (film: string) => fetch(film, {method: "GET"}).then(res => res.json())
                        .then((data: SpeciesV1Models) => {
                            return {
                                label: data?.name,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resStarshipPeople: Array<Promise<any>> = await resJSONPeople.starships.map(
                    (starship: string) => fetch(starship, { method: "GET"}).then( res => res.json())
                        .then( (data: StarshipsV1Models) => {
                            return {
                                label: data?.name,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resVehiclesPeople: Array<Promise<any>> = await resJSONPeople.vehicles.map(
                    (vehicle: string) => fetch(vehicle, { method: "GET"}).then( res => res.json())
                        .then( (data: VehiclesV1Models) => {
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

                const DATA_PEOPLE: PeopleSingleV1Models = {
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

                const resJSONFilm: FilmsV1Models = await res.json();

                const resFilmPlanets: Array<Promise<any>> = await resJSONFilm.planets.map(
                    (planet: string) => fetch(planet, { method: "GET"}).then(res => res.json())
                        .then( (data: PlanetsV1Models) => {
                            return {
                                label: data?.name,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resFilmSpecies: Array<Promise<any>> = await resJSONFilm.species.map(
                    (specie: string) => fetch(specie, { method: "GET"}).then( res => res.json())
                        .then( (data: SpeciesV1Models) => {
                            return {
                                label: data?.name,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resFilmPeople: Array<Promise<any>> = await resJSONFilm.characters.map(
                    (people: string) => fetch(people, { method: "GET"}).then( res => res.json())
                        .then( (data: PeopleV1Models) => {
                            return {
                                label: data?.name,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resFilmStarships: Array<Promise<any>> = await resJSONFilm.starships.map(
                    (starship: string) => fetch(starship, { method: 'GET'}).then( res => res.json())
                        .then( (data: StarshipsV1Models) => {
                            return {
                                label: data?.name,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resFilmVehicles: Array<Promise<any>> = await resJSONFilm.vehicles.map(
                    (vehicles: string) => fetch(vehicles, {method: "GET"}).then( res => res.json())
                        .then( (data: StarshipsV1Models) => {
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

                const DATA_FILMS: FilmSingleV1Models = {
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

                const resJSONPlanet: PlanetsV1Models = await res.json();

                const resPlanetFilms: Array<Promise<LinkModels>> = await resJSONPlanet.films.map(
                    (film: string) => fetch(film, { method: "GET"}).then( res => res.json())
                        .then( (data: FilmsV1Models) => {
                            return {
                                label: data?.title,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resPlanetPeople: Array<Promise<LinkModels>> = await resJSONPlanet.residents.map(
                    (people: string) => fetch(people, { method: "GET"}).then( res => res.json())
                        .then( (data: PeopleV1Models) => {
                            return {
                                label: data?.name,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const FILM_INTO_PLANET = await Promise.all(resPlanetFilms);
                const PEOPLE_INTO_PLANET = await Promise.all(resPlanetPeople);

                const DATA_PLANET: PlanetSingleV1Models = {
                    ...resJSONPlanet,
                    residents: PEOPLE_INTO_PLANET,
                    films: FILM_INTO_PLANET
                }

                dispatchSingleState({ type: "RESPONSE", response: DATA_PLANET});
                break;

            case "specie":

                const resJSONSpecie: SpeciesV1Models = await res.json();

                const resSpecieFilms: Array<Promise<LinkModels>> = await resJSONSpecie.films.map(
                    (film: string) => fetch(film, { method: "GET"}).then( res => res.json())
                        .then( (data: FilmsV1Models) => {
                            return {
                                label: data?.title,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resSpeciePeople: Array<Promise<LinkModels>> = await resJSONSpecie.people.map(
                    (people: string) => fetch(people, { method: "GET"}).then( res => res.json())
                        .then( (data: PeopleV1Models) => {
                            return {
                                label: data?.name,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resSpeciesOrigin = await fetch(resJSONSpecie.homeworld, { method: "GET"}).then( res => res.json()
                    .then( (data: PlanetsV1Models) => {
                        return {
                            label: data?.name,
                            id: data?.url.match(/\d+/gm)![0]
                        } as unknown as LinkModels
                    })
                );

                const FILM_INTO_SPECIE = await Promise.all(resSpecieFilms);
                const PEOPLE_INTO_SPECIE = await Promise.all(resSpeciePeople);

                const DATA_SPECIE: SpecieSingleV1Models = {
                    ...resJSONSpecie,
                    people: PEOPLE_INTO_SPECIE,
                    films: FILM_INTO_SPECIE,
                    homeworld: resSpeciesOrigin
                }

                dispatchSingleState({ type: "RESPONSE", response: DATA_SPECIE });
                break;

            case "starship":

                const resJSONStarship: StarshipsV1Models = await res.json();

                const resStarshipFilm: Array<Promise<LinkModels>> = await resJSONStarship.films.map(
                    (film: string ) => fetch(film, { method: "GET"}).then( res => res.json())
                        .then( (data: FilmsV1Models) => {
                            return {
                                label: data?.title,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const resStarshipPeople: Array<Promise<LinkModels>> = await resJSONStarship.pilots.map(
                    (people: string) => fetch(people, { method: "GET"}).then( res => res.json())
                        .then( (data: PeopleV1Models) => {
                            return {
                                label: data?.name,
                                id: data?.url.match(/\d+/gm)![0]
                            } as unknown as LinkModels
                        })
                );

                const FILM_INTO_STARSHIP = await Promise.all(resStarshipFilm);
                const PEOPLE_INTO_STARSHIP = await Promise.all(resStarshipPeople);

                const DATA_STARSHIP: StarshipSingleV1Models = {
                    ...resJSONStarship,
                    films: FILM_INTO_STARSHIP,
                    pilots: PEOPLE_INTO_STARSHIP
                };

                dispatchSingleState({ type: "RESPONSE", response: DATA_STARSHIP });
                break;

            case "vehicle":
                const resJSONVehicle: VehiclesV1Models = await res.json();

                console.log(resJSONVehicle);

                dispatchSingleState({type: "RESPONSE", message: resJSONVehicle});
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
