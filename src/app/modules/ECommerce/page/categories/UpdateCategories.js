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

function UpdateCategory({ closeUpdateCategoryModal, id }) {

    // alert(id)

    const [categorydata, setCategoryData] = useState({
        "title": "",
        "image": ""
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/category")
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
                    setCategoryData(response.data.category);
                }
            })
            .catch(err => {
                UpdateFailed();
            });
    }, [id]);

    const updateCategory = () => {
        axios.put("http://localhost:3001/api/auth/" + id, categorydata)
            .then(response => {
                if (response.data.success) {
                    closeUpdateCategoryModal();
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
        toast.success("Successfully updated category", {
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
        toast.error("Failed to update category", {
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
        setCategoryData({
            ...categorydata,
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
                                        Category information
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
                                                        value={categorydata.title}
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
                                                        value={categorydata.image}
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
                                            onClick={updateCategory}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            className="btn btn-danger"
                                            onClick={closeUpdateCategoryModal}
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
export default UpdateCategory;
