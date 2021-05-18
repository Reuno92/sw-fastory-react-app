import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {FetchSingleApi} from "../../hooks/FetchSingleApi";
import {Link} from "react-router-dom";
import {CardColumns, Card, Col, Container, Row, ListGroup} from "react-bootstrap";
import {LinkModels} from "../../models/Link.models";

export const PlanetsSingle: React.FC = (): JSX.Element => {

    let {id} = useParams<{ id: string | undefined }>();
    const [error, setError] = useState<{ isError: boolean, reason: string }>({isError: false, reason: ""});
    const {sendSingleRequest, data, isLoading} = FetchSingleApi();

    useEffect(() => {

        if (id) {
            sendSingleRequest("http://localhost:7000/api/v1/planets/" + id, "GET", "planet");
        }

    }, [sendSingleRequest, id]);

    return (
        <Container>
            {
                !isLoading && data && (
                    <React.Fragment>
                        <Row>
                            <Col xs={12} md={6}>
                                <img
                                    className="w-100"
                                    src={process.env.PUBLIC_URL + "/img/planet0" + id + ".webp"}
                                    alt={"Image of " + data?.name}/>
                            </Col>

                            <Col xs={12} md={6}>
                                <h1 className="hyper-title">{data?.name}</h1>
                                <small>
                                    Created at: {data?.created.split("T")[0]} | Edited at: {data?.created.split("T")[0]}
                                </small>
                                <Row className="mt-2">
                                    <Col xs={12} md={5}>
                                        <h2>Informations</h2>
                                        <ul className="list-unstyled mt-3">
                                            <li>Diameter: { data?.diameter } km</li>
                                            <li>Population: { data?.population } hab.</li>
                                            <li>Gravity: { data?.gravity }</li>
                                            <li>Rotation Period: { (data?.rotation_period > 1) ? data?.rotation_period + " hours" : data?.rotation_period + " hour" }</li>
                                            <li>Orbital Period: { (data?.orbital_period > 1) ? data?.orbital_period + " days" : data?.orbital_period + " day" }</li>
                                            <li>Surface water: { data?.surface_water } %</li>
                                            <li>Terrain: { data?.terrain.split(',').map( (x: string) => x.charAt(0).toUpperCase() + x.slice(1)).join(' | ') }</li>
                                            <li>Climate: { data?.climate.split(',').map( (x: string) => x.charAt(0).toUpperCase() + x.slice(1)).join(" | ") } </li>
                                        </ul>
                                    </Col>
                                    <Col xs={12} md={7}>
                                        <h2>Residents</h2>
                                        <ListGroup variant={"flush"}>
                                            {
                                                data?.residents.map( (x: LinkModels) => (
                                                    <Link to={"/people/" + x?.id}>
                                                        <ListGroup.Item action className="bg-dark text-white py-2">{x?.label}</ListGroup.Item>
                                                    </Link>
                                                ))
                                            }
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <h2 className="mt-3">Appears in</h2>
                        <CardColumns>
                                {
                                    data?.films.map( (x: LinkModels) => (
                                        <Link to={"/film/" + x?.id}>
                                            <Card className="bg-dark p-3">
                                                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/img/film0" + x?.id + ".jpg" } />
                                                <Card.Title className="pt-3 text-center">
                                                    {x?.label}
                                                </Card.Title>
                                            </Card>
                                        </Link>
                                    ))
                                }
                        </CardColumns>
                    </React.Fragment>
                )
            }
        </Container>
    )
}
