import React, { useState, useEffect } from "react";
import Topbar from "../Topbar";
import {Form} from "react-bootstrap";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import ApiService from "../utils/ApiService";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function EditBook() {
  let params = useParams;
  let navigate = useNavigate;
  let [initialValues, setValues] = useState({
    name: "",
    Description: "",
    serialNo: "",
    authorname: "",
    bio: "",
    dateOfBirth: "",
  });

  let formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      name: Yup.string()
        .max(25, "Title cannot exceed 25")
        .min(3, "title cannot be smaller than 3 letters")
        .required("Title has to be given"),

      Description: Yup.string()
        .max(400, "Description cannot exceed 400")
        .min(20, "Description cannot be smaller than 20")
        .required("Provide the Description"),

      serialNo: Yup.string()
        .matches(15, "Enter correct serial number")
        .required("SerialNo cannot be empty"),

      authorname: Yup.string()
        .max(25, "Name cannot exceed 25")
        .min(2, "Name cannot be smaller than 3 letters")
        .required("Name cannot be empty"),

      dateOfBirth: Yup.string().required("Date cannot be empty"),
    }),
    enableReInitialize: true,
    onSubmit: async (values) => {
      let { id } = params;
      values.id = id;
      try {
        let res = await ApiService.put(`/${id}`, values);
        if (res.status === 200) {
          navigate("/");
        }
      } catch (error) {
        alert("Failed to edit");
      }
    },
  });

let getBookDataBYId = async () => {
  let { id } = params;
  try {
    let res = await ApiService.get(`/${id}`);
    if (res.status === 200) {
      console.log(res.data);
      setValues({
        name: res.data.name,
        Description: res.data.Description,
        serialNo: res.data.serialNo,
        authorname: res.data.authorname,
        bio: res.data.bio,
        dateOfBirth: res.data.dateOfBirth,
      });
    }
  } catch (error) {
    alert("Internal error");
  }
};

useEffect(() => {
  getBookDataBYId();
}, []);

return (
  <>
    <Topbar />
    <div>
      <Container>
        <Form className='me-5' onSubmit={formik.handleSubmit}>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Title</b>
              </Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
                placeholder="Enter Book Title"
              />
              {formik.touched.name && formik.errors.name ? (
                <div style={{ color: "blue" }}>{formik.errors.name}</div>
              ) : null}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Description</b>
              </Form.Label>
              <Form.Control
                type="text"
                id="Description"
                name="Description"
                onChange={formik.handleChange}
                value={formik.values.Description}
                onBlur={formik.handleBlur}
                placeholder="Enter Book Description"
              />
              {formik.touched.Description && formik.errors.Description ? (
                <div style={{ color: "blue" }}>{formik.errors.Description}</div>
              ) : null}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>SerialNo</b>
              </Form.Label>
              <Form.Control
                type="text"
                id="serialNo"
                name="serialNo"
                onChange={formik.handleChange}
                value={formik.values.serialNo}
                onBlur={formik.handleBlur}
                placeholder="Enter Book Number"
              />
              {formik.touched.serialNo && formik.errors.serialNo ? (
                <div style={{ color: "blue" }}>{formik.errors.serialNo}</div>
              ) : null}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Author Name</b>
              </Form.Label>
              <Form.Control
                type="text"
                id="authorname"
                name="authorname"
                onChange={formik.handleChange}
                value={formik.values.authorname}
                onBlur={formik.handleBlur}
                placeholder="Enter Authorname"
              />
              {formik.touched.authorname && formik.errors.authorname ? (
                <div style={{ color: "blue" }}>{formik.errors.authorname}</div>
              ) : null}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Written at</b>
              </Form.Label>
              <Form.Control
                type="text"
                id="dateOfBirth"
                name="dateOfBirth"
                onChange={formik.handleChange}
                value={formik.values.dateOfBirth}
                onBlur={formik.dateOfBirth}
                placeholder="Enter Book Description"
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                <div style={{ color: "blue" }}>{formik.errors.dateOfBirth}</div>
              ) : null}
            </Form.Group>
          </Col>
          <Button variant="primary" type='submit'>Submit</Button>
        </Form>
      </Container>
    </div>
  </>
);
}

export default EditBook;
