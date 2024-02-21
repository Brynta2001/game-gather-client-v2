'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormTitle from '../others/FormTitle';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/lib/axios-instance';


const RegisterForm: React.FC = () => {
    const router = useRouter();

    const initialValues = {
        username: '',
        email: '',
        password: '',
        fullName: '',
        role: 'user',        
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required').max(50, 'Username is too long'),
        email: Yup.string().email('Invalid email address').required('Email is required').max(50, 'Email is too long'),
        password: Yup.string().required('Password is required')
        .min(10, 'Password must be 10 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol').max(50, 'Password is too long'),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
        fullName: Yup.string().required('Full Name is required').max(50, 'Full Name is too long'),
    });

    const handleSubmit = async (userData: any) => {
        const { confirmPassword, ...userDataToSent} = userData
        
        try {
            await axiosInstance.post('/auth/signup', userDataToSent, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).catch((error) => {
                alert(error.response.data.message);            
            }).then((response) => {                
                router.push('/success');
            });            
            
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
                    <ErrorMessage name="errorMessage" component="div" className="mb-4 text-red-500" />
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <Field
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Username"
                        />
                        <ErrorMessage name="username" component="div" className="text-red-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <Field
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <Field
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <Field
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                        />
                        <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                            Full Name
                        </label>
                        <Field
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="fullName"
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                        />
                        <ErrorMessage name="fullName" component="div" className="text-red-500" />
                    </div>
                    <div className="flex items-center justify-between text-center">
                        <button
                            className="primary-color hover:bg-orange-700 text-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Register
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default RegisterForm;
