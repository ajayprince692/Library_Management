import React, { useState, useEffect } from "react";
import Topbar from "../Topbar";
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function AddingAuthor() {
  let navigate = useNavigate();

  let formik = useFormik({
    initialValues: {
      name: "",
      bio: "",
      dateofBirth: "",
    },
    validateSchema: Yup.object({
      name: Yup.string()
        .max(20, "Name cannot exceed 20 characters")
        .min(3, "Name cannot be shorter than 3 characters")
        .required("Name cannot be empty"),
      bio: Yup.string()
        .max(200, "Bio cannot exceed 200 characters")
        .min(5, "Bio cannot be shorter than 5 characters")
        .required("Bio cannot be empty"),
      dateofBirth: Yup.string().required("DOB cannot be empty"),
    }),
    onSubmit:async(values)=>{
        try{
            if(resizeBy.status===201){
                navigate('/authorDashboard')
            }
        }
        catch(error){
            alert("Creation failed")
        }
    }
  });

  return<>
    <Topbar/>
    <div>
    <Container>
        <Form className='mt-5' onSubmit={formik.handleSubmit}>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} placeholder="Enter Author Name"/>
              {formik.touched.name && formik.errors.name ? (<div style={{color: 'blue'}}>{formik.errors.name}</div>) : null}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" id="bio" name="bio" onChange={formik.handleChange} value={formik.values.bio} onBlur={formik.handleBlur} placeholder="Enter Author Bio"/>
              {formik.touched.bio && formik.errors.bio ? (<div style={{color: 'blue'}}>{formik.errors.bio}</div>) : null}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type='date' id="date" name="date" onChange={formik.handleChange} value={formik.values.dateofBirth} onBlur={formik.handleBlur} placeholder="Enter Birth date"/>
              {formik.touched.dateofBirth && formik.errors.dateofBirth ? (<div style={{color: 'blue'}}>{formik.errors.dateofBirth}</div>) : null}
            </Form.Group>
          </Col>
          <Button variant="primary" type='submit'>Submit</Button>
        </Form>
      </Container>
    </div>
  </>
}

export default AddingAuthor;
