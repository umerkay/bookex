import React, { useState } from 'react'

export default function MultiStepForm() {

    const [step, setStep] = useState(0);
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
    });
    
    //nextstep
    const nextStep = () => {
        setStep(step + 1);
    }

    //prevstep
    const prevStep = () => {
        setStep(step - 1);
    }

    //handlechange
    const handleChange = input => e => {
        setValues({ ...values, [input]: e.target.value });
    }

    switch (step) {
        case 1:
            return (
                <>
                <button onClick={nextStep}>Next</button>
                <p>1</p>
                <button onClick={prevStep}>Back</button>
                </>
            )
        case 2:
            return (
                <>
                <button onClick={nextStep}>Next</button>
                <p>2</p>
                <button onClick={prevStep}>Back</button>
                </>
            )
        case 3:
            return (
                <>
                <button onClick={nextStep}>Next</button>
                <p>3</p>
                <button onClick={prevStep}>Back</button>
                </>
            )
        default:
            return (
                <>
                <button onClick={nextStep}>Next</button>
                <p>0</p>
                <button onClick={prevStep}>Back</button>
                </>
            )

    }
}
