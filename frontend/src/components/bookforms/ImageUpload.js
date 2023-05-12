import { Form, Button } from 'react-bootstrap';

function ImageUploadForm(props) {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // Handle file upload logic here
    props.setFile(file)
    console.log('Uploaded file:', file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    // You can access the uploaded file using a form field or from state
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Upload Image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </Form.Group>
    </Form>
  );
}

export default ImageUploadForm;
