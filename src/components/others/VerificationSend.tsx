import React from 'react';

// VerificationEmailSent component displays a message to the user
const VerificationEmailSent = () => {
    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center justify-center h-70">
            <div className='border-b'>
                <h1 className="text-3xl font-bold mb-4 orange_gradient">Game Gather</h1>
            </div>            
            <br />
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <image href='/assets/icons/check.svg' height="20" width="20" />
            </svg>
            <br />
            <p className="text-xl text-center mb-4">Verification email sent</p>
            <p className="text-sm text-center">To complete registration, please check your email</p>
        </div>
    );
};

export default VerificationEmailSent;