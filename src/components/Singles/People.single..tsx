import React, {useEffect, useState} from "react";
import {Col, Container, Row, Spinner, CardColumns, Card} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {LinkModels} from "../../models/Link.models";
import {FetchSingleApi} from "../../hooks/FetchSingleApi";

export const PeopleSingle: React.FC = (): JSX.Element => {

    let {id} = useParams<{ id: string | undefined }>();
    const [error, setError] = useState<{ isError: boolean, reason: string }>({isError: false, reason: ""});
    const {sendSingleRequest, data, isLoading} = FetchSingleApi();

    useEffect(() => {

        if (id) {
            sendSingleRequest("http://localhost:7000/api/v1/people/" + id, "GET", "people");
        }

        if (!id) {
            setError({isError: true, reason: "Id is undefined"});
        }

    }, [sendSingleRequest, id]);


    return (
        <Container>
            {
                isLoading && (
                    <Spinner animation={"border"}/>
                )
            }
            {
                !isLoading && (
                    <React.Fragment>
                        <Row>
                            <Col xs={2}>
                                <img
                                    className="img-fluid"
                                    src={process.env.PUBLIC_URL + /img/ + data?.name + ".jpg"}
                                    alt={"Image of " + data?.name}/>
                            </Col>
                            <Col xs={10}>
                                <h1>{data?.name}</h1>
                                <small>
                                    Created at: {data?.created.split("T")[0]} | Edited at: {data?.created.split("T")[0]}
                                </small>
                            </Col>
                        </Row>

                        <section className="mt-5">

                            <Row>
                                <Col xs={4}>
                                    <h2>Identity</h2>
                                    <ul className="list-group">
                                        <li className="list-group-item bg-dark">Birth Year: {data?.birth_year}</li>
                                        <li className="list-group-item bg-dark">Gender: {data?.gender}</li>
                                        {<li className="list-group-item bg-dark">
                                            Species: {
                                            (data?.species.length !== 0) ?
                                                data?.species.map(
                                                    (x: LinkModels) => (
                                                        <Link to={"/species/" + x?.id}>{x?.label}</Link>
                                                    )) : "None"
                                        }
                                        </li>}
                                    </ul>
                                </Col>

                                <Col xs={4}>
                                    <h2>Measures</h2>
                                    <ul className="list-group">
                                        <li className="list-group-item bg-dark">Height: {data?.height} cm</li>
                                        <li className="list-group-item bg-dark">Weight: {data?.mass} kg</li>
                                    </ul>

                                </Col>


                                <Col xs={4}>
                                    <h2>{
                                        (data?.gender === "male") ? "His " : (data?.gender === "female") ? "Her " : "It "}
                                        colors
                                    </h2>
                                    <ul className="list-group">
                                        <li className="list-group-item bg-dark">Skin: {data?.skin_color}</li>
                                        <li className="list-group-item bg-dark">Eye: {data?.eye_color}</li>
                                        <li className="list-group-item bg-dark">Hair: {data?.hair_color}</li>
                                    </ul>

                                </Col>
                            </Row>


                            <h2 className="mt-5">Appears in</h2>
                            <CardColumns>
                                {
                                    data?.films.map(
                                        (film: LinkModels) => (
                                            <Link to={"/films/" + film?.id}>{
                                                <Card key={film?.id} className="bg-dark p-3">
                                                    <Card.Img variant="top" src={process.env.PUBLIC_URL + "/img/film0" + film?.id + ".jpg"} />
                                                    <Card.Body>
                                                        <Card.Title>
                                                            {film?.label}
                                                        </Card.Title>
                                                    </Card.Body>

                                                </Card>
                                            }</Link>
                                        ))
                                }
                            </CardColumns>

                            <h2 className="mt-5">Drive</h2>
                            <Row>
                                <Col>
                                    <h3>Starships</h3>
                                    <ul className="list-group">
                                        {
                                            data?.starships.map(
                                                (starship: LinkModels) => (
                                                    <Link to={"/starship/" + starship?.id}>
                                                        <li key={starship?.id} className="list-group-item bg-dark">
                                                            {starship?.label}
                                                        </li>
                                                    </Link>
                                                ))
                                        }
                                    </ul>
                                </Col>
                                <Col>
                                    <h3>Vehicles</h3>
                                    <ul className="list-group">
                                        {
                                            data?.vehicles.map((vehicle: LinkModels) => (
                                                <Link to={"/vehicles/" + vehicle?.id}>
                                                    <li key={vehicle?.id} className="list-group-item bg-dark">
                                                        {vehicle?.label}
                                                    </li>
                                                </Link>
                                            ))
                                        }
                                    </ul>
                                </Col>
                            </Row>

                        </section>
                    </React.Fragment>
                )
            }

        </Container>
    )
}
