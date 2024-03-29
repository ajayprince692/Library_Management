import React,{useState,useEffect} from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Topbar from '../Topbar';
import { useNavigate } from 'react-router-dom';
import ApiService from '../utils/ApiService';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

function BookDashboard(){
    let [bookData,setbookData]=useState([]);
    let navigate=useNavigate();
    useEffect(()=>{
        getBookData();
    },[]);

    let getBookData =async()=>{
        try{
            let res=await ApiService.get('')
            if (res.status===200){
                setbookData(res.data);
            }

        }catch(error){
            alert('Failed to get the data');
        }
    }

    let handleDelete=async (id)=>{
        try{
            let res=await ApiService.delete(`/${id}`)
            if(res.status===200){
                getBookData();
            }
        }
        catch(error){
            alert('Failed to remove the data');
        }
    };

    let renderCards = () => {
      return bookData.map((e, i) => (
        <Col key={i} xs={12} md={4} className='mb-4'>
          <Card
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Card.Img variant='top' src={e.imageURL} alt={e.title} style={{ maxHeight: '200px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title>{e.title}</Card.Title>
              <Card.Text>{e.description}</Card.Text>
              <Card.Text>
                <strong>Serial No:</strong> {e.serialNo}
              </Card.Text>
              <Card.Text>
                <strong>Author Name:</strong> {e.name}
              </Card.Text>
              <Card.Text>
                <strong>Book name:</strong> {e.bookName}
              </Card.Text>
              <Card.Text>
                <strong>Written At:</strong> {e.dateofBirth}
              </Card.Text>
            </Card.Body>
            <Card.Footer className='text-right justify-content-end'>
              <Button variant='primary' onClick={() => navigate(`/editbook/${e.id}`)}>
                Edit
              </Button>
              &nbsp;
              <Button variant='danger' onClick={() => handleDelete(e.id)}>
                Delete
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      ));
    };
    
    

    return(
        <>
           <Topbar /><br/>
      <Container  style={{ backgroundColor: '#1E90FF' }}>
      <Container className="d-flex justify-content-center align-items-center flex-column" >
        <Button className='mt-3' variant='success' onClick={() => navigate(`/addBook`)}>
          Add Book
        </Button>
      </Container><br/>
      <Container>      
        <Row className='mt-3'>{renderCards()}</Row>
      </Container>
      </Container> 

        </>
    );
}

export default BookDashboard;