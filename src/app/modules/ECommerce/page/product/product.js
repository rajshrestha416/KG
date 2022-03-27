import React, { useState, useEffect } from "react";
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
// import add product
import AddProduct from "./addProduct";
// core components
import request from "../../../../../helper/request";
import UpdateProduct from "./UpdateProduct.js";


export function ProductPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [products, retrieveProduct] = useState([]);
  const [deleteModalIsOpen, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [productId, setSelectProduct] = useState("");
  const [productdata, setProductData] = useState("");


  const styles = {
    padding: "20px"
  };

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
    setProductData({
      ...productdata,
      [e.target.name]: e.target.value
    });
  };

  const retrievedata = async () => {
    const result = await request.get('admin/product/web');
    if (result.success) {
      retrieveProduct(result.data);
    } else {
      toastForFail("Cannot retrieve data");
    }
  };

  useEffect(() => {
    retrievedata();
  }, [modalIsOpen, updateModal, deleteModalIsOpen]);

  const deleteProduct = () => {
    // axios.delete("http://localhost:3001/api/auth/" + productId)
    //   .then(
    //     (response) => {
    //       toastForSuccess("Delete Successfull");
    //       setDeleteModalClose();
    //     }
    //   )
    //   .catch(() => {
    //     toastForFail("Delete Unsuccessfull");
    //   });
  };

  var _rows = products.map(product => {
    // var color = product.color;
    // var size = product.size;
    var product_name = product.product_name;
    var description = product.description;
    var price = product.price;
    var sales_price = product.sales_price;
    // var variations =  variations;
    var variations = <table className="m-0 w-100">
      <thead>
        <tr className="border-0">
          <th className="pt-0">Color</th>
          <th className="pt-0">Size</th>
          <th className="pt-0">Quantity</th>
        </tr>
      </thead>
      <tbody>
        {product.variations.map(variation => {
          return variation.size.map(size => {
            return <tr className="border-0">
              <td className="pt-0" ><div className="w-5 h-5" style={{ width: "15px", height: "15px", borderRadius: "15px", backgroundColor: `${variation.color}` }}></div></td>
              <td className="pt-0" >{size.size}</td>
              <td className="pt-0" >{size.quantity} pcs</td>
            </tr>;
          });
        })
        }
      </tbody>
    </table>;

    // product.variations.map(variation => {
    //   return <div>
    //     <div className="d-flex">
    //       <p>{variation.color}</p>
    //       <div className="ml-4">
    //         {variation.size.map(size => {
    //           return <>
    //             <p>Size: {size.size}</p>
    //             <p>Quantity: {size.quantity}</p>
    //           </>;
    //         })}
    //       </div>
    //     </div>
    //   </div>;
    // });
    var action = <div className="justify-content-start text-start">
      <button className="action btn btn-primary fas fa-solid fa-book"
        onClick={() => {
          setSelectProduct(product._id);
          setUpdateModalOpen();
        }} ></button>
      <button className="ml-2 action btn btn-danger fa fa-solid fa-trash"
        onClick={
          () => {
            setSelectProduct(product._id);
            setDeleteModalOpen();
          }}></button>
    </div>;

    return {
      'product_name': product_name,
      'description': description,
      'price': price,
      "sales_price": sales_price,
      "variations": variations,
      "action": action
    };
  });

  const dataTable = {
    columns: [
      {
        label: "Product Name",
        field: "product_name",
        width: 200,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      // {
      //   label: "Size",
      //   field: "size",
      //   width: 100,
      // },
      // {
      //   label: "Color",
      //   field: "color",
      //   width: 200,
      // },
      {
        label: "Description",
        field: "description",
        width: 250,
      },
      {
        label: "Price",
        field: "price",
        width: 100,
      },
      {
        label: "Sales Price",
        field: "sales_price",
        width: 100,
      },
      {
        label: "Variations",
        field: "variations",
        width: 300,
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
        {console.log(productdata)}
        <Row>
          <div className="col">
            <Card className="shadow" >
              <CardHeader className="border-0 pb-5">
                <div className="row">
                  <h3 className="mb-0 col-lg-6">
                    <strong>Product</strong>
                  </h3>
                  <div className="col-lg-6 d-flex flex-row-reverse">
                    <button
                      className="btn btn-primary p-2"
                      type="button"
                      onClick={setModalIsOpenToTrue}
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </CardHeader>

              {/* Add product Model */}

              <div className="px-5">
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

            {/* Modal for add product */}
            <div className="AddProduct" style={
              {
                width: "500px"
              }
            } >
              <Modal
                size="xl" 
                show={modalIsOpen}
                // show={true}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={setModalIsOpenToFalse}
                style={{
                  overlay: {
                    justifyContent: "center",
                    display: "flex",
                    width: "500px"
                  },


                }}
              >
                <Modal.Header closeButton >
                  <div className="w-100">
                    <h1 className="text-center">Add Product</h1>
                  </div>
                </Modal.Header>
                <AddProduct closeAddProduct={setModalIsOpenToFalse} />

              </Modal>
            </div>

            {/* Modal for Update product */}
            <div className="updateProduct">
              <Modal
                show={updateModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={setUpdateModalClose}
                style={{
                  overlay: {
                    justifyContent: "center",
                    display: "flex",
                  },

                }}
              >
                <Modal.Header closeButton >
                  <div className="w-100">
                    <h1 className="text-center">Update product</h1>
                  </div>
                </Modal.Header>
                <UpdateProduct closeUpdateProductModal={setUpdateModalClose} id={productId} />
              </Modal>
            </div>

            {/* Delete product Modal */}
            <div className="deleteProduct">
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
                <Modal.Body ><strong>Are you sure you want to delete this product?</strong></Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-danger" onClick={
                    () => {
                      deleteProduct();
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

