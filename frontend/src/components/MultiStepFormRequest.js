import React, { useEffect, useState } from 'react'
import Education from './bookforms/Education';
import BookSelect from './bookforms/BookSelect';
import BookDetails from './bookforms/BookDetails';
import "./MultiStepForm.scss"
import LocationSelectionForm from './bookforms/LocationSelect';
import BookDetailedSelect from './bookforms/BookDetailedSelect';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

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
    const [allBooks, setAllBooks] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const fetchBooks = async (grade) => {
        const res = await fetch('/api/books/available?classLevel=' + grade + "&collectionPoint=" + values.collectionPoint);
        const data = await res.json();
        setAllBooks(data.books);
    }

    //make a submit function
    //make request to /api/transactions/donate
    //send all the data in values
    //also send token in header

    //useeffect to fetch all books
    useEffect(() => {
        if (values.grade === '' || values.stream === '') {
            setAllBooks([]);
        };

        fetchBooks(values.grade);
    }, [values.grade, values.stream])

    //check if signeo out then redirect to home
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/?signin=true');
        }
    }, []);

    //submit function
    const submit = async () => {
        setStep(step + 1);

        setSubmitting(true);

        const res = await fetch('http://localhost:5000/api/transaction/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...values, token: localStorage.getItem('token') })
        });
        const data = await res.json();
        console.log(data);
        setSubmitting(false);
        navigate('/dashboard');

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
        <div className='container'>

            <div id='bookform'>
                <div>
                <div class="progress" style={{ marginBottom: "1rem" }}>
                    <div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" style={{ width: `${step / 3 * 100}%` }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                {step === 1 && <Education nextStep={nextStep} handleChange={handleChange} state={values} allBooks={allBooks} />}
                {step === 0 && <LocationSelectionForm nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} state={values} />}
                {step === 2 && <BookDetailedSelect nextStep={submit} prevStep={prevStep} handleChange={handleChange} state={values} allBooks={allBooks} />}
                
            {
                submitting ? (
                    <Spinner forceChildren loading={true}>
                        <div style={{ height: '50vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <h1>Submitting...</h1>
                        </div>
                    </Spinner>
                ) : null
            }
            </div>
            </div>
        </div>
    )
}
