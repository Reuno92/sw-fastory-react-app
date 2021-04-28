import {Fragment, PropsWithChildren, useEffect} from "react";
import FetchApi from "../../hooks/FetchSearchApi";
import {Alert, Table} from "react-bootstrap";
import {PeopleV1Models, PlanetsV1Models, FilmsV1Models, SpeciesV1Models, StarshipsV1Models, VehiclesV1Models} from "../../models/api";

type SearchResultType = {
    previous: string,
    next: string,
    count: number,
    result: Array<any>,
}

const SearchResult = (props: PropsWithChildren<any>) => {
    const {isLoading, error, firstTime} = FetchApi();
    const {results} = props;

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
        return obj.title !== undefined
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
                        <strong>Awwww!</strong> Your results is too large (more 10 items), you could precise your
                        search.
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
                                <th>Name</th>
                                {
                                    isPeople(results.results[0]) && (
                                        <Fragment>
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
                                            <th>Diameter (km)</th>
                                            <th>Population</th>
                                            <th>Films</th>
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
                                results.results.map((result: any, index: number) => (
                                    <tr key={result.name}>
                                        <td>{result.name}</td>
                                        {
                                            isPeople(results.results[0]) && (
                                                <Fragment>
                                                    <td>{result.birth_year}</td>
                                                    <td>{firstLetter(result.gender)}</td>
                                                    <td>{result.homeworld}</td>
                                                    <td>{result.films.join(', ')}</td>
                                                    <td>{result.created.split('T')[0]}</td>
                                                    <td>{result.edited.split('T')[0]}</td>
                                                </Fragment>
                                            )
                                        }
                                        {
                                            isPlanets(results.results[0]) && (
                                                <Fragment>
                                                    <td>{result.diameter}</td>
                                                    <td>{result.population}</td>
                                                    <td>{result.films.join(', ')}</td>
                                                    <td>{result.created.split('T')[0]}</td>
                                                    <td>{result.edited.split('T')[0]}</td>
                                                </Fragment>
                                            )
                                        }
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => console.log(result.url)}>
                                                See
                                            </button>
                                        </td>
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
