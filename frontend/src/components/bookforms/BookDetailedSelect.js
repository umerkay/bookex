import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import './BookSelect.scss';

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
                            <div className='book-details'>
                                <div className='img' style={{background: "url(" + book.image + ")"}}></div>
                                {/* <img src={book.image}></img> */}
                                <div className='details'>
                                    <span>Condition: {book.condition}</span>
                                    <span>Location: {book.collectionPoint}</span>
                                </div>
                            </div></>
                        )
                    })}
                </Form.Group>

                <div className='flex'>
                    <button className='btn btn-main' onClick={props.prevStep}>Back</button>
                    <input type='submit' className='btn btn-main' value='Next' />
                </div>
            </Form>


        </div>

    )
}
