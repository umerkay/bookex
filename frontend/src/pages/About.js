import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const About = () => {
  return (
    <div style={{ 
      backgroundImage: `url(${process.env.PUBLIC_URL}/bg7.jpg)`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      minHeight: '160vh'
    }}>
      <Container style={{ paddingTop: '70px'  }}>
        <h2> For Students, By Students </h2>
        <p style={{paddingTop: '80px', textAlign:'center'}}>Bookex is a web application that allows students to exchange educational books with each other. The platform focuses on providing access to textbooks, reference books, and study guides for classes 9, 10, 11, 12, and O and A Levels, and automates the book exchange process to make it easier and more efficient.</p>
       
        <Row  style={{ paddingTop: '50px'  }} className="justify-content-center">
          <Col xs={12} md={4} className="text-center ">
            <Image src={process.env.PUBLIC_URL + '/hina.jpg'} alt="Team Member 1" fluid style={{ width: '200px', height: '200px', borderRadius: '10px', objectFit: 'cover' }} />
            <p>Hina Naeem</p>
          </Col>
          <Col xs={12} md={4} className="text-center ">
            <Image src={process.env.PUBLIC_URL + '/umer.jpg'} alt="Team Member 2" fluid style={{ width: '200px', height: '200px', borderRadius: '10px', objectFit: 'cover' }} />
            <p>Umer Khan</p>
          </Col>
          <Col xs={12} md={4} className="text-center ">
            <Image src={process.env.PUBLIC_URL + '/shalina.jpg'} alt="Team Member 3" fluid style={{ width: '200px', height: '200px', borderRadius: '10px', objectFit: 'cover' }} />
            <p>Shalina Riaz</p>
          </Col>
        </Row>

        <p style={{ paddingTop: '70px'  }}>Bookex was created by a team of three students from the National University of Sciences and Technology (NUST) in Islamabad, Pakistan.</p>      
        
      </Container>
    </div>
  )
}

export default About;
