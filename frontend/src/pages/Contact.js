import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [query, setQuery] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Name ${name}, Email: ${email}, Phone: ${phone}, Query: ${query}`);
    // Replace the console.log() statement 
  };

  return (
    <div id="contactus" style={{
      // backgroundImage: `url(${process.env.PUBLIC_URL}/bg7.jpg)`,
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
      minHeight: '100vh'
    }}>
      <Container style={{ paddingTop: '30px' }}>
        <div>
        <h1>Contact Us</h1>
        <h3 style={{ paddingTop: '20px' }}> Please fill the form to contact us </h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" value={name} onChange={handleNameChange} required />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} required />
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" placeholder="Enter phone number" value={phone} onChange={handlePhoneChange} />
          </Form.Group>

          <Form.Group controlId="formQuery">
            <Form.Label>Query/Message</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter your query/message" value={query} onChange={handleQueryChange} required />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </div>
      </Container>
    </div>
  )
}

export default Contact;