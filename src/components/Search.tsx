import React, { useState, useReducer, useCallback, useMemo} from "react";
import SearchResult from "./Search/SearchResult";
import SearchInput from "./Search/SearchInput";
import {Alert} from "react-bootstrap";

const Search: React.FC = () => {

    const resultsReducer = (currentResults: any, action: any) => {
        switch (action.type) {
            case "SHOW":
                return action.results;
            case "SEND":
                return currentResults;
            default:
                throw new Error("Something went wrong!");
        }
    }

    const [error, setError] = useState("");

    const [userResults, dispatchResults] = useReducer(resultsReducer, []);

    const loadedResults = useCallback(filteredResults => {
        dispatchResults({type: "SHOW", results: filteredResults});
    }, []);

    const errorMessageHandler = useMemo( ()  => {
        return (<Alert variant={"danger"}>{error}</Alert>)
    }, [error]);

    const resultList = useMemo(() => {
        return (<SearchResult results={userResults} />)
    }, [userResults]);

    return (
        <React.Fragment>
            <SearchInput onLoadedResults={loadedResults} />
            {
                error && errorMessageHandler
            }
            {
                (userResults) ? resultList : null
            }
        </React.Fragment>
    )
}

export default Search;
