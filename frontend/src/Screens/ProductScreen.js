import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Container } from 'react-bootstrap'
import ReactHtmlParser from 'react-html-parser'

const ProductScreen = () => {

  const params = useParams();
  const [product, setProduct] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      const {data} = await axios.get(`/api/products/${params.id}`)
      setProduct(data)
    }
    fetchProduct()  
  })

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      <Container fluid>
      
      <Row>
      
        <Col md={4}>
          <Row>
            <Image src={product.image} alt={product.name} fluid />
          </Row>

          <Row>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.ticketsStock > 0 ? 'In Stock' : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          </Row>
        </Col>
        

        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
      
            <ListGroup.Item>by {product.organizer}</ListGroup.Item>

            <ListGroup.Item>{product.description}</ListGroup.Item>

            <ListGroup.Item><strong>When:</strong> 
              <br/>{product.date} at {product.time}</ListGroup.Item>

            <ListGroup.Item><strong>Where:</strong> 
              <br/>{ReactHtmlParser(product.location)}</ListGroup.Item>

            <ListGroup.Item><strong>Tickets: <h4>${product.price}</h4></strong></ListGroup.Item>
          </ListGroup>
        </Col>

      </Row>

      </Container>
    
    </>
  )
}

export default ProductScreen