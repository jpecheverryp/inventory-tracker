import { React, useState } from "react"

function Login() {

    const [loginState, setLoginState] = useState({
        email: '',
        password: ''
    })

    const submitHandler = (e) => {
        e.preventDefault();
        if (!(loginState.email && loginState.password)) {
            console.log('Please fill all the fields');
            return
        }
        fetch('/users/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginState)
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setLoginState({
            ...loginState,
            [name]: value
        })
    }
    return (
        <>
            <form>
                <label htmlFor="email">
                    Email: <input
                        onChange={(e) => changeHandler(e)}
                        autoComplete="email"
                        id="email"
                        name="email"
                        type="email" />
                </label>
                <br />
                <label htmlFor="password">
                    Password: <input
                        onChange={(e) => changeHandler(e)}
                        autoComplete="current-password"
                        type="password"
                        name="password"
                        id="password" />
                </label>
                <br />
                <button onClick={(e) => submitHandler(e)} id="login-btn">Log In</button>
            </form>
        </>
    )
}

export default Login;