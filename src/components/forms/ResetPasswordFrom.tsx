'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { axiosInstance } from '@/lib/axios-instance';

//Reset password form component
const ResetPasswordForm: React.FC = () =>  {
    
    const searchParams = useSearchParams()
    const initialValues = {
        password: '',
        passwordConfirmation: '',
    };

    const validationSchema = Yup.object({
        password: Yup.string()
            .required('Password is required')
            .min(10, 'Password must be 10 characters long')
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter')
            .matches(/[^\w]/, 'Password requires a symbol'),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
    });
    const router = useRouter();

    if(!searchParams) {
        router.push('/');       
    }

    const handleSubmit = async(values: any) => {
        if (searchParams) {
            const token = searchParams.get('token')                          
            const resetData = { token,...values }
           
                await axiosInstance.post('/password-reset/reset-password', resetData)
                .then(response => {                    
                    if (response.status === 201) {
                        alert('Password reset successful');
                        router.push('/');
                    }                    
                })
                .catch(error => {                    
                    console.log(error);
                    alert('Password reset failed, try again later');
                });
            
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
                    <div>
                        <h1 className="text-2xl font-bold mb-4 justify-center items-center text-center">
                            <div>Reset Password</div>
                        </h1>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="text-gray-700">
                            Enter your new password
                        </label>
                        <Field
                            type="password"
                            id="password"
                            name="password"
                            placeholder="New Password"
                            className="border border-gray-300 rounded-md px-4 py-2 mb-2"
                        />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="passwordConfirmation" className="text-gray-700">
                            Confirm password
                        </label>
                        <Field
                            type="password"
                            id="passwordConfirmation"
                            name="passwordConfirmation"
                            placeholder="Confirm Password"
                            className="border border-gray-300 rounded-md px-4 py-2 mb-2"
                        />
                        <ErrorMessage
                            name="passwordConfirmation"
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

export default ResetPasswordForm;
