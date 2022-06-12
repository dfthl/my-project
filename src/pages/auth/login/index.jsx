import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { Button, FormFeedback, Input } from "reactstrap";
import axios from 'axios';

import './style.scss'

const validationSchema = yup.object().shape({
    email: yup.string().email().required("Email salah"),
    password: yup.string().min(8).required()
})
export default function Login() {

    const handleLogin = async () => {
        const data = formik.values;

        await axios('http://localhost:8080/login', data)
            .then(res =>{
                // fake auth
                localStorage.setItem('access_token', res.data.accessToken)
                window.location = "/dashboard"
            })
            .catch(err =>{
                // fake auth
                localStorage.setItem('access_token', 'res.data.accessToken')
                window.location = "/dashboard"
                console.error(err)
            })
    }
    const formik = useFormik({
        initialValues: {
            'email': '',
            'password': ''
        },
        validationSchema: validationSchema,
        onSubmit: () => handleLogin()
    })

    return(
        <div className="login-page">
            <form className="form-container" onSubmit={formik.handleSubmit}>
                <h1 className="title">Login</h1>
                <p className="desc">Welcome to Mydashboard</p>
                {
                    Object.keys(formik.initialValues).map((key,idx) => (
                        <div key={idx} className="row-input">
                            <Input
                                type={key==="password" ? "password" : "text"}
                                id={key}
                                name={key}
                                placeholder={key}
                                value={formik.values[key]}
                                onChange={formik.handleChange}
                                invalid={formik.touched[key] && Boolean (formik.errors[key])}
                            />
                            {
                                formik.touched[key] && Boolean(formik.errors[key]) &&
                                <FormFeedback className="error-feedback">{formik.errors[key]}</FormFeedback>
                            }
                        </div>
                    ))
                }
                <Button className="btn-submit" type="submit">login</Button> 
                <p className="signup">
                    Don't have an account <a href="/register">Signup</a>
                </p>   
            </form>
        </div>
    )
}