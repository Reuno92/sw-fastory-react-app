import {useCallback, useReducer} from "react";
import {ResponseV1Models} from "../models/api/Response.v1.models";
import {PlanetsV1Models} from "../models/api/Planets.v1.models";
import {PeopleV1Models} from "../models/api/People.v1.models";
import {FilmsV1Models} from "../models/api/Films.v1.models";
import {StarshipsV1Models} from "../models/api/Starships.v1.models";
import {VehiclesV1Models} from "../models/api/Vehicles.v1.models";
import {SpeciesV1Models} from "../models/api/Species.v1.models";
import {httpReducer, initialState} from "../reducers/Http.reducer";

export const FetchPeople = () => {

    const [httpState, dispatchHtp] = useReducer(httpReducer, initialState);
    const clear = useCallback( () => dispatchHtp({type: "CLEAR"}), []);

    const sendRequest = useCallback( async (uri: string, method: string, body?: any) => {

        const res = await fetch(uri, {
            method: method,
            headers: {
                "Content-Type"  : "application/json; charset=utf-8",
                "Accept"        : "application/json",
            }
        })

        let resJSON: ResponseV1Models<PeopleV1Models> = await res.json()
            .catch( (): void => {
                dispatchHtp({ type: "ERROR", errorMessage: 'Something went wrong!'})
            });

        const resFilms: Array<Array<Promise<any>>> = resJSON.results.map(
                (people: PeopleV1Models) => people.films.map(
                    (film: string) => fetch(film, {
                        method: 'GET'
                    }).then(x => x.json())
                      .then((data: FilmsV1Models) => data.title)
            )
        );

        const resSpecies = await resJSON.results.map(
            (people: PeopleV1Models) => people.species.map(
                (specie: string ) => fetch(specie, {
                    method: 'GET'
                }).then(x => x.json())
                  .then( (data: SpeciesV1Models) => data.name)
            )
        );

        const resStarships: Array<Array<Promise<any>>> = await resJSON.results.map(
            (people: PeopleV1Models) => people.starships.map(
                (starship: string) => fetch(starship, {
                    method: 'GET'
                }).then(res => res.json())
                  .then( (data: StarshipsV1Models) => data.name)
            )
        );

        const resVehicles: Array<Array<Promise<any>>> = await resJSON.results.map(
            (people: PeopleV1Models) => people.vehicles.map(
                (vehicle: string) => fetch(vehicle, {
                    method: 'GET'
                }).then(res => res.json())
                  .then( ( data: VehiclesV1Models) => data.name)
            )
        );

        const resPlanet: Array<Promise<any>> = await resJSON.results.flatMap(
            (people: PeopleV1Models) => fetch(people.homeworld, {
                method: 'GET'
            }).then( res => res.json())
              .then( (data: PlanetsV1Models) => data.name)
        );

        const FILMS      = await Promise.all(resFilms.map( async inner => await Promise.all(inner)));
        const SPECIES    = await Promise.all(resSpecies.map( async inner => await Promise.all(inner)));
        const STARSHIPS  = await Promise.all(resStarships.map( async inner => await Promise.all(inner)));
        const VEHICLES   = await Promise.all(resVehicles.map( async inner => await Promise.all(inner)));
        const HOME_WORLD = await Promise.all(resPlanet);

        let data: ResponseV1Models<PeopleV1Models> = {
            count: resJSON.count,
            previous: resJSON.previous,
            next: resJSON.next,
            results: resJSON.results.map( (x: PeopleV1Models, index: number) => {
                return {
                    name: x.name,
                    birth_year: x.birth_year,
                    eye_color: x.eye_color,
                    gender: x.gender,
                    hair_color: x.hair_color,
                    height: x.height,
                    mass: x.mass,
                    skin_color: x.skin_color,
                    homeworld: HOME_WORLD[index],
                    films: FILMS[index],
                    species: SPECIES[index],
                    starships: STARSHIPS[index],
                    vehicles: VEHICLES[index],
                    url: x.url,
                    created: x.created,
                    edited: x.edited,
                } as unknown as PeopleV1Models
            })
        };

        dispatchHtp({type: "RESPONSE", response: data});
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

export default FetchPeople;
