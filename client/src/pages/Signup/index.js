import { React, useState } from "react";

function Signup() {

    const [signupState, setSignupState] = useState({
        username: '',
        email: '',
        password: ''
    })

    const submitHandler = (e) => {
        e.preventDefault();
        // check if all the fields have data
        if (!(signupState.username && signupState.email && signupState.password)) {
            console.log('Please fill all the fields');
            return
        }
        fetch('/users', {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupState)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setSignupState({
            ...signupState,
            [name]: value
        })
    }
    return (
        <>
            <form>
                <label htmlFor="username">
                    Username: <input
                        onChange={(e) => changeHandler(e)}
                        id="username"
                        name="username"
                        type="text" />
                </label>
                <br />
                <label htmlFor="email">
                    Email: <input
                        onChange={(e) => changeHandler(e)}
                        id="email"
                        name="email"
                        type="text" />
                </label>
                <br />
                <label htmlFor="password">
                    Password: <input
                        onChange={(e) => changeHandler(e)}
                        type="password"
                        name="password"
                        id="password" />
                </label>
                <br />
                <button onClick={(e) => submitHandler(e)} id="signup-btn">Sign Up</button>
            </form>
        </>
    )
}

export default Signup;