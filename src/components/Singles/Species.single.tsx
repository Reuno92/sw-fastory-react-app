import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {FetchSingleApi} from "../../hooks/FetchSingleApi";
import {Link} from "react-router-dom";
import {Container, Row, Col, CardColumns, Card, ListGroup} from "react-bootstrap";
import {LinkModels} from "../../models/Link.models";

export const SpeciesSingle: React.FC = (): JSX.Element => {

    let {id} = useParams<{ id: string | undefined }>();
    const [error, setError] = useState<{ isError: boolean, reason: string }>({isError: false, reason: ""});
    const {sendSingleRequest, data, isLoading} = FetchSingleApi();


    useEffect(() => {

        if (id) {
            sendSingleRequest("http://localhost:7000/api/v1/species/" + id, "GET", "specie");
        }

    }, [sendSingleRequest, id]);

    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <Container>
            <Row>
                <Col xs={12} md={4}>
                    <img className="w-100"
                         src={process.env.PUBLIC_URL + "/img/" + data?.name + ".jpg"}
                         alt={"Image of " + data?.name}/>
                </Col>
                <Col xs={12} md={8}>
                    <h1>{data?.name}</h1>
                    <small className="mb-3">
                        Created at: {data?.created.split("T")[0]} | Edited at: {data?.created.split("T")[0]}
                    </small>
                    <Row className="mt-3">
                        <Col>
                            <h2>General</h2>
                            <ul className="list-unstyled">
                                <li>Origin: <Link to={"/planet/" + data?.homeworld?.id}>{data?.homeworld?.label}</Link>
                                </li>
                                <li>Classification: {data?.classification.charAt(0).toUpperCase() + data?.classification.slice(1)}</li>
                                <li>Average lifespan: {data?.average_lifespan} years</li>
                                <li>Average height: {data?.average_height} cm</li>
                                <li>Language: {data?.language}</li>
                                <li>Designation: {data?.designation.charAt(0).toUpperCase() + data?.designation.slice(1)}</li>
                            </ul>
                        </Col>
                        <Col>
                            <h2>Colors</h2>
                            <ul className="list-unstyled">
                                <li>Skin
                                    Colors: {data?.skin_colors.split(", ").map((x: string) => x?.charAt(0).toUpperCase() + x?.slice(1)).join(" | ")}</li>
                                <li>Skin eye: {data?.eye_colors.split(", ").map(
                                    (color: string) => (
                                        <div className="badge badge-pill d-inline"
                                             style={{"backgroundColor": color, "marginRight": "5px"}}>
                                            <span>{color}</span>
                                        </div>
                                    )
                                )}</li>
                                <li>Hair colors: {data?.hair_colors.split(", ").map(
                                    (color: string) => (
                                        <div className="badge badge-pill d-inline"
                                             style={{"backgroundColor": color, "marginRight": "5px"}}>
                                            <span>{color}</span>
                                        </div>
                                    )
                                )}</li>
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2>Individuals</h2>
                            <ListGroup horizontal>
                                {
                                    data?.people.map((individual: LinkModels) => (
                                        <Link to={"/people/" + individual?.id}>
                                            <ListGroup.Item action className="bg-dark text-white">{individual?.label}</ListGroup.Item>
                                        </Link>
                                    ))
                                }
                            </ListGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <CardColumns className="mt-3">
                {
                    data?.films.map((film: LinkModels) => (
                        <Link to={"/film/" + film?.id}>
                            <Card className="bg-dark p-3 text-center">
                                <Card.Img variant="top"
                                          src={process.env.PUBLIC_URL + "/img/film0" + film?.id + ".jpg"}/>
                                <Card.Title className="mt-3">
                                    {film?.label}
                                </Card.Title>
                            </Card>
                        </Link>
                    ))
                }
            </CardColumns>
        </Container>
    )
}
