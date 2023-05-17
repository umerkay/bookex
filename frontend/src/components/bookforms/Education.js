import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Spinner from '../Spinner';

export default function Education(props) {
    //take input of stream between fsc and cambridge
    //take input of 9 10 11 12 for fsc
    //take input of alevels or olevels grade for cambridge

    console.log(props)
    const { state, allBooks } = props;
    const { stream, grade } = state;

    const handleChange = e => {
        props.handleChange(e);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.nextStep();
    }

    //make form in bootstrap with 3 inputs
    //use react bootstrap components


    return (
        <div id='education'>
            <h1>Education</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="stream">
                    <Form.Label>Stream</Form.Label>
                    <Form.Control as="select" name="stream" value={stream} onChange={handleChange}>
                        <option value=''>Select Stream</option>
                        <option value='fsc'>FSC/Matric</option>
                        <option value='cambridge'>Cambridge</option>
                    </Form.Control>


                </Form.Group>

                <Form.Group className="mb-3" controlId="grade">

                    {stream === 'fsc' ? (
                        <>
                            <Form.Label>Grade</Form.Label>
                            <Form.Control required as="select" name="grade" value={grade} onChange={handleChange}>
                                <option value=''>Select Grade</option>
                                <option value='9'>9</option>
                                <option value='10'>10</option>
                                <option value='11'>11</option>
                                <option value='12'>12</option>
                            </Form.Control></>
                    ) : (<>
                        <Form.Label>Grade</Form.Label>
                        <Form.Control required as="select" name="grade" value={grade} onChange={handleChange}>
                            <option value=''>Select Grade</option>
                            <option value='O Level'>O Levels</option>
                            <option value='A Level'>A Levels</option>
                        </Form.Control></>
                    )}

                </Form.Group>

                    <Spinner forceChildren loading={props.loading}>
                        {
                            props.prevStep ?

                                <button className='btn btn-main' onClick={props.prevStep}>Back</button>
                                : null

                        }
                    <input type='submit' disabled={props.loading || props.disabledNextStep} className='btn btn-main' value='Next'/>

                    </Spinner>

            </Form>


        </div>

    )
}
