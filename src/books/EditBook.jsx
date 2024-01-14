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
    title: "",
    Description: "",
    serialNo: "",
    authorname: "",
    bio: "",
    Date: "",
  });

  let formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      title: Yup.string()
        .max(25, "Title cannot exceed 25")
        .min(3, "title cannot be smaller than 3 letters")
        .required("Title has to be given"),

      Description: Yup.string()
        .max(400, "Description cannot exceed 400")
        .min(20, "Description cannot be smaller than 20")
        .required("Provide the description"),

      serialNo: Yup.string()
        .matches(15, "Enter correct serial number")
        .required("SerialNo cannot be empty"),

      authorname: Yup.string()
        .max(25, "Name cannot exceed 25")
        .min(2, "Name cannot be smaller than 3 letters")
        .required("Name cannot be empty"),

      Date: Yup.string().required("Date cannot be empty"),
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
        title: res.data.title,
        Description: res.data.Description,
        serialNo: res.data.serialNo,
        authorname: res.data.authorname,
        bio: res.data.bio,
        Date: res.data.Date,
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
                id="title"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                onBlur={formik.handleBlur}
                placeholder="Enter Book Title"
              />
              {formik.touched.title && formik.errors.title ? (
                <div style={{ color: "blue" }}>{formik.errors.title}</div>
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
                id="description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                onBlur={formik.handleBlur}
                placeholder="Enter Book Description"
              />
              {formik.touched.description && formik.errors.description ? (
                <div style={{ color: "blue" }}>{formik.errors.description}</div>
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
                id="Date"
                name="date"
                onChange={formik.handleChange}
                value={formik.values.Date}
                onBlur={formik.Date}
                placeholder="Enter Book Description"
              />
              {formik.touched.Date && formik.errors.Date ? (
                <div style={{ color: "blue" }}>{formik.errors.Date}</div>
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
