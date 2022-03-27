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

function UpdateSubcategory1({ closeUpdateSubcategory1Modal, id }) {

    // alert(id)

    const [subcategory1data, setSubcategory1Data] = useState({
        "title": "",
        "image": "",
        "child_of":""
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/subcategory1")
            .then(response => {
                setCategories(response.data.categories);
            })
            .catch(err => {
            });
    }, [categories]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/auth/" + id)
            .then(response => {
                if (response.data.success) {
                    setSubcategory1Data(response.data.subcategory1);
                }
            })
            .catch(err => {
                UpdateFailed();
            });
    }, [id]);

    const updateSubcategory1 = () => {
        axios.put("http://localhost:3001/api/auth/" + id, subcategory1data)
            .then(response => {
                if (response.data.success) {
                    closeUpdateSubcategory1Modal();
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
        toast.success("Successfully updated Subcategory1", {
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
        toast.error("Failed to update Subcategory1", {
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
        setSubcategory1Data({
            ...subcategory1data,
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
                                        Sub Category 2 information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-title"
                                                    >
                                                        Title
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-title"
                                                        placeholder="title"
                                                        name="title"
                                                        value={subcategory1data.title}
                                                        type="text"
                                                        onChange={changeHandler}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-image"
                                                    >
                                                        Image
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-image"
                                                        name="image"
                                                        placeholder="image"
                                                        type="image"
                                                        value={subcategory1data.image}
                                                        onChange={changeHandler}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-child_of"
                                                    >
                                                        Child Of
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-child_of"
                                                        name="child_of"
                                                        placeholder="child_of"
                                                        type="text"
                                                        value={subcategory1data.child_of}
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
                                            onClick={updateSubcategory1}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            className="btn btn-danger"
                                            onClick={closeUpdateSubcategory1Modal}
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
export default UpdateSubcategory1;
