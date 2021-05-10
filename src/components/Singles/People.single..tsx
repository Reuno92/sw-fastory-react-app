import React, {useState} from "react";
import {PeopleSingleV1Models} from "../../models/singles/PeopleSingle.v1.models";
import {Row, Container, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import {LinkModels} from "../../models/Link.models";

const PeopleSingle: React.FC = (): JSX.Element => {


    const [data, setData] = useState<PeopleSingleV1Models | null>(null);

    return (
        <Container>
            <Row>
                <Col>
                    <img
                        className="img-thumbnail"
                        src={"assets/img/" + data?.name + ".jpg"}
                        alt={data?.name} />
                </Col>
                <Col>
                    <h1>{data?.name}</h1>
                    <hr/>
                    Created at: {data?.created} | Edited at: {data?.created}
                </Col>
            </Row>

            <section>
                <h2>Characteristic</h2>
                <Row>

                    <Col>
                        <h3>Identity</h3>
                        <p>Birth Year: {data?.birth_year}</p>
                        <p>Gender: {data?.gender}</p>
                        <p>
                            Species: {
                            data?.species.map(
                                (x: LinkModels) => (
                                    <Link to={"/species/" + x?.id}>{x?.label}</Link>
                                ))
                        }
                        </p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h3>Measures</h3>
                        <p>Height: {data?.height}</p>
                        <p>Weight: {data?.mass}</p>
                    </Col>


                    <Col>
                        <h3>{
                            (data?.gender === "Male") ? "His " : (data?.gender === "Female") ? "Her " : "It "}
                            colors
                        </h3>
                        <p>Skin: {data?.skin_color}</p>
                        <p>Eye: {data?.eye_color}</p>
                        <p>Hair: {data?.hair_color} </p>
                    </Col>
                </Row>

                <Row>
                    <h3>Appears in</h3>
                    {
                        data?.films.map(
                            (film: LinkModels) => (
                                <Col>
                                    <Link to={"/films/" + film?.id}>{
                                        film?.label
                                    }</Link>
                                </Col>
                            ))
                    }
                </Row>

                <Row>
                    <h3>Drive</h3>
                    <Col>
                        <p>
                            Starships: {
                            data?.starships.map(
                                starship => (
                                    <Col>
                                        <Link to={"/starship/" + starship?.id}>
                                            {starship?.label}
                                        </Link>
                                    </Col>
                                ))
                        }
                        </p>
                        <p>
                            Vehicles: {
                            data?.vehicles.map(vehicle => (
                                <Col>
                                    <Link to={"/vehicles/" + vehicle?.id}>
                                        {vehicle?.label}
                                    </Link>
                                </Col>
                            ))
                        }
                        </p>
                    </Col>
                </Row>

            </section>
        </Container>
    )
}
