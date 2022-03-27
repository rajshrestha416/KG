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

function UpdateTraining({ closeUpdateTrainingModal, id }) {

    // alert(id)

    const [trainingdata, setTrainingData] = useState({
        "fullname": "",
        "age": "",
        "address": "",
        "email": "",
        "contact": "",
        "vehicle": "",
        "emContact": ""
    });

    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/vehicle")
            .then(response => {
                setVehicles(response.data.vehicles);
            })
            .catch(err => {
            });
    }, [vehicles]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/auth/" + id)
            .then(response => {
                if (response.data.success) {
                    setTrainingData(response.data.training);
                }
            })
            .catch(err => {
                UpdateFailed();
            });
    }, [id]);

    const updateTraining = () => {
        axios.put("http://localhost:3001/api/auth/" + id, trainingdata)
            .then(response => {
                if (response.data.success) {
                    closeUpdateTrainingModal();
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
        toast.success("Successfully updated training", {
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
        toast.error("Failed to update training", {
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
        setTrainingData({
            ...trainingdata,
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
                                    Training information
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
                                                        value={trainingdata.fullname}
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
                                                        value={trainingdata.email}
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
                                                        value={trainingdata.age}
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
                                                        value={trainingdata.address}
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
                                                        value={trainingdata.contact}
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
                                                        value={trainingdata.emContact}
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
                                            onClick={updateTraining}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            className="btn btn-danger"
                                            onClick={closeUpdateTrainingModal}
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
export default UpdateTraining;
