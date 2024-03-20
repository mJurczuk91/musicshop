'use client'
import { Form, Formik } from 'formik'
import { loginValidationSchema } from '../../(lib)/validationSchemas/loginValidationSchema'
import { useRouter } from 'next/navigation'
import TextInput from './textInput'
import { ToastContext } from "@/app/providers/toastProvider"
import { useContext, useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'

export default function LoginForm() {
    const { addToast } = useContext(ToastContext);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');

    return (
        <div className='w-full flex justify-center'>
            <div className='max-w-6xl w-1/4 min-w-fit p-4 shadow-lg my-16 border-darkcyan-500 rounded-md border-2'>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={loginValidationSchema}
                    onSubmit={(values) => {
                        fetch('/api/auth/signin', {
                            method: 'POST',
                            body: JSON.stringify({ ...values }),
                        })
                            .then(res => res.json())
                            .then(json => {
                                if (json.success) {
                                    addToast({
                                        message: 'Login successful',
                                        success: true,
                                    });
                                    router.push(redirect ? 
                                        decodeURI(redirect)
                                        :
                                        '/account'
                                    );
                                }
                                else {
                                    addToast({
                                        message: 'Email and/or password incorrect',
                                        success: false,
                                    })
                                }
                            })
                    }}
                >
                    {(props) => (
                        <Form>
                            <TextInput
                                label='E-mail'
                                name='email'
                                type='email'
                            />
                            <TextInput
                                label='Password'
                                name='password'
                                type='password'
                            />
                            <div className='w-full flex justify-center'>
                                <button
                                    className={`${props.isValid ? `bg-tangerine-400 hover:bg-tangerine-500` : `bg-gray-400 hover:bg-gray-500 disabled`} rounded-md py-2 px-4 ml-2 h-fit font-bold text-white`}
                                    type='submit'>
                                    Log in
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}