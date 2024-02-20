'use client';
import React, { useState } from 'react';

const ResetComponent = () => {
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (newPassword === confirmPassword) {
            
        } else {
            
        }
    };

    return (
        <div className="flex justify-center items-center">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                
                    <div><h1 className="text-2xl font-bold mb-4 justify-center items-center text-center"><div>Reset Password</div></h1></div>
                    <label className="text-gray-700 mb-4">Enter your new password</label>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 mb-2"
                    />
                    <label className="text-gray-700 mb-4">Confirm password</label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 mb-2"
                    />
                    <br />                    
                    <div className="flex items-center justify-center text-center">
                        <button
                            className="primary-color hover:bg-orange-700 text-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Reset
                        </button>
                    </div>
                
            </form>
        </div>
    );
};

export default ResetComponent;
