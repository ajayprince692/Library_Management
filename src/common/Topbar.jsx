import React from 'react';
import { Container } from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap-Navbar'
import { useNavigate } from 'react-router-dom';

function Topbar(){
    let navigate = useNavigate();

    return(
        <>
              <Navbar expand="md" className="bg-primary">
                <Container fluid>
                    <Navbar.Brand onClick={() => navigate('/')}><b>Public Library</b></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link onClick={() => navigate('/')}><b>Home</b></Nav.Link>
                            <Nav.Link onClick={() => navigate('/authorDashboard')}><b>Authors Dashboard</b></Nav.Link>                        
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}