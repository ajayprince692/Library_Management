import React,  { useState,useEffect }  from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Topbar from '../Topbar'
import { useNavigate } from 'react-router-dom';
import ApiService from '../utils/ApiService';
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card"

function DashboardAuthor() {

  const [authorData, setAuthorData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAuthorData();
  }, []);

  const getAuthorData = async () => {
    try {
      let res = await ApiService.get('');
      if (res.status === 200) {
        setAuthorData(res.data);
      }
    } catch (error) {
      console.error('Data fetch failed', error);
      // Handle error in a more user-friendly way, e.g., display an error message in the UI.
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this author?');
    if (confirmDelete) {
      try {
        let res = await ApiService.delete(`/${id}`);
        if (res.status === 200) {
          getAuthorData();
        }
      } catch (error) {
        console.error('Data removal failed', error);
        // Handle error in a more user-friendly way, e.g., display an error message in the UI.
      }
    }
  };

  return (
    <>
      <Topbar />
      <Container className="my-4">
        <Button className="mb-3" variant="outline-success" onClick={() => navigate(`/addAuthor`)}>
          Add Author
        </Button>
        <Row>
          {authorData.map((e) => (
            <Col key={e.id} xs={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{e.name}</Card.Title>
                  <Card.Text><strong>Bio: </strong>{e.bio}</Card.Text>
                  <Card.Text>
                    <strong>Book:</strong> {e.bookName}
                  </Card.Text>
                  <Card.Text>
                    <strong>Birth Date:</strong> {e.dateofBirth}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-center">
                  <Button variant="info" onClick={() => navigate(`/editAuthor/${e.id}`)}>
                    Edit
                  </Button>
                  &nbsp;
                  <Button variant="danger" onClick={() => handleDelete(e.id)}>
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default DashboardAuthor;


