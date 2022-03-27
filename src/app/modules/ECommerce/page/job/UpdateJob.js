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

function UpdateJob({ closeUpdateJobModal, id }) {

    // alert(id)

    const [jobdata, setJobData] = useState({
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
                    setJobData(response.data.job);
                }
            })
            .catch(err => {
                UpdateFailed();
            });
    }, [id]);

    const updateJob = () => {
        axios.put("http://localhost:3001/api/auth/" + id, jobdata)
            .then(response => {
                if (response.data.success) {
                    closeUpdateJobModal();
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
        toast.success("Successfully updated job", {
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
        toast.error("Failed to update job", {
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
        setJobData({
            ...jobdata,
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
                                    Job information
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
                                                        value={jobdata.fullname}
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
                                                        value={jobdata.email}
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
                                                        value={jobdata.age}
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
                                                        value={jobdata.address}
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
                                                        value={jobdata.contact}
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
                                                        value={jobdata.emContact}
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
                                            onClick={updateJob}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            className="btn btn-danger"
                                            onClick={closeUpdateJobModal}
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
export default UpdateJob;
