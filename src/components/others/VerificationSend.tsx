import React from 'react';


const VerificationEmailSent = () => {
    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center justify-center h-70">
            <h1 className="text-3xl font-bold mb-4 orange_gradient">Game Gather</h1>
            <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                <image href='/assets/icons/check.svg' height="30" width="30" />
            </svg>
            <p className="text-xl text-center mb-4">Verification email sent</p>
            <p className="text-sm text-center">To complete registration, please check your email</p>
        </div>
    );
};

export default VerificationEmailSent;