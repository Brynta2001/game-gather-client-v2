'use client'
import React, { useState } from 'react';
import FormTitle from '../others/FormTitle';

const PasswordRecoveryForm: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add password recovery logic here
        console.log('Email:', email);
    };

    return (
        <div className="flex justify-center items-center">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <FormTitle title="Password Recovery" />
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="flex justify-center items-center">
                    <button
                        className="primary-color hover:bg-orange-700 text-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Recover Password
                    </button>
                </div>
            </form>
        </div>
    );
};



export default PasswordRecoveryForm;