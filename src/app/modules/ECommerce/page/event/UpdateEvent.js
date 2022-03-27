import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Button,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";
import axios from "axios";

function UpdateEvent({ closeUpdateEventModal, id }) {

    // alert(id)

    const [eventdata, setEventData] = useState({
        "fullname": "",
        "age": "",
        "address": "",
        "email": "",
        "contact": "",
        "vehicle": "",
        "emContact": ""
    });

    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/events")
            .then(response => {
                setEvents(response.data.evnets);
            })
            .catch(err => {
            });
    }, [events]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/auth/" + id)
            .then(response => {
                if (response.data.success) {
                    setEventData(response.data.event);
                }
            })
            .catch(err => {
                UpdateFailed();
            });
    }, [id]);

    const updateEvent = () => {
        axios.put("http://localhost:3001/api/auth/" + id, eventdata)
            .then(response => {
                if (response.data.success) {
                    closeUpdateEventModal();
                    UpdateSuccess();
                }
                else {
                    UpdateFailed();
                }
            })
            .catch(err => {
                UpdateFailed();
            });
    };

    const UpdateSuccess = () => {
        toast.success("Successfully updated Event", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const UpdateFailed = () => {
        toast.error("Failed to update Event", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const changeHandler = (e) => {
        setEventData({
            ...eventdata,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <div style={{ display: "block" }}>
                <div style={{ overflowY: "initial" }}>
                    <div
                        className="pl-lg-4"
                        style={{
                            marginTop: "20px",
                            overflowY: "auto",
                            overflowX: "hidden",
                            height: "80vh",
                        }}
                    >
                        <Row>
                            <Col lg="12">
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">
                                    Event information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-fullName"
                                                    >
                                                        Full Name
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-fullName"
                                                        placeholder="fullName"
                                                        name="fullname"
                                                        value={eventdata.fullname}
                                                        type="text"
                                                        onChange={changeHandler}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-email"
                                                    >
                                                        Email address
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-email"
                                                        name="email"
                                                        placeholder="admin@example.com"
                                                        type="email"
                                                        value={eventdata.email}
                                                        onChange={changeHandler}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-age"
                                                    >
                                                        Age
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-age"
                                                        name="age"
                                                        value={eventdata.age}
                                                        placeholder="Age"
                                                        type="number"
                                                        onChange={changeHandler}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4" />
                                    {/* Address */}
                                    <h6 className="heading-small text-muted mb-4">
                                        Contact information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-address"
                                                    >
                                                        Address
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-address"
                                                        name="address"
                                                        value={eventdata.address}
                                                        placeholder="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                                        type="text"
                                                        onChange={changeHandler}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-conatctNumber"
                                                    >
                                                        Contact Number
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-contactNumber"
                                                        name="contact"
                                                        value={eventdata.contact}
                                                        placeholder="contactNumber"
                                                        type="number"
                                                        onChange={changeHandler}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-emergencyContact"
                                                    >
                                                        Emergency Contact
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-emergencyContact"
                                                        placeholder="emergencyContact"
                                                        type="number"
                                                        value={eventdata.emContact}
                                                        name="emContact"
                                                        onChange={changeHandler}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="d-flex justify-content-center">
                                        <Button
                                            className="btn btn-success"
                                            style={{ margin: "10px" }}
                                            onClick={updateEvent}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            className="btn btn-danger"
                                            onClick={closeUpdateEventModal}
                                            style={{ margin: "10px" }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    );
}
export default UpdateEvent;
