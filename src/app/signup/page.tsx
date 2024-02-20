import React from 'react';
import PasswordRecoveryForm from '@/components/forms/RecoverForm';
import VerificationEmailSent from '@/components/others/VerificationSend';
import RegisterForm from '@/components/forms/RegisterForm';

const Page: React.FC = () => {
    return (
        <div>
            <RegisterForm />
        </div>
    );
};

export default Page;