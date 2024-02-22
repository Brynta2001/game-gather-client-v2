import Link from 'next/link';
import React from 'react';
// The AccountActivated component is a presentational component that displays a message to the user
const AccountActivated: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-white py-8">
            <svg width="50" height="50" xmlns="http://www.w3.org/500/svg">
                <image href='/assets/icons/check.svg' height="50" width="50" />
            </svg>
            <h1 className="text-2xl font-bold text-orange-500 mb-2">Account Activated</h1>
            <p className="text-sm mb-4">Thank you for verifying your account.</p>
            <Link href="/auth/signin" className="black_btn">
                Click here to login
            </Link>
        </div>
    );
};

export default AccountActivated;