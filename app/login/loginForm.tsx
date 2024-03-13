'use client'
import { useFormik } from 'formik'
import { credentialsValidationSchema } from './credentialsValidationSchema'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [redirect, setRedirect] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        if (email && password) {
            fetch('/api/auth/signin', {
                method: 'POST',
                body: JSON.stringify({ email, password}),
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        setRedirect(json.redirectUrl);
                    }
                    else {
                        setErrorMessage('Incorrect email and/or password');
                        return;
                    }
                });
        }
    }, [email, password])

    useEffect(() => {
        router.push(encodeURI(redirect));
    }, [redirect])

    useEffect(() => {
        console.log(errorMessage);
    }, [errorMessage])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: credentialsValidationSchema,
        onSubmit: values => {
            setEmail(values.email);
            setPassword(values.password);
        },
    })

    return (
        <form onSubmit={formik.handleSubmit}>

            <div>
                <label htmlFor='email'>E-mail</label>
                <input type='email' id='email' {...formik.getFieldProps('email')} />
                {formik.errors.email && formik.touched.email && <div>{formik.errors.email}</div>}
            </div>

            <div>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' {...formik.getFieldProps('password')} />
                {formik.errors.password && formik.touched.password && <div>{formik.errors.password}</div>}
            </div>

            <button type='submit'>Submit</button>
        </form>
    )
}