import React, { useEffect, useState } from "react";
import {
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table,
} from "reactstrap";
import ConfigEditor from '../../../../../config/froalaConfig';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from 'react-select';
import request from '../../../../../helper/request';

function AddProduct({ closeAddProduct }) {

  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [variations, setVariation] = useState([]);
  const [isAdded, setIsAdded] = useState(true);
  // const [isAdded, setIsAdded] = useState(false)
  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState([]);

  const [productdata, setProductData] = useState({
    "color": "",
    "size": "",
    "price": "",
    "product_name": "",
    "description": "",
    "price": "",
    "sales_price": "",
    "variations": [],
    "brand": "",
    "category": ""
  });

  const handelColor = (e, c) => {
    setIsAdded(true);
    e.preventDefault();
    let checkSize = color.filter(e => e === c);
    if (checkSize.length <= 0) setColor(color.concat(c));
    setProductData({
      ...productdata,
      [e.target.name]: ""
    });
    // setIsAdded(true)
  };

  const retrieveBrand = async () => {
    const result = await request.get('/admin/brand/all');
    console.log("result", result);
    if (result.success) {
      let brands = result.data.map(b => {
        return {
          value: b._id,
          label: b.title
        };
      });
      setBrands(brands);
    } else {
      console.log("Failed to retrieve brand");
    }
  };

  const retrieveCategory = async () => {
    const result = await request.get('/admin/category');
    console.log("result", result);
    if (result.success) {}
      // let categories = result.data.map(c => {
      //   if(c.child.length===0) return {
      //     label: c.title,
      //     value: ""
      //   }
      //   return {
      //     label: <div className="d-flex justify-content-between"><span>sub-group 1</span><span>group 1</span></div>,
      //     options: [
      //       {
      //         label: "cat 1",
      //         value: 1
      //       },
      //       {
      //         label: "cat 2",
      //         value: 2
      //       }
      //     ]
      //   };
      // });
      // setBrands(brands);
    // } else {
    //   console.log("Failed to retrieve brand");
    // }
  };
  useEffect(() => {
    retrieveBrand();
    retrieveCategory();
  }, []);

  // const brandOption = [
  //   { value: "one", label: "brand1" },
  //   { value: "two", label: "brand2" },
  //   { value: "three", label: "brand3" },
  //   { value: "four", label: "brand4" }
  // ];   
  

  const options = [
    {
      label: <div className="d-flex justify-content-between"><span>sub-group 1</span><span>group 1</span></div>,
      options: [
        {
          label: "cat 1",
          value: 1
        },
        {
          label: "cat 2",
          value: 2
        }
      ]
    },
    {
      label: <div className="d-flex justify-content-between"><span>sub-group 2</span><span>group 1</span></div>,
      options: [
        {
          label: "cat 3",
          value: 1
        },
        {
          label: "cat 4",
          value: 2
        }
      ]
    },
    {
      label: <div className="d-flex justify-content-between"><span>sub-group 1</span><span>group 2</span></div>,
      options: [
        {
          label: "cat 5",
          value: 1
        },
        {
          label: "cat 6",
          value: 2
        }
      ]
    },
  ];

  const handelSize = (e, s) => {
    setIsAdded(true);
    e.preventDefault();
    let checkSize = size.filter(e => e === s);
    if (checkSize.length <= 0) setSize(size.concat(s));
    setProductData({
      ...productdata,
      [e.target.name]: ""
    });
    // setIsAdded(true)
  };

  const onColorAdd = async () => {
    let vars = variations;
    if (size.length === 0) return;
    size.map(s => {
      vars.push({ color: color[color.length - 1], size: s, quantity: 0 });
    });
    setVariation(vars);
    filterByColor();
  };

  const onSizeAdd = async () => {
    let vars = variations;
    if (color.length === 0) return;
    color.map(c => {
      vars.push({ color: c, size: size[size.length - 1], quantity: 0 });
    });
    setVariation(vars);
    filterByColor();
  };

  const filterByColor = async () => {
    let vars = [];
    await Promise.all(color.map(c => {
      let filter = variations.filter(v => v.color == c);
      vars = vars.concat(filter);
    }));
    setVariation(vars);
  };

  const onColorRemove = async (c) => {
    let vars = variations.filter(v => v.color !== c);
    setVariation(vars);
  };

  const onSizeRemove = async (s) => {
    let vars = variations.filter(v => v.size !== s);
    setVariation(vars);
  };

  useEffect(() => {
    if (isAdded) {
      onColorAdd();
    }
  }, [color]);

  useEffect(() => {
    if (isAdded) {
      onSizeAdd();
    }
  }, [size]);

  const addSuccess = () => {
    toast.success("Product Added Successfully", {
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
    setProductData({
      ...productdata,
      [e.target.name]: e.target.value
    });
  };

  const quantityChange = async (e, i) => {
    let vars = variations;
    vars[i].quantity = parseInt(e.target.value);
    setVariation(vars);
    filterByColor();
  };


  return (
    <>
      <div style={{ display: "block", padding: "20px" }}>
        <div style={{ overflowY: "initial", }}>
          {/* <div>
            <h1 className="text-center">Add Product</h1>
          </div> */}
          <div
            className="pl-lg-6"
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
                  <div className="p-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-product_name"
                          >
                            Product Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-fullName"
                            placeholder="product_name"
                            name="product_name"
                            type="text"
                            onChange={changeHandler}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-description"
                          >
                            Description
                          </label>
                          {/* <ConfigEditor/> */}
                          <Input
                            className="form-control-alternative"
                            id="input-description"
                            name="description"
                            placeholder="Text"
                            type="textarea"
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
                            placeholder="price"
                            type="number"
                            onChange={changeHandler}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-price"
                          >
                            Sales Price
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-price"
                            name="sales_price"
                            placeholder="Sales Price"
                            type="number"
                            onChange={changeHandler}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="p-lg-4">
                    <Row>
                      <Col lg="6">
                        <label
                          className="form-control-label"
                          htmlFor="input-color"
                        >
                          Category
                        </label>


                        {/* <select className="form-control col-sm-9" name="role_type" onChange={changeHandler}>
                          <option value="">
                            Select Category....
                          </option>
                          <optgroup label="Category">
                            <optgroup label="Sub-Category">
                              <options value="cat">
                                cat
                              </options>
                            </optgroup>
                          </optgroup>
                        </select> */}
                        <Select name="options" options={options} />

                      </Col>
                      <Col lg="6">
                        <label
                          className="form-control-label"
                          htmlFor="input-color"
                        >
                          Brand
                        </label>
                        <Select options={brands} />

                      </Col>
                    </Row>
                  </div>
                  <div className="p-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-color"
                          >
                            Color
                          </label>

                          <div className="d-flex">
                            <Input
                              className="form-control-alternative"
                              id="input-color"
                              name="color"
                              placeholder="color"
                              type="text"
                              value={productdata.color}
                              onChange={changeHandler}
                              onKeyPress={(e) => e.key === 'Enter' && handelColor(e, productdata.color)}
                            />
                            <Button name="color" onClick={(e) => handelColor(e, productdata.color)}>Add</Button>
                          </div>
                          <div className="d-flex mt-2">
                            {
                              color.map(c => {
                                return <div className="pl-3 py-1 ml-2 bg-secondary rounded d-flex">
                                  <span >
                                    {c}
                                  </span>
                                  <button className="ml-3 border-0 bg-secondary" onClick={(e) => {
                                    e.preventDefault();
                                    setIsAdded(false);
                                    setColor(color.filter(e => e !== c));
                                    onColorRemove(c);
                                  }}>x</button>
                                </div>;
                              })
                            }
                          </div>
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

                          <div className="d-flex">
                            <Input
                              className="form-control-alternative"
                              id="input-size"
                              placeholder="size"
                              type="text"
                              name="size"
                              value={productdata.size}
                              onChange={changeHandler}
                              onKeyPress={(e) => e.key === 'Enter' && handelSize(e, productdata.size)}
                            />
                            <Button name="size" onClick={(e) => handelSize(e, productdata.size)}>Add</Button>
                          </div>
                          <div className="d-flex mt-2">
                            {
                              size.map(s => {
                                return <div className="pl-3 py-1 ml-2 bg-secondary rounded d-flex">
                                  <span >
                                    {s}
                                  </span>
                                  <button className="ml-3 border-0 bg-secondary" onClick={(e) => {
                                    e.preventDefault();
                                    setIsAdded(false);
                                    setSize(size.filter(i => i !== s));
                                    onSizeRemove(s);
                                  }}>x</button>
                                </div>;
                              })
                            }
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="p-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-variations"
                          >
                            Variations
                          </label>
                          <Table className="w-100" hover responsive>
                            <thead>
                              <tr className="w-100">
                                <th>#</th>
                                <th>Color</th>
                                <th>Size</th>
                                <th>Quantity</th>
                              </tr>
                            </thead>
                            <tbody className="w-100">
                              {
                                variations?.map((v, i) => {
                                  return <tr className="w-100 border-0">
                                    <td>{i + 1}</td>
                                    <td ><div className="w-5 h-5" style={{ width: "15px", height: "15px", borderRadius: "15px", backgroundColor: `${v.color}` }}></div></td>
                                    <td >{v.size || ""}</td>
                                    <td className="d-flex">
                                      <input
                                        className="mr-2"
                                        id="input-sales_price"
                                        type="number"
                                        value={v.quantity || 0}
                                        onChange={(e) => quantityChange(e, i)}
                                      /> <span>pcs</span></td>
                                  </tr>;
                                })
                              }
                            </tbody>
                          </Table>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="d-flex justify-content-center">
                    <Button
                      className="btn btn-success"
                      // onClick={setModalIsOpenToFalse}
                      style={{ margin: "10px" }}
                    // onClick={addProduct}
                    >
                      Add
                    </Button>
                    <Button
                      className="btn btn-danger"
                      onClick={closeAddProduct}
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
export default AddProduct;
