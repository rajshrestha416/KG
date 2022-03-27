import React, {useState, useEffect } from "react";
import { MDBDataTableV5 } from 'mdbreact';
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
} from "reactstrap";
// import add subcategories
import AddSubcategories from "./addSubCategories1";
// core components
import axios from "axios";
import UpdateSubcategories from "./UpdateSubCategories1";

export function Subcategory1Page() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [subcategories, retrieveSubcategory1] = useState([]);
  const [deleteModalIsOpen, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [subcategory1Id, setSelectSubcategory1] = useState("");
  const [subcategory1data, setSubcategory1Data] = useState("");

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const setDeleteModalClose = () => {
    setDeleteModal(false);
  };
  const setDeleteModalOpen = () => {
    setDeleteModal(true);
  };

  const setUpdateModalClose = () => {
    setUpdateModal(false);
  };
  const setUpdateModalOpen = () => {
    setUpdateModal(true);
  };

  const toastForSuccess = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const toastForFail = (msg) => {
    toast.error(msg, {
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

  useEffect(() => {
    axios.get('http://localhost:3001/api/auth/all')
      .then(response => {
        retrieveSubcategory1(response.data.subcategory1);
      })
      .catch(err => {
        toastForFail("Cannot retrieve subcategory1");
      });
  }, []);

  const deleteSubcategories = () => {
    axios.delete("http://localhost:3001/api/auth/" + subcategory1Id)
      .then(
        (response) => {
          toastForSuccess("Delete Successfull");
          setDeleteModalClose();
        }
      )
      .catch(() => {
        toastForFail("Delete Unsuccessfull");
      });
  };

  var _rows = subcategories.map(subcategory1 => {
    var title = subcategory1.title;
    var image = subcategory1.image;
    var action = <div className="justify-content-start text-start">
        <button className="action btn btn-primary fas fa-solid fa-book"
          onClick={() => {
            setSelectSubcategory1(subcategory1._id);
            setUpdateModalOpen();
          }} ></button>
        <button className="action btn btn-danger fa fa-solid fa-trash"
          onClick={
            () => {
              setSelectSubcategory1(subcategory1._id);
              setDeleteModalOpen();
            }}></button>
      </div>;

    return {
      'title': title,
      'image': image,
      "action": action
    };
  });

  const dataTable = {
    columns: [
      {
        label: "Title",
        field: "title",
        width: 200,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Image",
        field: "age",
        width: 100,
      },
      {
        label: "Child Of",
        field: "child_of",
        width: 100,
      },
      {
        label: "Action",
        field: "action",
        width: 150,
      },
    ],
    rows: _rows
  };

  return (
    <>
      {/* Page content */}

      <div className="mt--7" style={{width:''}} fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="row">
                  <h3 className="mb-0 col-lg-6">
                    <strong>Sub Categories II Details</strong>
                  </h3>
                  <div className="col-lg-6 d-flex flex-row-reverse">
                    <button
                      className="btn btn-primary p-2"
                      type="button"
                      onClick={setModalIsOpenToTrue}
                    >
                      Add Sub Category 2
                    </button>
                  </div>
                </div>
              </CardHeader>

              {/* Add Categories Model */}

              <div style={{ padding: "20px" }}>
                <MDBDataTableV5
                  className="detailsTable"
                  hover
                  scrollX
                  entriesOptions={[5, 10, 15]}
                  entries={5}
                  pagesAmount={4}
                  data={dataTable}
                  searchTop
                />
              </div>
            </Card>
            {/* Modal for add Categories */}
            <div className="AddSubcategories">
              <Modal
              size="xl"
                show={modalIsOpen}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={setModalIsOpenToFalse}
                style={{
                  overlay: {
                    justifyContent: "center",
                    display: "flex",
                  }
                }}
              >
                <Modal.Header closeButton >
                  <div className="w-100">
                    <h1 className="text-center">Add Sub Category 1</h1>
                  </div>
                </Modal.Header>
                 <AddSubcategories closeAddSubcategory1={setModalIsOpenToFalse} />
              </Modal>
            </div>

            {/* Modal for Update Categories */}
            <div className="updateSubcategories">
              <Modal
                show={updateModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={setUpdateModalClose}
                style={{
                  overlay: {
                    justifyContent: "center",
                    display: "flex",
                  }
                }}
              >
                <Modal.Header closeButton >
                  <div className="w-100">
                    <h1 className="text-center">Update Sub Categories</h1>
                  </div>
                </Modal.Header>
                <UpdateSubcategories closeUpdateSubcategory1Modal={setUpdateModalClose} id={subcategory1Id} />
              </Modal>
            </div>

            {/* Delete Categories Modal */}
            <div className="deleteVehicle">
              <Modal
                show={deleteModalIsOpen}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={setDeleteModalClose}
                style={{
                  overlay: {
                    justifyContent: "center",
                    display: "flex",
                  }
                }}
              >
                <Modal.Header closeButton >
                  <div className="w-100">
                    <h1 className="text-center">Delete</h1>
                  </div>
                </Modal.Header>
                <Modal.Body ><strong>Are you sure you want to delete this subcategory 2?</strong></Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-danger" onClick={
                    () => {
                      deleteSubcategories();
                    }} >
                    Delete
                  </button>
                  <button className="btn btn-secondary" onClick={setDeleteModalClose}>
                    Close
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </Row>
      </div>
      <ToastContainer />
    </>
  );
}

