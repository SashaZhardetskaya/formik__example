import React from 'react';
import { withFormik, Form, Field } from 'formik';
import {Link, Redirect, Route, Switch} from "react-router-dom";

import Yup from 'yup';


const renderForm1 = ({
    values,
    touched,
    errors,
    isSubmitting,
    handleSubmit,
}) => (
<div className="content-wrapper" id="content-container">
    <Form onSubmit={handleSubmit}>
    <div>
    {touched.firstName && errors.firstName && <p>{errors.firstName}</p>}
<Field type='text' name='firstName' placeholder='First name'/>
    </div>

    <div>
    {touched.middleName && errors.middleName && <p>{errors.middleName}</p>}
<Field type='text' name='middleName' placeholder='Middle name'/>
    </div>

    <div>
    {touched.email && errors.email && <p>{errors.email}</p>}
<Field type='email' name='email' placeholder='Email'/>
    {/*<input type="email" name='email' placeholder='Email' value={values.email} onChange={handleChange}/>*/}
    </div>
    <div>
    {touched.password && errors.password && <p>{errors.password}</p>}
<Field type='password' name='password' placeholder='Password'/>
    </div>


    <label>
    <Field type='checkbox' name='newsletter' checked={values.newsletter}/>
Join our newsletter
</label>


<Field component='select' name='plan'>
    <option value="free">Free</option>
    <option value="premium">Premium</option>
    </Field>

    <button type="submit" disabled={isSubmitting}>
    Submit
    </button>

    </Form>
    </div>
);

const Form1 = withFormik({
    mapPropsToValues({ firstName, middleName, email, password, newsletter, plan }) {
        return {
            firstName: firstName || '',
            middleName: middleName || '',
            email: email || '',
            password: password || '',
            newsletter: newsletter || false,
            plan: plan || 'free',
        };
    },

    validationSchema: Yup.object().shape({
        firstName: Yup.string().required('Name is required'),
        email: Yup.string().email('Email not valid').required('Email is required'),
        password: Yup.string().min(9, 'Pass mast me 9 characters or longer').required('Password is required'),
    }),

    handleSubmit(values, {resetForm, setErrors, setSubmitting, props}) {
        setTimeout(() => {
            if (values.email === 'test@test.io') {
            setErrors({ email: 'This email is already token' })
        } else {
            props.history.push('/formik2');
        }
    }, 2000)
    }

})(renderForm1);


export default Form1;