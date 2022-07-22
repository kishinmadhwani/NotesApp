import React, { useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Alert } from 'react-bootstrap'



function Login({ setIsLogin }) {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [err, setErr] = useState('');

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setErr('');
    }

    const registerSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/users/register', {
                username: user.name,
                email: user.email,
                password: user.password
            });
            setUser({ name: "", email: "", password: "" });
            setErr(res.data.msg)
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    const loginSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/users/login', {
                email: user.email,
                password: user.password
            });
            setUser({ name: "", email: "", password: "" });
            localStorage.setItem('tokenStore', res.data.token)
            setIsLogin(true);
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    const [onLogin, setOnLogin] = useState(true);

    return (
        <section>
            {onLogin && <div className="login">
                <div className="container text-light mt-5">
                    <h1>Login</h1>
                    <div className="p-3 mt-3 bg-dark rounded-3">
                        <Form onSubmit={loginSubmit}>
                            <Form.Group>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" name="email" id="login-email" value={user.email} onChange={onChangeInput} placeholder="Example@email.com" required />
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" id="login-password" value={user.password} onChange={onChangeInput} placeholder="Password" autoComplete="true" required />
                            </Form.Group>
                            <p className="mt-1">You don't have an account? <span onClick={() => setOnLogin(false)} className="purple">Register Now!</span></p>
                            <Button variant="btn bg_purple btn-lg" type="submit">Login</Button>
                            {err && <Alert className="mt-3 alert-dark" >{err}</Alert>}
                        </Form>
                    </div>
                </div>
            </div>}

            {!onLogin && <div className="register">
                <div className="container text-light mt-5">
                    <h1>Register</h1>
                    <div className="p-3 mt-3 bg-dark rounded-3">
                        <Form onSubmit={registerSubmit}>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="name" id="register-name" value={user.name} onChange={onChangeInput} placeholder="Example" required />
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" name="email" id="register-email" value={user.email} onChange={onChangeInput} placeholder="Example@email.com" required />
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" id="register-password" value={user.password} onChange={onChangeInput} placeholder="Password" autoComplete="true" required />
                            </Form.Group>
                            <p className="mt-1">Already have an account? <span onClick={() => setOnLogin(true)} className="purple">Login Now!</span></p>
                            <Button variant="btn bg_purple btn-lg" type="submit">Register</Button>
                            {err && <Alert className="mt-3 alert-dark" >{err}</Alert>}
                        </Form>
                    </div>
                </div>
            </div>}
        </section>
    );
}

export default Login;