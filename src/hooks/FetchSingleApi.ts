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
import {PeopleSingleV1Models} from "../models/singles/PeopleSingle.v1.models";
import {ResponseSingleV1Models} from "../models/singles/ResponseSingle.v1.models";

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

                dispatchSingleState({type: "RESPONSE", response: DATA_PEOPLE});

                break;
            }

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
