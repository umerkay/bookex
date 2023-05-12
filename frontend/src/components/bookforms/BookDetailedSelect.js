import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';

export default function BookDetailedSelect(props) {

    const { state, allBooks } = props;
    const { books } = state;
    const [selectedBooks, setBooks] = useState(books);

    const handleChange = e => {
        props.handleChange(e);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.nextStep();
    }

    const selectBook = (book) => {
        setBooks([...books, book]);
        handleChange({ target: { name: 'books', value: [...books, book] } })
    }

    const deselectBook = (book) => {
        setBooks(books.filter(b => b._id !== book._id));
        handleChange({ target: { name: 'books', value: books.filter(b => b._id !== book._id) } })
    }

    //render allBooks with checkboxes
    //each book is object with name and _id
    //use react bootstrap components
    //selected books are stored in state in books array

    return (
        <div id='bookSelect'>
            <h1>Select Books</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="books">
                    <Form.Label>Books</Form.Label>
                    {allBooks.map((book, index) => {
                        let isSelected = (selectedBooks.find(b => b._id === book._id)) ? true : false;
                        //in checked prop, check if _id of book is in selectedBooks array
                        return (<>
                        <Form.Check
                            key={index}
                            type='checkbox'
                            label={book.bookID.title}
                            name={book._id}
                            value={book._id}
                            checked={isSelected}
                            onChange={e => (e.target.checked) ? selectBook(book) : deselectBook(book)}
                        />
                        <span>Condition: {book.condition}</span></>
                    )})}
                </Form.Group>

                <input type='submit' className='btn btn-main' value='Next' />

            </Form>


        </div>

    )
}
