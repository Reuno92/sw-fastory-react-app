import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {FetchSingleApi} from "../../hooks/FetchSingleApi";
import {Col, Container, Row, Spinner} from "react-bootstrap";

export const FilmsSingle: React.FC = (): JSX.Element => {

    const history = useHistory();

    let {id} = useParams<{ id: string | undefined }>();
    const [error, setError] = useState<{ isError: boolean, reason: string }>({isError: false, reason: ""});
    const {sendSingleRequest, data, isLoading} = FetchSingleApi();

    useEffect( () => {

        if (id) {
            sendSingleRequest("http://localhost:7000/api/v1/films/" + id, "GET", "film");
        }

    }, [sendSingleRequest, id, history]);


    return (
        <Container>
            {
                isLoading && (
                    <Spinner animation={"border"} />
                )
            }
            {
                !isLoading && data && (
                    <React.Fragment>
                        <Row>
                            <Col xs={12} md={3}>
                            <img
                                className="w-100"
                                src={process.env.PUBLIC_URL + "/img/film0" + id + ".jpg"}
                                alt={"Image of " + data?.name}/>
                            </Col>

                            <Col xs={12} md={9}>
                                <h1>{data?.title}</h1>
                                <small>
                                    Created at: {data?.created.split("T")[0]} | Edited at: {data?.created.split("T")[0]}
                                </small>
                                <p className="mt-3">{data?.opening_crawl}</p>
                                <Row>
                                    <Col>
                                        <h2>Producer</h2>
                                        <ul className="list-group">
                                            {
                                                data?.producer
                                            }
                                        </ul>
                                    </Col>

                                    <Col>
                                        <h2>Director</h2>
                                        {
                                            data?.director
                                        }
                                    </Col>
                                </Row>

                                <h2>Release</h2>
                                <p>{ data?.release_date }</p>

                            </Col>
                        </Row>
                    </React.Fragment>
                )
            }
        </Container>
    )
}
