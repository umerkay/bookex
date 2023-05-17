import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import './BookSelect.scss';
import { FaComment, FaInfo, FaInfoCircle, FaMapMarker, FaRegStar, FaStar } from 'react-icons/fa';
import BasicModal from '../BasicModal';

export default function BookDetailedSelect(props) {

    const { state, allBooks } = props;
    const { books } = state;
    const [selectedBooks, setBooks] = useState(books);
    const [showImageModal, setShowImageModal] = useState(false);
    const [image, setImage] = useState(null);

    const [showReviewsModal, setShowReviewsModal] = useState(false);
    const [reviews, setReviews] = useState(null);



    const showImage = (image) => {
        setImage(image);
        setShowImageModal(true);
    };

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
            {/* <p>Select the books you want to {props.type.toLowerCase()}.</p> */}

            {showImageModal ?
                <BasicModal show={showImageModal} handleClose={() => setShowImageModal(false)} title={"Book Image"} >
                    <div className='flex'>
                        <img src={image} alt="Book Image" style={{ height: "auto", maxWidth: "100%", width: "max-content" }} />
                    </div>
                </BasicModal> : null}

            {showReviewsModal ?
                <BasicModal show={showReviewsModal} handleClose={() => setShowReviewsModal(false)} title={"Reviews"} >
                    <div className='flex'>
                        <div className='reviews'>
                        <FaInfoCircle></FaInfoCircle>

                            <h3>
                                The owner of this book has received the following reviews in the past.</h3>
                            {reviews.map((review, index) => {
                                return (
                                    <div className='review' key={index}>
                                        <div className='rating flex'>
                                            <FaStar></FaStar><span> {review.rating}</span>
                                        </div>
                                        <div className='flex'>
                                            <FaComment></FaComment>
                                            <span>{review.review}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </BasicModal> : null}



            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="books">
                    <Form.Label>Books</Form.Label>
                    {allBooks.map((book, index) => {
                        let isSelected = (selectedBooks.find(b => b._id === book._id)) ? true : false;
                        //in checked prop, check if _id of book is in selectedBooks array
                        return (<>
                            <Form.Check
                                style={{ marginTop: '1rem' }}
                                key={index}
                                type='checkbox'
                                label={book.bookID.title}
                                name={book._id}
                                value={book._id}
                                checked={isSelected}
                                onChange={e => (e.target.checked) ? selectBook(book) : deselectBook(book)}
                            />
                            <div className='book-details'>
                                <div className='img' onClick={() => showImage(book.image)} style={{ background: "url(" + book.image + ")" }}></div>
                                {/* <img src={book.image}></img> */}
                                <div className='details'>
                                    <span> <FaStar></FaStar> {book.condition}</span>
                                    <span> <FaMapMarker></FaMapMarker> {book.collectionPoint}</span>
                                    <button className='btn btn-main flex' style={{ width: "max-content", marginTop: "1rem" }} onClick={(e) => {
                                        e.preventDefault();
                                        setReviews(book.userID.reviews);
                                        setShowReviewsModal(true);
                                        }}>
                                        <FaRegStar></FaRegStar>
                                        Reviews
                                    </button>
                                </div>
                            </div></>
                        )
                    })}
                </Form.Group>

                <div className='flex'>
                    <button className='btn btn-main' onClick={props.prevStep}>Back</button>
                    <input type='submit' disabled={selectedBooks.length === 0} className='btn btn-main' value='Next' />
                </div>
            </Form>


        </div>

    )
}
