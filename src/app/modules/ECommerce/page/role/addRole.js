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
import request from "../../../../../helper/request";
import Select from 'react-select'

function AddRole({ closeAddRole }) {
  const [roledata, setRoleData] = useState({
    "role_title": "",
    "role_type": "",
    "description": ""
  });

  const [roles, setRoles] = useState([]);

  const addRole = async() => {
    const result = await request.post(`/admin/roles`, roledata);
    if (result.success) {
      addSuccess();
      closeAddRole();
    }
    else {
      addFailed();
    }
  };

  const addSuccess = () => {
    toast.success("Role Added Successfully", {
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
    toast.error("Failed to Add Role", {
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
    setRoleData({
      ...roledata,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div style={{ display: "block" }}>
        <div style={{ overflowY: "initial" }}>
          {/* <div>
            <h1 className="text-center">Add Role</h1>
          </div> */}
          <div
            className="pl-lg-4"
            style={{
              marginTop: "20px",
              overflowY: "auto",
              overflowX: "hidden",
              height: "fit-content",
            }}
          >
            <Row>
              <Col lg="12">
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Role information
                  </h6>
                  <div className="p-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-role_title"
                          >
                            Role Title
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-role_title"
                            placeholder="role_title"
                            name="role_title"
                            type="text"
                            onChange={changeHandler}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="status"
                          >
                            Role Type
                          </label>
                          <select className="form-control col-sm-9" name="role_type" onChange={changeHandler}>
                            <option value="">
                              Select Role Type....
                            </option>
                            {["CMS", "ECOMMERCE"].map(data => {
                              return <option value={data}>
                                {data}
                              </option>;
                            })}
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-description"
                          >
                            Description
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-description"
                            name="description"
                            placeholder="description"
                            type="textarea"
                            onChange={changeHandler}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <div className="d-flex justify-content-center">
                    <Button
                      className="btn btn-success"
                      // onClick={setModalIsOpenToFalse}
                      style={{ margin: "10px" }}
                      onClick={addRole}
                    >
                      Add
                    </Button>
                    <Button
                      className="btn btn-danger"
                      onClick={closeAddRole}
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
export default AddRole;
