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

function UpdateProduct({ closeUpdateProductModal, id }) {

    // alert(id)

    const [productdata, setProductData] = useState({
        "fullname": "",
        "age": "",
        "address": "",
        "email": "",
        "contact": "",
        "product": "",
        "emContact": ""
    });

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/product")
            .then(response => {
                setProducts(response.data.products);
            })
            .catch(err => {
            });
    }, [products]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/auth/" + id)
            .then(response => {
                if (response.data.success) {
                    setProductData(response.data.product);
                }
            })
            .catch(err => {
                UpdateFailed();
            });
    }, [id]);

    const updateProduct = () => {
        axios.put("http://localhost:3001/api/auth/" + id, //Vehicledata 
        )
            .then(response => {
                if (response.data.success) {
                    closeUpdateProductModal();
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
        toast.success("Successfully updated product", {
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
        toast.error("Failed to update product", {
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
        setProductData({
            ...productdata,
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
                                    Product information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-product_name"
                                                    >
                                                        Product Name
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-product_name"
                                                        placeholder="product_name"
                                                        name="product_name"
                                                        //value={userdata.fullname}
                                                        type="text"
                                                        onChange={changeHandler}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
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
                                                        placeholder="text"
                                                        type="text"
                                                        //value={Vehicledata.email}
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
                                                        htmlFor="input-price"
                                                    >
                                                        Price
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-price"
                                                        name="price"
                                                        //value={Vehicledata.age}
                                                        placeholder="price"
                                                        type="number"
                                                        onChange={changeHandler}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                  
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-sales_price"
                                                    >
                                                        Sales Price
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-sales_price"
                                                        name="sales_price"
                                                        //value={Vehicledata.address}
                                                        placeholder="sales_price"
                                                        type="number"
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
                                                        htmlFor="input-color"
                                                    >
                                                        Color
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-color"
                                                        name="color"
                                                        //value={Vehicledata.contact}
                                                        placeholder="color"
                                                        type="text"
                                                        onChange={changeHandler}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-size"
                                                    >
                                                        Size
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-size"
                                                        placeholder="size"
                                                        type="text"
                                                        //value={Vehicledata.emContact}
                                                        name="size"
                                                        onChange={changeHandler}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-variations"
                                                    >
                                                        Variations
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-variations"
                                                        placeholder="variations"
                                                        type="text"
                                                        //value={Vehicledata.emContact}
                                                        name="variations"
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
                                            onClick={updateProduct}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            className="btn btn-danger"
                                            onClick={closeUpdateProductModal}
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
export default UpdateProduct;
