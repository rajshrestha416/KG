import React, {useState, useEffect } from "react";
import { MDBDataTableV5 } from 'mdbreact';
import moment from 'moment';
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
// import add job
import AddJob from "./addJob";
// core components
import axios from "axios";
import UpdateJob from "./UpdateJob.js";

export function JobPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [jobs, retrieveJob] = useState([]);
  const [deleteModalIsOpen, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [jobId, setSelectJob] = useState("");
  const [jobdata, setJobData] = useState("");

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
    setJobData({
      ...jobdata,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    axios.get('http://localhost:3001/api/auth/all')
      .then(response => {
        retrieveJob(response.data.job);
      })
      .catch(err => {
        toastForFail("Cannot retrieve job");
      });
  }, []);

  const deleteJob = () => {
    axios.delete("http://localhost:3001/api/auth/" + jobId)
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

  var _rows = jobs.map(job => {
    var name = job.fullname;
    var age = job.age;
    var address = job.address;
    var contact = job.contact;
    var emContact = job.emContact;
    var email = job.email;
    var date = moment(job.createdAt).format('DD/MM/YYYY');
    var createdAt = date;
    var action = <div className="justify-content-start text-start">
        <button className="action btn btn-primary fas fa-solid fa-book"
          onClick={() => {
            setSelectJob(job._id);
            setUpdateModalOpen();
          }} ></button>
        <button className="action btn btn-danger fa fa-solid fa-trash"
          onClick={
            () => {
              setSelectJob(job._id);
              setDeleteModalOpen();
            }}></button>
      </div>;

    return {
      'name': name,
      'age': age,
      'address': address,
      'contact': contact,
      "emcontact": emContact,
      "email": email,
      "date": createdAt,
      "action": action
    };
  });

  const dataTable = {
    columns: [
      {
        label: "Name",
        field: "name",
        width: 200,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Age",
        field: "age",
        width: 100,
      },
      {
        label: "Address",
        field: "address",
        width: 200,
      },
      {
        label: "Email",
        field: "email",
        width: 250,
      },
      {
        label: "Contact",
        field: "contact",
        sort: "disabled",
        width: 200,
      },
      {
        label: "EmContact",
        field: "emcontact",
        width: 200,
      },
      {
        label: "Issued date",
        field: "date",
        width: 150,
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

      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="row">
                  <h3 className="mb-0 col-lg-6">
                    <strong>Job Details</strong>
                  </h3>
                  <div className="col-lg-6 d-flex flex-row-reverse">
                    <button
                      className="btn btn-primary p-2"
                      type="button"
                      onClick={setModalIsOpenToTrue}
                    >
                      Add Job
                    </button>
                  </div>
                </div>
              </CardHeader>

              {/* Add Job Model */}

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
            {/* Modal for add Job */}
            <div className="AddJob">
              <Modal
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
                    <h1 className="text-center">Add Job</h1>
                  </div>
                </Modal.Header>
                 <AddJob closeAddJob={setModalIsOpenToFalse} />
              </Modal>
            </div>

            {/* Modal for Update Job */}
            <div className="updateJob">
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
                    <h1 className="text-center">Update Job</h1>
                  </div>
                </Modal.Header>
                <UpdateJob closeUpdateJobModal={setUpdateModalClose} id={jobId} />
              </Modal>
            </div>

            {/* Delete Job Modal */}
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
                <Modal.Body ><strong>Are you sure you want to delete this job?</strong></Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-danger" onClick={
                    () => {
                      deleteJob();
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
      </Container>
      <ToastContainer />
    </>
  );
}

