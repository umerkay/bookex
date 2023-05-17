import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ImageUploadForm from './ImageUpload';

export default function BookDetails(props) {
    const { state } = props;
    const { books } = state;

    const handleChange = e => {
        props.handleChange(e);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.nextStep();
    }

    const updateBooks = () => {
        handleChange({ target: { name: 'books', value: [...books] } })
    }

    //for each book, input the condition out of 10 and a picture of the book

    return (
        <div id='bookdetails'>
            <h1>Book Details</h1>
            <Form onSubmit={handleSubmit}>
                {books.map((book, index) => {
                    return (
                        <div key={index}>
                            <Form.Label>
                                {book.title}
                            </Form.Label>
                            <Form.Group>
                                <Form.Label htmlFor={`condition${index}`}>Condition out of 10</Form.Label>
                                <Form.Control
                                    type='number'
                                    name='condition'
                                    id={`condition${index}`}
                                    value={book.condition}
                                    min={1}
                                    max={10}
                                    onChange={e => {
                                        books[index].condition = e.target.value;
                                        updateBooks();
                                    }}
                                    required
                                />
                            </Form.Group>
                            <ImageUploadForm setFile={
                                (file) => {
                                    books[index].image = file;
                                    updateBooks();
                                }
                            } />
                        </div>
                    );
                })}
                <div className='flex flex-center' style={{marginTop: "1rem"}}>

                <button className='btn btn-main' onClick={props.prevStep}>Back</button>
                <input type='submit' className='btn btn-main' value='Next' />
                </div>
            </Form>

        </div>
    )
}
