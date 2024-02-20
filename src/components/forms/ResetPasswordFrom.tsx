'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ResetComponent = () => {
    const initialValues = {
        newPassword: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object({
        newPassword: Yup.string()
            .required('New password is required')
            .min(6, 'Password must be at least 6 characters long'),
        confirmPassword: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
    });

    const handleSubmit = (values: any) => {
        // Handle form submission
    };

    return (
        <div className="flex justify-center items-center">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div>
                        <h1 className="text-2xl font-bold mb-4 justify-center items-center text-center">
                            <div>Reset Password</div>
                        </h1>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="text-gray-700">
                            Enter your new password
                        </label>
                        <Field
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            placeholder="New Password"
                            className="border border-gray-300 rounded-md px-4 py-2 mb-2"
                        />
                        <ErrorMessage
                            name="newPassword"
                            component="div"
                            className="text-red-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="text-gray-700">
                            Confirm password
                        </label>
                        <Field
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="border border-gray-300 rounded-md px-4 py-2 mb-2"
                        />
                        <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="text-red-500"
                        />
                    </div>
                    <div className="flex items-center justify-center text-center">
                        <button
                            className="primary-color hover:bg-orange-700 text-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Reset
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default ResetComponent;
