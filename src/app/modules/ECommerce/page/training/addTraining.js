import React, { useEffect, useState } from "react";
import {
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function AddTraining({ closeAddTraining }) { 
  const [trainingdata, setTrainingData] = useState({
    "fullname": "",
    "age": "",
    "address": "",
    "email": "",
    "contact": "",
    "vehicle": "",
    "emContact": "",
    "password": "",
    "cpassword": ""
  });

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/vehicle")
      .then(response => {
        setVehicles(response.data.vehicles);
      })
      .catch(err => {
      });
  }, []);

  const addTraining = () => {
    axios.post("http://localhost:3001/api/auth/register", trainingdata)
      .then(response => {
        if (response.data.success) {
          addSuccess();
          closeAddTraining();
        }
        else {
          addFailed();
        }

      })
      .catch(err => {
        addFailed();
      });
  };

  const addSuccess = () => {
    toast.success("Training Added Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const addFailed = () => {
    toast.error("Failed to Add training", {
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
          {/* <div>
            <h1 className="text-center">Add training</h1>
          </div> */}
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
                            name="emContact"
                            onChange={changeHandler}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">
                    Password Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-password"
                          >
                            Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-password"
                            placeholder="password"
                            name="password"
                            type="password"
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
                            Confirm Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-confirmPassword"
                            placeholder="confirmPassword"
                            type="password"
                            name="cpassword"
                            onChange={changeHandler}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="w-100">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="vehicle"
                      >
                        Vehicle:
                      </label>
                      <select className="form-control col-sm-9" name="vehicle" onChange={changeHandler}>
                        <option value="">
                          Select Vehicle ....
                        </option>
                        {vehicles.map(data => {
                          return <option value={data._id}>
                            {data.vehicle_number}
                          </option>;
                        })}
                      </select>
                    </FormGroup>
                  </div>
                  <div className="d-flex justify-content-center">
                    <Button
                      className="btn btn-success"
                      // onClick={setModalIsOpenToFalse}
                      style={{ margin: "10px" }}
                      onClick={addTraining}
                    >
                      Add
                    </Button>
                    <Button
                      className="btn btn-danger"
                      onClick={closeAddTraining}
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
export default AddTraining;
