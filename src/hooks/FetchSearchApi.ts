import {useCallback, useReducer} from "react";
import {httpReducer, initialState} from "../reducers/Http.reducer";
import {
    FilmsV1Models,
    PeopleV1Models,
    PlanetsV1Models,
    ResponseV1Models,
    SpeciesV1Models,
    StarshipsV1Models,
    VehiclesV1Models
} from "../models/api";

export const FetchSearchApi = () => {

    const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);
    const clear = useCallback(() => dispatchHttp({type: "CLEAR"}), []);

    const sendRequest = useCallback(async (uri: string, method: string, entity: string) => {

        const res = await fetch(uri, {
            method: method,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
            }
        });

        switch (entity) {
            case 'people':
                let resJSONPeople: ResponseV1Models<PeopleV1Models> = await res.json()
                    .catch((): void => {
                        dispatchHttp({type: "ERROR", errorMessage: 'Something went wrong: during data loading with People !'})
                    });

                const resFilmsPeople: Array<Array<Promise<any>>> = resJSONPeople.results.map(
                    (people: PeopleV1Models) => people.films.map(
                        (film: string) => fetch(film, {
                            method: 'GET'
                        }).then(x => x.json())
                            .then((data: FilmsV1Models) => data.title)
                            .catch((): void => {
                                dispatchHttp({
                                    type: "ERROR",
                                    errorMessage: 'Something went wrong during call api for search films.'
                                })
                            })
                    )
                );

                const resSpeciesPeople = await resJSONPeople.results.map(
                    (people: PeopleV1Models) => people.species.map(
                        (specie: string) => fetch(specie, {
                            method: 'GET'
                        }).then(x => x.json())
                            .then((data: SpeciesV1Models) => data.name)
                            .catch((): void => {
                                dispatchHttp({
                                    type: "ERROR",
                                    errorMessage: 'Something went wrong during call api for search species.'
                                })
                            })
                    )
                );

                const resStarshipsPeople: Array<Array<Promise<any>>> = await resJSONPeople.results.map(
                    (people: PeopleV1Models) => people.starships.map(
                        (starship: string) => fetch(starship, {
                            method: 'GET'
                        }).then(res => res.json())
                            .then((data: StarshipsV1Models) => data.name)
                            .catch((): void => {
                                dispatchHttp({
                                    type: "ERROR",
                                    errorMessage: 'Something went wrong during call api for search starships.'
                                })
                            })
                    )
                );

                const resVehiclesPeople: Array<Array<Promise<any>>> = await resJSONPeople.results.map(
                    (people: PeopleV1Models) => people.vehicles.map(
                        (vehicle: string) => fetch(vehicle, {
                            method: 'GET'
                        }).then(res => res.json())
                            .then((data: VehiclesV1Models) => data.name)
                            .catch((): void => {
                                dispatchHttp({
                                    type: "ERROR",
                                    errorMessage: 'Something went wrong during call api for search vehicles.'
                                })
                            })
                    )
                );

                const resPlanetPeople: Array<Promise<any>> = await resJSONPeople.results.flatMap(
                    (people: PeopleV1Models) => fetch(people.homeworld, {
                        method: 'GET'
                    }).then(res => res.json())
                        .then((data: PlanetsV1Models) => data.name)
                        .catch((): void => {
                            dispatchHttp({
                                type: "ERROR",
                                errorMessage: 'Something went wrong during call api for search planets.'
                            })
                        })
                );

                const FILMS_INTO_PEOPLE = await Promise.all(resFilmsPeople.map(async inner => await Promise.all(inner)));
                const SPECIES_INTO_PEOPLE = await Promise.all(resSpeciesPeople.map(async inner => await Promise.all(inner)));
                const STARSHIPS_INTO_PEOPLE = await Promise.all(resStarshipsPeople.map(async inner => await Promise.all(inner)));
                const VEHICLES_INTO_PEOPLE = await Promise.all(resVehiclesPeople.map(async inner => await Promise.all(inner)));
                const HOME_WORLD_INTO_PEOPLE = await Promise.all(resPlanetPeople);

                const DATA_PEOPLE: ResponseV1Models<PeopleV1Models> = {
                    count: resJSONPeople.count,
                    previous: resJSONPeople.previous,
                    next: resJSONPeople.next,
                    results: resJSONPeople.results.map((x: PeopleV1Models, index: number) => {
                        return {
                            name: x.name,
                            birth_year: x.birth_year,
                            eye_color: x.eye_color,
                            gender: x.gender,
                            hair_color: x.hair_color,
                            height: x.height,
                            mass: x.mass,
                            skin_color: x.skin_color,
                            homeworld: HOME_WORLD_INTO_PEOPLE[index],
                            films: FILMS_INTO_PEOPLE[index],
                            species: SPECIES_INTO_PEOPLE[index],
                            starships: STARSHIPS_INTO_PEOPLE[index],
                            vehicles: VEHICLES_INTO_PEOPLE[index],
                            url: x.url,
                            created: x.created,
                            edited: x.edited,
                        } as PeopleV1Models
                    })
                };

                dispatchHttp({type: "RESPONSE", response: DATA_PEOPLE});

                break;

            case 'planets':

                let resJSONPlanets: ResponseV1Models<PlanetsV1Models> = await res.json()
                    .catch((): void => {
                        dispatchHttp({type: "ERROR", errorMessage: 'Something went wrong: during data loading with People !'})
                    });

                const resFilmsPlanets: Array<Array<Promise<any>>> = resJSONPlanets.results.map(
                    (planet: PlanetsV1Models) => planet.films.map(
                        (film: string) => fetch(film, {
                            method: 'GET'
                        }).then(x => x.json())
                            .then((data: FilmsV1Models) => data.title)
                            .catch((): void => {
                                dispatchHttp({
                                    type: "ERROR",
                                    errorMessage: 'Something went wrong during call api for search films.'
                                })
                            })
                    )
                );

                const resPeoplePlanets: Array<Array<Promise<any>>> = resJSONPlanets.results.map(
                    (planet: PlanetsV1Models) => planet.residents.map(
                        (film: string) => fetch(film, {
                            method: 'GET'
                        }).then(x => x.json())
                            .then((data: PeopleV1Models) => data.name)
                            .catch((): void => {
                                dispatchHttp({
                                    type: "ERROR",
                                    errorMessage: 'Something wen wrong during call api for search planets.'
                                })
                            })
                    )
                )

                const FILMS = await Promise.all(resFilmsPlanets.map(async inner => await Promise.all(inner)));
                const PEOPLE = await Promise.all(resPeoplePlanets.map(async inner => await Promise.all(inner)));

                let DATA_PLANET: ResponseV1Models<PlanetsV1Models> = {
                    count: resJSONPlanets.count,
                    previous: resJSONPlanets.previous,
                    next: resJSONPlanets.next,
                    results: resJSONPlanets.results.map((x: PlanetsV1Models, index: number) => {
                        return {
                            name: x.name,
                            diameter: x.diameter,
                            rotation_period: x.rotation_period,
                            orbital_period: x.orbital_period,
                            gravity: x.gravity,
                            population: x.population,
                            climate: x.climate,
                            terrain: x.terrain,
                            surface_water: x.surface_water,
                            residents: PEOPLE[index],
                            films: FILMS[index],
                            url: x.url,
                            created: x.created,
                            edited: x.edited
                        } as PlanetsV1Models
                    })
                };

                dispatchHttp({type: "RESPONSE", response: DATA_PLANET});
                break;

            case 'films':

                let resJSONFilms: ResponseV1Models<FilmsV1Models> = await res.json()
                    .catch((): void => {
                        dispatchHttp({type: "ERROR", errorMessage: 'Something went wrong: during data loading with Films !'})
                    });

                const resSpeciesFilms: Array<Array<Promise<any>>> = resJSONFilms.results.map(
                    (film: FilmsV1Models) => film.species.map(
                        (specie: string) => fetch(specie, {
                            method: 'GET'
                        }).then(res => res.json())
                            .then((data: SpeciesV1Models) => data.name)
                    )
                );

                const resStarshipsFilms: Array<Array<Promise<any>>> = resJSONFilms.results.map(
                    (film: FilmsV1Models) => film.starships.map(
                        (starship: string) => fetch(starship, {
                            method: 'GET'
                        }).then(res => res.json())
                            .then((data: StarshipsV1Models) => data.name)
                    )
                )

                const resVehiclesFilms: Array<Array<Promise<any>>> = resJSONFilms.results.map(
                    (film: FilmsV1Models) => film.starships.map(
                        (vehicles: string) => fetch(vehicles, {
                            method: 'GET'
                        }).then(res => res.json())
                            .then((data: VehiclesV1Models) => data.name)
                    )
                )

                const resPeopleFilm: Array<Array<Promise<any>>> = resJSONFilms.results.map(
                    (film: FilmsV1Models) => film.characters.map(
                        (people: string) => fetch(people, {
                            method: 'GET'
                        }).then(res => res.json())
                            .then((data: PeopleV1Models) => data.name)
                    )
                )

                const resPlanetFilm: Array<Array<Promise<any>>> = resJSONFilms.results.map(
                    (film: FilmsV1Models) => film.planets.map(
                        (planet: string) => fetch(planet, {
                            method: 'GET'
                        }).then(res => res.json())
                            .then((data: PeopleV1Models) => data.name)
                    )
                )

                const SPECIES_INTO_FILM = await Promise.all(resSpeciesFilms.map(async inner => await Promise.all(inner)));
                const STARSHIPS_INTO_FILM = await Promise.all(resStarshipsFilms.map(async inner => await Promise.all(inner)));
                const VEHICLES_INTO_FILM = await Promise.all(resVehiclesFilms.map(async inner => await Promise.all(inner)));
                const PEOPLE_INTO_FILM = await Promise.all(resPeopleFilm.map(async inner => await Promise.all(inner)));
                const PLANETS_INTO_FILM = await Promise.all(resPlanetFilm.map(async inner => await Promise.all(inner)));

                const DATA_FILMS: ResponseV1Models<FilmsV1Models> = {
                    count: resJSONFilms.count,
                    previous: resJSONFilms.previous,
                    next: resJSONFilms.next,
                    results: resJSONFilms.results.map((x: FilmsV1Models, index: number) => {
                        return {
                            title: x.title,
                            episode: x.episode,
                            opening_crawl: x.opening_crawl,
                            director: x.director,
                            producer: x.producer,
                            release_date: x.release_date,
                            species: SPECIES_INTO_FILM[index],
                            starships: STARSHIPS_INTO_FILM[index],
                            vehicles: VEHICLES_INTO_FILM[index],
                            characters: PEOPLE_INTO_FILM[index],
                            planets: PLANETS_INTO_FILM[index],
                            url: x.url,
                            created: x.created,
                            edited: x.edited
                        } as FilmsV1Models
                    })
                }

                dispatchHttp({type: "RESPONSE", response: DATA_FILMS});

                break;

            case 'species':

                let resJSONSpecies: ResponseV1Models<SpeciesV1Models> = await res.json()
                    .catch((): void => {
                        dispatchHttp({type: "ERROR", errorMessage: 'Something went wrong: during data loading with Species !'})
                    });

                const resPeopleSpecies: Array<Array<Promise<any>>> = resJSONSpecies.results.map(
                    (species: SpeciesV1Models) => species.people.map(
                        (planet: string) => fetch(planet, {
                            method: 'GET'
                        }).then(res => res.json())
                            .then((data: PeopleV1Models) => data.name)
                    )
                )

                const resFilmSpecies: Array<Array<Promise<any>>> = resJSONSpecies.results.map(
                    (species: SpeciesV1Models) => species.films.map(
                        (planet: string) => fetch(planet, {
                            method: 'GET'
                        }).then(res => res.json())
                            .then((data: PeopleV1Models) => data.name)
                    )
                )

                const resPlanetSpecies: Array<Promise<any>> = resJSONSpecies.results.map(
                    (species: SpeciesV1Models) => fetch(species.homeworld, {
                        method: 'GET'
                    }).then(res => res.json())
                        .then((data: PlanetsV1Models) => data.name)
                )

                const PEOPLE_INTO_SPECIES = await Promise.all(resPeopleSpecies.map(async inner => await Promise.all(inner)));
                const FILMS_INTO_SPECIES = await Promise.all(resFilmSpecies.map(async inner => await Promise.all(inner)));
                const PLANET_INTO_SPECIES = await Promise.all(resPlanetSpecies);

                const DATA_SPECIES: ResponseV1Models<SpeciesV1Models> = {
                    count: resJSONSpecies.count,
                    previous: resJSONSpecies.previous,
                    next: resJSONSpecies.next,
                    results: resJSONSpecies.results.map((x: SpeciesV1Models, index: number) => {
                        return {
                            name: x.name,
                            classification: x.classification,
                            designation: x.designation,
                            average_height: x.average_height,
                            average_lifespan: x.average_lifespan,
                            eye_colors: x.eye_colors,
                            hair_colors: x.hair_colors,
                            skin_colors: x.skin_colors,
                            language: x.language,
                            homeworld: PLANET_INTO_SPECIES[index],
                            people: PEOPLE_INTO_SPECIES[index],
                            films: FILMS_INTO_SPECIES[index],
                            url: x.url,
                            created: x.created,
                            edited: x.edited
                        } as SpeciesV1Models
                    })
                }

                dispatchHttp({type: "RESPONSE", response: DATA_SPECIES});
                break;

            case 'starships':
                const resJSONStarships: ResponseV1Models<StarshipsV1Models> = await res.json()
                    .catch((): void => {
                        dispatchHttp({type: "ERROR", errorMessage: 'Something went wrong: during data loading with Starpships !'});
                    })

                const resFilmsStarship: Array<Array<Promise<any>>> = resJSONStarships.results.map(
                    (starship: StarshipsV1Models) => starship.films.map(
                        (film: string) => fetch(film, {
                            method: 'GET'
                        }).then(res => res.json())
                            .then((data: FilmsV1Models) => data.title)
                    )
                );

                const resPilotsStarship: Array<Array<Promise<any>>> = resJSONStarships.results.map(
                    (starship: StarshipsV1Models) => starship.pilots.map(
                        (pilot: string) => fetch(pilot, {
                            method: 'GET'
                        }).then(res => res.json())
                            .then((data: PeopleV1Models) => data.name)
                    )
                );

                const FILMS_INTO_STARSHIP = await Promise.all(resFilmsStarship.map(async inner => await Promise.all(inner)));
                const PEOPLE_INTO_STARSHIP = await Promise.all(resPilotsStarship.map(async inner => await Promise.all(inner)));

                const DATA_STARSHIPS: ResponseV1Models<StarshipsV1Models> = {
                    count: resJSONStarships.count,
                    previous: resJSONStarships.previous,
                    next: resJSONStarships.next,
                    results: resJSONStarships.results.map((x: StarshipsV1Models, index: number) => {
                        return {
                            name: x.name,
                            model: x.model,
                            starship_class: x.starship_class,
                            manufacturer: x.manufacturer,
                            cost_in_credits: x.cost_in_credits,
                            length: x.length,
                            crew: x.crew,
                            passengers: x.passengers,
                            max_atmospheric_speed: x.max_atmospheric_speed,
                            hyperdrive_rating: x.hyperdrive_rating,
                            MGLT: x.MGLT,
                            cargo_capacity: x.cargo_capacity,
                            consumables: x.consumables,
                            films: FILMS_INTO_STARSHIP[index],
                            pilots: PEOPLE_INTO_STARSHIP[index],
                            url: x.url,
                            created: x.created,
                            edited: x.edited
                        } as StarshipsV1Models
                    })
                }

                dispatchHttp({type: "RESPONSE", response: DATA_STARSHIPS});
                break;

            case 'vehicles':
                let resJSONVehicles: ResponseV1Models<VehiclesV1Models> = await res.json()
                    .catch((): void => {
                        dispatchHttp({type: "ERROR", errorMessage: 'Something went wrong: during data loading with Vehicles !'});
                    });

                const resFilmsVehicles: Array<Array<Promise<any>>> = resJSONVehicles.results.map(
                    (vehicle: VehiclesV1Models) => vehicle.films.map(
                        (film: string) => fetch(film, {
                            method: 'GET'
                        }).then(res => res.json())
                            .then((data: FilmsV1Models) => data.title)
                            .then( (test: string) => console.log(test) )
                    )
                );

                const resPeopleVehicles: Array<Array<Promise<any>>> = resJSONVehicles.results.map(
                    (vehicles: VehiclesV1Models) => vehicles.pilots.map(
                        (people: string) => fetch(people, {
                            method: 'GET'
                        }).then(res => res.json())
                            .then((data: PeopleV1Models) => data.name)
                            .then( (test: string) => console.log(test) )
                    )
                );

                const FILM_INTO_VEHICLES = await Promise.all(resFilmsVehicles.map( async inner => await Promise.all( inner ) ));
                const PEOPLE_INTO_VEHICLES = await Promise.all(resPeopleVehicles.map( async inner => await Promise.all( inner ) ));

                const DATA_VEHICLES: ResponseV1Models<VehiclesV1Models> = {
                    count: resJSONVehicles.count,
                    previous: resJSONVehicles.previous,
                    next: resJSONVehicles.next,
                    results: resJSONVehicles.results.map( (x: VehiclesV1Models, index: number) => {
                        return {
                            name: x.name,
                            model: x.model,
                            vehicles_class: x.vehicles_class,
                            manufacturer: x.manufacturer,
                            length: x.length,
                            cost_in_length: x.cost_in_length,
                            crew: x.crew,
                            passengers: x.passengers,
                            max_atmosphering_speed: x.max_atmosphering_speed,
                            cargo_capacity: x.cargo_capacity,
                            consumables: x.consumables,
                            films: FILM_INTO_VEHICLES[index],
                            pilots: PEOPLE_INTO_VEHICLES[index],
                            url: x.url,
                            created: x.created,
                            edited: x.edited
                        } as VehiclesV1Models
                    })
                }

                dispatchHttp({ type: "RESPONSE", response: DATA_VEHICLES });
                break;

            default:
                break;
        }
    }, []);

    return {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendRequest: sendRequest,
        firstTime: httpState.firstTime,
        clear: clear
    }
};

export default FetchSearchApi;
