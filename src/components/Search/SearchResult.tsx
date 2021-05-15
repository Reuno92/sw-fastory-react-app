import {Fragment, PropsWithChildren, useCallback, useEffect} from "react";
import FetchApi from "../../hooks/FetchSearchApi";
import {Alert, Table} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {PeopleV1Models, PlanetsV1Models, FilmsV1Models, SpeciesV1Models, StarshipsV1Models, VehiclesV1Models} from "../../models/api";

type SearchResultType = {
    results: any
}

const SearchResult = (props: PropsWithChildren<SearchResultType>) => {
    const { isLoading, error } = FetchApi();
    const { results } = props;

    const history = useHistory();

    const isPeople = (obj: any): obj is PeopleV1Models => {
        return obj.hair_color !== undefined
    }

    const isPlanets = (obj: any): obj is PlanetsV1Models => {
        return obj.population !== undefined
    }

    const isFilms = (obj: any): obj is FilmsV1Models => {
        return obj.title !== undefined
    }

    const isSpecies = (obj: any): obj is SpeciesV1Models => {
        return obj.average_height !== undefined
    }

    const isStarships = (obj: any): obj is StarshipsV1Models => {
        return obj.hyperdrive_rating !== undefined
    }

    const isVehicles = (obj: any): obj is VehiclesV1Models => {
        return obj.max_atmosphering_speed !== undefined
    }

    useEffect( () => {
        console.log(results);
    }, [results]);

    function firstLetter(gender: string) {
        return gender.charAt(0).toUpperCase() + gender.slice(1);
    }

    const goToSingle = useCallback((id: string, entity: string) => { history.push(`/${entity}/${id}`) }, [history]);


    return (
        <section className="container">
            {
                results && results.count === 0 && (
                    <Alert variant="warning" className="mt-4 mb-3">
                        <strong>Oups!</strong> Nothing was found.
                    </Alert>
                )
            }
            {
                results && !isLoading && results === [] && error && (
                    <Alert variant="danger" className="mt-4 mb-3">
                        <strong>Oups!</strong> Something went wrong.
                    </Alert>
                )
            }
            {
                results && !isLoading && results.length >= 10 && (
                    <Alert variant="warning" className="mt-4 mb-3">
                        <strong>Awwww!</strong> Your results is too large (more 10 items), you could precise your search.
                    </Alert>
                )
            }
            {
                results.results && !isLoading && results.results.length > 0 && (
                    <Fragment>
                        <section className="d-flex justify-content-between">
                            <small>Items found: {results.count}</small>

                            {/*
                            <nav aria-label="Page navigation">
                                <ul className="pagination pagination-sm">
                                    <li className="page-item"><a className="page-link transparent first"
                                                                 href="">First</a></li>
                                    <li className="page-item"><a className="page-link transparent" href="">Previous</a>
                                    </li>
                                    <li className="page-item"><a className="page-link transparent active" href="">1</a>
                                    </li>
                                    <li className="page-item"><a className="page-link transparent" href="">2</a></li>
                                    <li className="page-item"><a className="page-link transparent" href="">3</a></li>
                                    <li className="page-item"><a className="page-link transparent" href="">Next</a></li>
                                    <li className="page-item"><a className="page-link transparent last" href="">Last</a>
                                    </li>
                                </ul>
                            </nav>
                            */}

                        </section>
                        <Table borderless striped hover className="text-white">
                            <thead>
                            <tr>
                                {
                                    isPeople(results.results[0]) && (
                                        <Fragment>
                                            <th>Name</th>
                                            <th>Birth&nbsp;Year</th>
                                            <th>Gender</th>
                                            <th>Origin</th>
                                            <th>Films</th>
                                            <th>Created</th>
                                            <th>Edited</th>
                                        </Fragment>
                                    )
                                }
                                {
                                    isPlanets(results.results[0]) && (
                                        <Fragment>
                                            <th>Name</th>
                                            <th>Diameter (km)</th>
                                            <th>Population</th>
                                            <th>Films</th>
                                            <th>Created</th>
                                            <th>Edited</th>
                                        </Fragment>
                                    )
                                }
                                {
                                    isFilms(results.results[0]) && (
                                        <Fragment>
                                            <th>Title</th>
                                            <th>Release Date</th>
                                            <th>Director</th>
                                            <th>Producer</th>
                                            <th>Species</th>
                                            <th>Created</th>
                                            <th>Edited</th>
                                        </Fragment>
                                    )
                                }
                                {
                                    isSpecies(results.results[0]) && (
                                        <Fragment>
                                            <th>Name</th>
                                            <th>Classification</th>
                                            <th>Sentient</th>
                                            <th>Language</th>
                                            <th>Created</th>
                                            <th>Edited</th>
                                        </Fragment>
                                    )
                                }
                                {
                                    isStarships(results.results[0]) && (
                                        <Fragment>
                                            <th>Name</th>
                                            <th>Model</th>
                                            <th>Manufacturer</th>
                                            <th>Cost&nbsp;in&nbsp;credits</th>
                                            <th>Length</th>
                                            <th>Created</th>
                                            <th>Edited</th>
                                        </Fragment>
                                    )
                                }
                                {
                                    isVehicles(results.results[0]) && (
                                        <Fragment>
                                            <th>Name</th>
                                            <th>Model</th>
                                            <th>Manufacturer</th>
                                            <th>Cost&nbsp;in&nbsp;credits</th>
                                            <th>Length</th>
                                            <th>Created</th>
                                            <th>Edited</th>
                                        </Fragment>
                                    )
                                }
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                results.results.map((result: any) => (
                                    <tr key={result?.name || result?.title}>

                                        {
                                            isPeople(results.results[0]) && (
                                                <Fragment>
                                                    <td>{result?.name}</td>
                                                    <td>{result?.birth_year}</td>
                                                    <td>{firstLetter(result?.gender)}</td>
                                                    <td>{result?.homeworld}</td>
                                                    <td>{result?.films.join(', ')}</td>
                                                    <td>{result?.created.split('T')[0]}</td>
                                                    <td>{result?.edited.split('T')[0]}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={() => goToSingle(result.url.match(/(?<=people\/)\d+/gm), 'people') }>
                                                            See
                                                        </button>
                                                    </td>
                                                </Fragment>
                                            )
                                        }
                                        {
                                            isPlanets(results.results[0]) && (
                                                <Fragment>
                                                    <td>{result?.name}</td>
                                                    <td>{result?.diameter}</td>
                                                    <td>{result?.population}</td>
                                                    <td>{result?.films.join(', ')}</td>
                                                    <td>{result?.created.split('T')[0]}</td>
                                                    <td>{result?.edited.split('T')[0]}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={() => goToSingle(result.url.match(/(?<=planets\/)\d+/gm), "planet") }>
                                                            See
                                                        </button>
                                                    </td>
                                                </Fragment>
                                            )
                                        }
                                        {
                                            isFilms(results.results[0]) && (
                                                <Fragment>
                                                    <td>{result?.title}</td>
                                                    <td>{result?.release_date}</td>
                                                    <td>{result?.director}</td>
                                                    <td>{result?.producer}</td>
                                                    <td>{result?.created.split('T')[0]}</td>
                                                    <td>{result?.edited.split('T')[0]}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={() => goToSingle(result.url.match(/(?<=films\/)\d+/gm), 'film') }>
                                                            See
                                                        </button>
                                                    </td>
                                                </Fragment>
                                            )
                                        }
                                        {
                                            isSpecies(results.results[0]) && (
                                                <Fragment>
                                                    <td>{result?.name}</td>
                                                    <td>{result?.classification}</td>
                                                    <td>{result?.designation}</td>
                                                    <td>{result?.language}</td>
                                                    <td>{result?.created.split('T')[0]}</td>
                                                    <td>{result?.edited.split('T')[0]}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={() => goToSingle(result.url.match(/(?<=species\/)\d+/gm), 'specie') }>
                                                            See
                                                        </button>
                                                    </td>
                                                </Fragment>
                                            )
                                        }
                                        {
                                            isStarships(results.results[0]) && (
                                                <Fragment>
                                                    <td>{result?.name}</td>
                                                    <td>{result?.model}</td>
                                                    <td>{result?.manufacturer}</td>
                                                    <td>{result?.cost_in_credits}</td>
                                                    <td>{result?.length}</td>
                                                    <td>{result?.created.split('T')[0]}</td>
                                                    <td>{result?.edited.split('T')[0]}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={() => goToSingle(result.url.match(/(?<=starships\/)\d+/gm), 'starship') }>
                                                            See
                                                        </button>
                                                    </td>
                                                </Fragment>
                                            )
                                        }
                                        {
                                            isVehicles(results.results[0]) && (
                                                <Fragment>
                                                    <td>{result?.name}</td>
                                                    <td>{result?.model}</td>
                                                    <td>{result?.manufacturer}</td>
                                                    <td>{result?.cost_in_credits}</td>
                                                    <td>{result?.length}</td>
                                                    <td>{result?.created}</td>
                                                    <td>{result?.edited}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={() => goToSingle(result.url.match(/(?<=vehicles\/)\d+/gm), 'vehicle') }>
                                                            See
                                                        </button>
                                                    </td>
                                                </Fragment>
                                            )
                                        }
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                        <section className="d-flex justify-content-between">
                            <small>Items found: {results.count}</small>

                            {/*
                            <nav aria-label="Page navigation">
                                <ul className="pagination pagination-sm">
                                    <li className="page-item"><a className="page-link transparent first"
                                                                 href="">First</a></li>
                                    <li className="page-item"><a className="page-link transparent" href="">Previous</a>
                                    </li>
                                    <li className="page-item"><a className="page-link transparent active" href="">1</a>
                                    </li>
                                    <li className="page-item"><a className="page-link transparent" href="">2</a></li>
                                    <li className="page-item"><a className="page-link transparent" href="">3</a></li>
                                    <li className="page-item"><a className="page-link transparent" href="">Next</a></li>
                                    <li className="page-item"><a className="page-link transparent last" href="">Last</a>
                                    </li>
                                </ul>
                            </nav>
                            */}

                        </section>
                    </Fragment>
                )
            }
        </section>
    )
};

export default SearchResult;
