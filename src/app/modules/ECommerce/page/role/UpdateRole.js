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
import request from "../../../../../helper/request";

function UpdateRole({ closeUpdateRoleModal, id }) {

    console.log("id", id);

    const [roledata, setRoleData] = useState({
        "role_title": "",
        "role_type": "",
        "description": ""
    });

    // const [roles, setRoles] = useState([]);

    // useEffect(() => {
    //     axios.get("http://localhost:3001/api/role")
    //         .then(response => {
    //             setRoles(response.data.vehicles);
    //         })
    //         .catch(err => {
    //         });
    // }, [roles]);

    const selectedRole = async (id) => {
        console.log(id)
        const result = await request.get(`/admin/roles/${id}`);
        console.log(result)
        if (result.success) {
            setRoleData(result.data);
        }
        else {
            UpdateFailed();
        }
    };

    useEffect(() => {

        selectedRole(id);
        // let option = {
        //     headers: {
        //         "authorization": `Bearer ${process.env.REACT_APP_TOKEN}`
        //     }
        // };
        // needle.get(
        //     `${process.env.REACT_APP_BASE_URL}/admin/roles/${id}`,
        //     option,
        //     (err, response) => {
        //         if (err) {
        //             UpdateFailed();
        //         }
        //         console.log(response.body);
        //         if (response.body.success) {
        //             setRoleData(response.body.data);
        //         } else {
        //             UpdateFailed();
        //         }
        //     });
    }, [id]);

    const updateRole = async () => {
        const result = await request.put(`/admin/roles/${id}`, roledata);
        console.log("result",result)
        if (result) {
            closeUpdateRoleModal();
            UpdateSuccess();
        }
        else {
            UpdateFailed();
        }
        // let option = {
        //     headers: {
        //         "authorization": `Bearer ${process.env.REACT_APP_TOKEN}`
        //     }
        // };
        // needle.put(
        //     `${process.env.REACT_APP_BASE_URL}/admin/roles/${id}`,
        //     roledata,
        //     option,
        //     (err, response) => {
        //         if (err) {
        //             UpdateFailed();
        //         }
        //         if (response.body.success) {
        //             closeUpdateRoleModal();
        //             UpdateSuccess();
        //         }
        //         else {
        //             UpdateFailed();
        //         }
        //     }
        // );
    };

    const UpdateSuccess = () => {
        toast.success("Successfully updated Role", {
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
        toast.error("Failed to update Role", {
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
                                                        value={roledata.role_title}
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
                                                    {console.log(roledata)}
                                                    <select className="form-control col-sm-9" name="role_type" onChange={changeHandler}
                                                        value={roledata.role_type}
                                                    >
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
                                                        value={roledata.description}
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
                                            onClick={updateRole}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            className="btn btn-danger"
                                            onClick={closeUpdateRoleModal}
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
export default UpdateRole;
