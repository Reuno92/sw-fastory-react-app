import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {FetchSingleApi} from "../../hooks/FetchSingleApi";
import {Alert, Card, CardColumns, Col, Container, Row} from "react-bootstrap";
import {LinkModels} from "../../models/Link.models";

export const VehiclesSingle: React.FC = (): JSX.Element => {

    let {id} = useParams<{ id: string | undefined }>();
    const [error, setError] = useState<{ isError: boolean, reason: string }>({isError: false, reason: ""});
    const {sendSingleRequest, data, isLoading} = FetchSingleApi();

    useEffect(() => {
        if (id) {
            sendSingleRequest("http://localhost:7000/api/v1/vehicles/" + id, "GET", "vehicle");
        }
    }, [sendSingleRequest, id]);

    useEffect(() => {
        console.log("DATA Template", data);
    }, [data]);


    return (
        <Container>
            <Row id="vehicle-titles-dates">
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

            <Row id="vehicle-description" className="mt-3">
                <Col xs={12}>
                    <h2>Description</h2>
                </Col>
                <Col xs={12} md={5}>
                    Manufacturer: {data?.manufacturer}
                </Col>
                <Col xs={12} md={5}>
                    Model: {data?.model}
                </Col>
            </Row>

            <Row id="vehicle-technical" className="mt-5">
                <Col xs={12} md={4}>
                    <h2>Technical Data</h2>
                    <table className="list-unstyled">
                        <tr>
                            <td className="pr-4">Class</td>
                            <td>{data?.vehicle_class.charAt(0).toUpperCase() + data?.vehicle_class.slice(1)}</td>
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
                            <td className="pr-4">Cargo Capacity</td>
                            <td>{data?.cargo_capacity} kg</td>
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

            <Row id="vehicle-film" className="mt-5">
                <Col xs={12}>
                    <h2>Appears in</h2>
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
