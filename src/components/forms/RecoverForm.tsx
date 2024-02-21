'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormTitle from '../others/FormTitle';
import { axiosInstance } from '@/lib/axios-instance';

interface EmailData {    
    email: string;    
}


const PasswordRecoveryForm: React.FC = () => {

    const [buttonState, setButtonState] = React.useState(false);

    const initialValues = {
        email: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required').max(50, 'Email is too long')
    });

    const handleSubmit = async (emailData: EmailData) => {        
        
        try {
            await axiosInstance.post('/password-reset/forgot-password', emailData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).catch((error) => {} );
            setButtonState(true);
            alert('Password recovery email sent, check your email!');            
        } catch (error) {
            console.error(error);
        }
        
        };

        return (
            <div className="flex justify-center items-center">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <FormTitle title="Password Recovery" />
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <Field
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                        <div className="flex justify-center items-center">
                            <button
                                className="primary-color hover:bg-orange-700 text-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                                disabled={buttonState}
                            >
                                Recover Password
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        );
    };

    export default PasswordRecoveryForm;
