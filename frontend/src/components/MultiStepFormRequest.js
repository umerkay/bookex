import React, { useEffect, useState } from 'react'
import Education from './bookforms/Education';
import BookSelect from './bookforms/BookSelect';
import BookDetails from './bookforms/BookDetails';
import "./MultiStepForm.scss"
import LocationSelectionForm from './bookforms/LocationSelect';
import BookDetailedSelect from './bookforms/BookDetailedSelect';

export default function MultiStepFormRequest() {

    const [step, setStep] = useState(0);
    const [values, setValues] = useState({
        stream: '',
        grade: '',
        books: [],
    });

    // const allBooks = {
    //     //increment isbn from 123456700
    //     fsc: {
    //         9: [{ name: '9th Physics', isbn: '123456700' }, { name: '9th Chemistry', isbn: '123456701' }, { name: '9th Biology', isbn: '123456702' }, { name: '9th Math', isbn: '123456703' }],
    //         10: [{ name: '10th Physics', isbn: '123456704' }, { name: '10th Chemistry', isbn: '123456705' }, { name: '10th Biology', isbn: '123456706' }, { name: '10th Math', isbn: '123456707' }],
    //         11: [{ name: '11th Physics', isbn: '123456708' }, { name: '11th Chemistry', isbn: '123456709' }, { name: '11th Biology', isbn: '123456710' }, { name: '11th Math', isbn: '123456711' }],
    //         12: [{ name: '12th Physics', isbn: '123456712' }, { name: '12th Chemistry', isbn: '123456713' }, { name: '12th Biology', isbn: '123456714' }, { name: '12th Math', isbn: '123456715' }],
    //     },
    //     cambridge: {
    //         O: [{ name: 'O Level Physics', isbn: '123456716' }, { name: 'O Level Chemistry', isbn: '123456717' }, { name: 'O Level Biology', isbn: '123456718' }, { name: 'O Level Math', isbn: '123456719' }],
    //         AS: [{ name: 'AS Level Physics', isbn: '123456720' }, { name: 'AS Level Chemistry', isbn: '123456721' }, { name: 'AS Level Biology', isbn: '123456722' }, { name: 'AS Level Math', isbn: '123456723' }],
    //         A: [{ name: 'A Level Physics', isbn: '123456724' }, { name: 'A Level Chemistry', isbn: '123456725' }, { name: 'A Level Biology', isbn: '123456726' }, { name: 'A Level Math', isbn: '123456727' }],
    //     }
    // }

    //fetch allbooks from backend accoridng to route in api/books.js
    //fetch when grade is selected
    const [allBooks, setAllBooks] = useState({});
    const fetchBooks = async (grade) => {
        const res = await fetch('http://localhost:5000/api/books/available?classLevel=' + grade + "&collectionPoint=");
        const data = await res.json();
        setAllBooks(data.books);
    }

    //make a submit function
    //make request to /api/transactions/donate
    //send all the data in values
    //also send token in header
    
    //useeffect to fetch all books
    useEffect(() => {
        if(values.grade === '') return;
        fetchBooks(values.grade);
    }, [values.grade])

    //submit function
    const submit = async () => {
        const res = await fetch('http://localhost:5000/api/transaction/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...values, token: localStorage.getItem('token')})
        });
        const data = await res.json();
        console.log(data);
    }
    
    //nextstep
    const nextStep = () => {
        setStep(step + 1);
    }

    //prevstep
    const prevStep = () => {
        setStep(step - 1);
    }

    //handlechange
    const handleChange = e => {

        setValues({ ...values, [e.target.name]: e.target.value });
        // if(e.target.name === 'grade') {
        //     fetchBooks(e.target.value);
        // }
    }

    return (
        <div id='bookform'>
            {step === 0 && <Education nextStep={nextStep} handleChange={handleChange} state={values} />}
            {step === 2 && <LocationSelectionForm nextStep={submit} prevStep={prevStep} handleChange={handleChange} state={values} /> }
            {step === 1 && <BookDetailedSelect nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} state={values} allBooks={allBooks} />}
        </div>
    )
}
