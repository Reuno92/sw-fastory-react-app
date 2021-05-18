import React, {useEffect, useState} from 'react';
import {Alert, Card, CardColumns, Col, Container, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {FetchSingleApi} from "../../hooks/FetchSingleApi";
import {LinkModels} from "../../models/Link.models";

export const StarshipsSingle: React.FC = (): JSX.Element => {

    let {id} = useParams<{ id: string | undefined }>();
    const [error, setError] = useState<{ isError: boolean, reason: string }>({isError: false, reason: ""});
    const {sendSingleRequest, data, isLoading} = FetchSingleApi();


    useEffect(() => {

        if (id) {
            sendSingleRequest("http://localhost:7000/api/v1/starships/" + id, "GET", "starship");
        }

    }, [sendSingleRequest, id]);

    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <Container>

            <Row>
                <Col xs={12}>
                    <img className="w-100"
                         src={process.env.PUBLIC_URL + "/img/" + data?.name + ".webp"}
                         alt={"Image of " + data?.name}/>
                </Col>
                <Col xs={12} className="mt-5">
                    <h1>{data?.name}</h1>
                    <small className="mb-3">
                        Created at: {data?.created.split("T")[0]} | Edited at: {data?.created.split("T")[0]}
                    </small>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col xs={12}>
                    <h2>Description</h2>
                </Col>
                <Col xs={12} md={6}>
                    Manufacturer: {data?.manufacturer}
                </Col>

                <Col xs={12} md={6}>
                    Model: {data?.model}
                </Col>
            </Row>

            <Row className="mt-5">
                <Col xs={12} md={4}>
                    <h2>Technical Data</h2>
                    <table className="list-unstyled">
                        <tr>
                            <td className="pr-4">Class</td>
                            <td>{data?.starship_class.charAt(0).toUpperCase() + data?.starship_class.slice(1)}</td>
                        </tr>

                        <tr>
                            <td className="pr-4">Length</td>
                            <td>{data?.length} meters</td>
                        </tr>

                        <tr>
                            <td className="pr-4">Autonomy</td>
                            <td>{data?.consumables}</td>
                        </tr>

                        <tr>
                            <td className="pr-4">Max. Atmospheric Speed</td>
                            <td>{data?.max_atmosphering_speed}</td>
                        </tr>

                        <tr>
                            <td className="pr-4">MegaLight per Hour</td>
                            <td>{data?.MGLT} MGLT</td>
                        </tr>

                        <tr>
                            <td className="pr-4">Hyperdrive Rating</td>
                            <td>{data?.hyperdrive_rating}</td>
                        </tr>

                        <tr>
                            <td className="pr-4">Cargo Capacity</td>
                            <td>{data?.cargo_capacity}</td>
                        </tr>

                        <tr>
                            <td className="pr-4">Crew</td>
                            <td>{data?.crew} members</td>
                        </tr>

                        <tr>
                            <td className="pr-4">Passengers</td>
                            <td>{data?.passengers} persons</td>
                        </tr>

                        <tr>
                            <td className="pr-4">Cost</td>
                            <td>{data?.cost_in_credits} CR</td>
                        </tr>
                    </table>
                </Col>
                <Col xs={12} md={8}>
                    <h2>Members</h2>
                    {
                        (data?.pilots.length > 0) && (
                            <CardColumns>
                                {
                                    data?.pilots.map((pilot: LinkModels) => (
                                        <Card className="bg-dark">
                                            <Card.Img variant="top"
                                                      src={process.env.PUBLIC_URL + "/img/pilot0" + pilot?.id + ".jpg"}/>
                                            <Card.Title>{pilot?.label}</Card.Title>
                                        </Card>
                                    ))
                                }

                            </CardColumns>
                        )
                    }
                    {
                        (data?.pilots.length === 0) && (
                            <Alert variant="danger">
                                No pilots exist in database.
                            </Alert>
                        )
                    }
                </Col>
            </Row>

            <Row className="mt-5">
                <Col xs={12}>
                    <CardColumns>
                        {
                            data?.films.map(
                                (film: LinkModels) => (
                                    <Card className="bg-dark p-3 text-center">
                                        <Card.Img variant="top"
                                                  src={process.env.PUBLIC_URL + "/img/Film0" + film?.id + ".jpg"}/>
                                        <Card.Title className="mt-3">{film?.label}</Card.Title>
                                    </Card>
                                )
                            )
                        }
                    </CardColumns>
                </Col>
            </Row>
        </Container>
    )
}
