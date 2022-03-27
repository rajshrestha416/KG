import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from 'mdbreact';
import moment from 'moment';
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import request from "../../../../../helper/request";

import needle from 'needle';
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
} from "reactstrap";
// import add Role
import AddRole from "./addRole";
// core components
// import axios from "axios";
import UpdateRole from "./UpdateRole.js";

export function RolePage() {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [roles, retrieveRole] = useState([]);
  const [deleteModalIsOpen, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [roleId, setSelectRole] = useState("");
  const [roledata, setRoleData] = useState("");

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
    setRoleData({
      ...roledata,
      [e.target.name]: e.target.value
    });
  };

  const getRoles = async () => {
    const result = await request.get('admin/roles');
    if (result.success) {
      retrieveRole(result.data);
    } else {
      toastForFail("Cannot retrieve data");
    }
  };

  useEffect(() => {
    getRoles();
  }, [modalIsOpen, updateModal, deleteModalIsOpen]);

  const deleteRole = async () => {
    const result = await request.del(`/admin/roles/${roleId}`);
    if (result.success) {
      toastForSuccess("Successfully deleted!!");
      setDeleteModalClose()
    } else {
      toastForFail("Failed to deleted");
    }
  };

  var _rows = roles.map(role => {
    var role_title = role.role_title;
    var role_type = role.role_type;
    var description = role.description;
    var is_active = (role.is_deleted ? "Deleted" : role.is_active ? "Active" : "Inactive");
    var added_by = role.added_by !== undefined ? role.added_by.name : null;
    var date = moment(role.createdAt).format('DD/MM/YYYY');
    var createdAt = date;
    var action = <div className="justify-content-start text-start">
      <button className="mr-2 action btn btn-primary fas fa-solid fa-book"
        onClick={() => {
          setSelectRole(role._id);
          setUpdateModalOpen();
        }} ></button>
      <button className="action btn btn-danger fa fa-solid fa-trash"
        onClick={
          () => {
            setSelectRole(role._id);
            setDeleteModalOpen();
          }}></button>
    </div>;

    return {
      'role_title': role_title,
      'role_type': role_type,
      'description': description,
      'is_active': is_active,
      "added_by": added_by,
      "date": createdAt,
      "action": action
    };
  });

  const dataTable = {
    columns: [
      {
        label: "Role Title",
        field: "role_title",
        width: 200,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Role Type",
        field: "role_type",
        width: 100,
      },
      {
        label: "Description",
        field: "description",
        width: 200,
      },
      {
        label: "Status",
        field: "is_active",
        width: 250,
      },
      {
        label: "Added By",
        field: "added_by",
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
                    <strong>Role Details</strong>
                  </h3>
                  <div className="col-lg-6 d-flex flex-row-reverse">
                    <button
                      className="btn btn-primary p-2"
                      type="button"
                      onClick={setModalIsOpenToTrue}
                    >
                      Add Role
                    </button>
                  </div>
                </div>
              </CardHeader>

              {/* Add Role Model */}

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
            {/* Modal for add Role */}
            <div className="AddRole">
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
                    <h1 className="text-center">Add Role</h1>
                  </div>
                </Modal.Header>
                <AddRole closeAddRole={setModalIsOpenToFalse} />
              </Modal>
            </div>

            {/* Modal for Update Role */}
            <div className="updateRole">
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
                    <h1 className="text-center">Update Role</h1>
                  </div>
                </Modal.Header>
                <UpdateRole closeUpdateRoleModal={setUpdateModalClose} id={roleId} />
              </Modal>
            </div>

            {/* Delete Role Modal */}
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
                <Modal.Body ><strong>Are you sure you want to delete this Role?</strong></Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-danger" onClick={
                    () => {
                      deleteRole();
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

