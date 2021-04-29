import React, {
    useState, useCallback, useEffect,
} from "react";
import {Alert, Spinner} from "react-bootstrap";
import FetchSearchApi from "../../hooks/FetchSearchApi";
import { OptionsSelect } from "../../models/optionsSelect";

type SearchInputProps = {
    onLoadedResults: any;
}

const SearchInput: React.MemoExoticComponent<(props: React.PropsWithChildren<SearchInputProps>) => JSX.Element> =
    React.memo((props: React.PropsWithChildren<SearchInputProps>): JSX.Element => {

            const {onLoadedResults} = props;

            const [term, setTerm] = useState("");
            const [entity, setEntity] = useState("people");
            const [userError, setUserError] = useState(false);

            const inputField = React.useRef() as React.MutableRefObject<HTMLInputElement>;
            const {sendRequest, data, isLoading} = FetchSearchApi();

            const enterHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    submitHandler()
                }
            }

            const submission = (): void => {
                submitHandler()
            }

            const submitHandler = useCallback(() => {
                    setUserError(false);

                    if (term.length >= 3) {
                        sendRequest(`http://localhost:7000/api/v1/${entity}?search=${term.trim()}`, "GET", entity);
                    } else {
                        setUserError(true);
                    }

                }, [term, entity, sendRequest] );

            const options: Array<OptionsSelect> = [
                {
                    label: "People",
                    value: "people",
                },
                {
                    label: "Planets",
                    value: "planets",
                },
                {
                    label: "Starships",
                    value: "starships",
                },
                {
                    label: "Species",
                    value: "species",
                },
                {
                    label: "Films",
                    value: "films",
                },
                {
                    label: "Vehicles",
                    value: "vehicles",
                },
            ]

            useEffect(() => {
                let loadedResults: any;

                if (data) {
                    loadedResults = data;
                }

                onLoadedResults(loadedResults);
            }, [data, onLoadedResults]);

            return (
                <React.Fragment>
                    <section className="container">
                        <label className="input-text h1">Search Term</label>
                        <section className="input-group">
                            <button className="btn btn-outline-secondary input-group-append" type="submit"
                                    onClick={submission}
                                    disabled={isLoading}>
                                {
                                    !isLoading && ("Search")
                                }
                                {
                                    isLoading && (
                                        <React.Fragment>
                                            <Spinner animation="border" role="status" size={"sm"} className="mr-2">
                                                <span className="sr-only">Loading...</span>
                                            </Spinner>
                                            Loading…
                                        </React.Fragment>
                                    )
                                }
                            </button>
                            <select
                                className="input-group-select"
                                value={entity}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEntity(e.target.value)}>
                                {
                                    options.map( (option: OptionsSelect, index: number) => (
                                        <option key={index} value={option.value}>{option.label}</option>
                                    ) )
                                }
                            </select>
                            <input
                                className="form-control"
                                type="text"
                                ref={inputField}
                                value={term}
                                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => enterHandler(e)}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTerm(e.target.value)}/>
                        </section>
                        <small id="searchHelp" className="form-text text-white">
                            Search <strong>Skywalker</strong> with <i>People</i>, <strong>Falcon</strong> with <i>Starships</i>,
                            or <strong>Tie</strong> with <i>Vehicles</i>.
                            Your search must be contains more 3 characters.
                        </small>
                        {
                            userError && (
                                <Alert variant="danger" className="mt-4 mb-3">Your search term must contains more 2
                                    characters</Alert>
                            )
                        }
                    </section>
                </React.Fragment>
            )
        }
    )

export default SearchInput;

