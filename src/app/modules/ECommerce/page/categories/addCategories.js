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

function AddCategory({ closeAddCategory }) { 
  const [categorydata, setCategoryData] = useState({
    "title": "",
    "image": ""
  });

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/categories")
      .then(response => {
        setVehicles(response.data.vehicles);
      })
      .catch(err => {
      });
  }, []);

  const addCategory = () => {
    axios.post("http://localhost:3001/api/auth/register", categorydata)
      .then(response => {
        if (response.data.success) {
          addSuccess();
          closeAddCategory();
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
    toast.success("Category Added Successfully", {
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
    toast.error("Failed to Add", {
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
      <div style={{  padding:"20px" }}>
        <div style={{ overflowY: "initial", width:"1000px !important" }}>
          {/* <div>
            <h1 className="text-center">Add Category</h1>
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
                            type="file"
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
                      onClick={addCategory}
                    >
                      Add
                    </Button>
                    <Button
                      className="btn btn-danger"
                      onClick={closeAddCategory}
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
export default AddCategory;
