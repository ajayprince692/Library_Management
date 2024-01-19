import Topbar from '../Topbar'
import React,{useState,useEffect} from 'react'
import { Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import ApiService from '../utils/ApiService';
import { useNavigate,useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'

function EditingAuthor(){
    let params=useParams;
    let navigate=useNavigate;
    let [initialValues,setValues]=useState({
        name:'',
        bio:'',
        dateOfBirth:''
    });

    let formik=useFormik({
        initialValues:initialValues,
        validationSchema:Yup.object({
            name:Yup.string()
            .max(20,"Name cannotexceed 20 letters")
            .min(1,"Name cannot be empty")
            .required("Enter the name"),

            bio:Yup.string()
            .max(200,"Bio cannot excced 200 letters"),

            dateOfBirth:Yup.string().required("Enter Birthdate")
            
        }),
        enableReInitialize:true,
        onSubmit:async(values)=>{
            let {id}=params;
            values.id=id;
            try{
                let res=await ApiService.put(`/${id}`,values);
                if(res.status===200){
                    navigate("/authorDashboard");
                }
            }
            catch(error){
                alert("Failed to edit author details")
            }
        }
    })

    let getAuthorById =async()=>{
        let{id}=params
        try{
            let res=await ApiService.get(`/${id}`)
            if(res.status===200){
                console.log(res.data);
                setValues({
                    name:res.data.name,
                    bio:res.data.bio,
                    dateOfBirth:res.data.dateOfBirth
                })
            }
        }
        catch(error){
            alert("Internal Error")
        }
    }

    useEffect(()=>{
        getAuthorById();
    },[])

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
              <Form.Control type='dateOfBirth' id="dateOfBirth" name="date" onChange={formik.handleChange} value={formik.values.dateOfBirth} onBlur={formik.handleBlur} placeholder="Enter date"/>
              {formik.touched.date && formik.errors.date ? (<div style={{color: 'blue'}}>{formik.errors.dateOfBirth}</div>) : null}
            </Form.Group>
          </Col>
          <Button variant="primary" type='submit'>Submit</Button>
        </Form>
            </Container>
        </div>
    </>
}
export default EditingAuthor