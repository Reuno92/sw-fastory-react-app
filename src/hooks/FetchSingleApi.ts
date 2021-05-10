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
import {LinkModels} from "../models/Link.models";

export const FetchSingleApi = () => {

    const [httpSingleState, dispatchSingleState] = useReducer(httpReducer, initialState);
    const clear = useCallback( () => dispatchSingleState({type: "CLEAR"}), []);

    const sendRequest = useCallback( async (uri: string, method: string, entity: string) => {

        let res =  await fetch(uri, { method: method, headers: {
                "Content-Type" : "application/json; charset=utf-8",
                "Accept"       : "application/json"
            }
        });

        switch(entity) {
            case "people": {
                let resJSONPeople: ResponseV1Models<PeopleV1Models> = await res.json()
                    .catch( () => dispatchSingleState({type: "ERROR", errorMessage: "Something went wrong during loading data People" }));

                const resFilmsPeople: Array<Array<Promise<any>>> = resJSONPeople.results.map(
                    (people: PeopleV1Models) => people.films.map(
                        (film: string) => fetch(film, {
                            method: "GET"
                        }).then( (x: Response) => x.json())
                          .then( (data: FilmsV1Models) => {
                              return {
                                  id: (data?.url) ? data?.url.match(/\d+/)![0] : "none",
                                  label: data?.title
                              } as LinkModels
                          })
                            .catch((): void => {
                                dispatchSingleState({
                                    type: "ERROR",
                                    errorMessage: 'Something went wrong during call api for search films.'
                                })
                            })
                    )
                )

                const resSpeciesPeople = await resJSONPeople.results.map(
                    (people: PeopleV1Models) => people.species.map(
                        (specie: string) => fetch(specie, {
                            method: 'GET'
                        }).then(x => x.json())
                            .then((data: SpeciesV1Models) => data.name)
                            .catch((): void => {
                                dispatchSingleState({
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
                                dispatchSingleState({
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
                                dispatchSingleState({
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
                            dispatchSingleState({
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


                break;
            }

            default: {
                //statements;
                break;
            }
        }


    }, []);


}
