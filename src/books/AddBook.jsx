import React, { useState } from "react";
import Topbar from "../Topbar";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {Container} from "react-bootstrap";
import ApiService from "../utils/ApiService";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function AddBook() {
  let navigate = useNavigate();

  let formik = useFormik({
    initialValues: {
      name: "",
      Description: "",
      serialNo: "",
      authorname: "",
      bio: "",
      Date: "",
    },
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
        .max(15, "Enter correct serial number")
        .required("SerialNo cannot be empty"),

      authorname: Yup.string()
        .max(25, "Name cannot exceed 25")
        .min(2, "Name cannot be smaller than 3 letters")
        .required("Name cannot be empty"),

      

      // Date: Yup.string().required("Date cannot be empty"),
    }),

    onSubmit: async (values) => {
      try {
        let res = await ApiService.post("", values);
        if (res.status === 201) {
          navigate("/");
        }
      } catch (error) {
        alert("Failed to add data");
      }
    },
  });
  return (
    <>
      <Topbar />
      <div>
        <Container>
          <Form className="me-5" onSubmit={formik.handleSubmit}>
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
                  <div style={{ color: "blue" }}>
                    {formik.errors.Description}
                  </div>
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
                  <div style={{ color: "blue" }}>
                    {formik.errors.authorname}
                  </div>
                ) : null}
              </Form.Group>
            </Col>

           
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="Date">
                  <b>Written at</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  id="Date"
                  name="Date"
                  onChange={formik.handleChange}
                  value={formik.values.Date}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Published Date"
                />
                {formik.touched.Date && formik.errors.Date ? (
                  <div style={{ color: "blue" }}>{formik.errors.Date}</div>
                ) : null}
              </Form.Group>
            </Col>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
}
export default AddBook;
