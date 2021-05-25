import React, {useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import {FetchSingleApi} from "../../hooks/FetchSingleApi";
import {CardColumns, Card, Col, Container, Row, Spinner} from "react-bootstrap";
import {formatDistance, formatRelative, subDays} from 'date-fns';
import {LinkModels} from "../../models/Link.models";
import {getRelativeISODate} from "../../constant/Dates";

const FilmsSingle: React.FC = (): JSX.Element => {

    let {id} = useParams<{ id: string | undefined }>();
    const {sendSingleRequest, data, isLoading} = FetchSingleApi();

    useEffect(() => {

        if (id) {
            sendSingleRequest("http://localhost:7000/api/v1/films/" + id, "GET", "film")
        }

    }, [sendSingleRequest, id]);


    return (
        <Container>
            {
                isLoading && (
                    <React.Fragment>
                        <Spinner animation={"border"} role="status"/>
                        <p>Loading...</p>
                    </React.Fragment>
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
                                <h1 className="hyper-title">{data?.title}</h1>
                                <small>
                                    Created at: {getRelativeISODate(data?.created)} | Edited at: {getRelativeISODate(data?.edited)}
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
                                <p>
                                    {
                                        formatDistance(
                                            subDays(
                                                new Date(
                                                    data?.release_date.split("-")[0],
                                                    data?.release_date.split("-")[1],
                                                    data?.release_date.split("-")[2]
                                                ), 3),
                                            new Date(),
                                        )
                                    }
                                    <br/>
                                    <i> {
                                        formatRelative(
                                            subDays(
                                                new Date(
                                                    data?.release_date.split("-")[0],
                                                    data?.release_date.split("-")[1],
                                                    data?.release_date.split("-")[2]
                                                ), 3),
                                            new Date(),
                                        )
                                    }</i>
                                </p>
                            </Col>
                        </Row>
                        <CardColumns>

                            <Card className="bg-dark">
                                <Card.Body>
                                    <Card.Title>
                                        <h2>Planets</h2>
                                    </Card.Title>
                                    <ul className="list-group">
                                        {
                                            data?.planets.map((planet: LinkModels) => (
                                                <Link to={"/planet/" + planet?.id}>
                                                    <li key={planet?.id} className="list-group-item bg-dark">
                                                        {planet?.label}
                                                    </li>
                                                </Link>
                                            ))
                                        }
                                    </ul>
                                </Card.Body>
                            </Card>

                            <Card className="bg-dark">
                                <Card.Body>
                                    <Card.Title>
                                        <h2>Species</h2>
                                    </Card.Title>
                                    <ul className="list-group">
                                        {
                                            data?.species.map( (specie: LinkModels) => (
                                                <Link to={"/species/" + specie?.id}>
                                                    <li key={specie?.id} className="list-group-item bg-dark">
                                                        {specie?.label}
                                                    </li>
                                                </Link>
                                            ))
                                        }
                                    </ul>
                                </Card.Body>
                            </Card>

                            <Card className="bg-dark">
                                <Card.Body>
                                    <Card.Title>
                                        <h2>Characters</h2>
                                    </Card.Title>
                                    <ul className="list-group">
                                        {
                                            data?.characters.map((planet: LinkModels) => (
                                                <Link to={"/people/" + planet?.id}>
                                                    <li key={planet?.id} className="list-group-item bg-dark">
                                                        {planet?.label}
                                                    </li>
                                                </Link>
                                            ))
                                        }
                                    </ul>
                                </Card.Body>
                            </Card>

                            <Card className="bg-dark">
                                <Card.Body>
                                    <Card.Title>
                                        <h2>Starships</h2>
                                    </Card.Title>
                                    <ul className="list-group">
                                        {
                                            data?.starships.map( (starship: LinkModels) => (
                                                <Link to={"/starship/" + starship?.id}>
                                                    <li key={starship?.id} className="list-group-item bg-dark">
                                                        { starship?.label }
                                                    </li>
                                                </Link>
                                            ))
                                        }
                                    </ul>
                                </Card.Body>
                            </Card>
                            <Card className="bg-dark">
                                <Card.Body>
                                    <Card.Title>
                                        <h2>Vehicles</h2>
                                    </Card.Title>
                                    <ul className="list-group">
                                        {
                                            data?.vehicles.map( (vehicle: LinkModels) => (
                                                <Link to={"/vehicle/" + vehicle?.id}>
                                                    <li key={vehicle?.id} className="list-group-item bg-dark">
                                                        { vehicle?.label }
                                                    </li>
                                                </Link>
                                            ))
                                        }
                                    </ul>
                                </Card.Body>
                            </Card>
                        </CardColumns>
                    </React.Fragment>
                )
            }
        </Container>
    )
}

export default FilmsSingle;
