import React from 'react';
import PasswordRecoveryForm from '@/components/forms/RecoverForm';
import VerificationEmailSent from '@/components/others/VerificationSend';

const Page: React.FC = () => {
    return (
        <div>
            <VerificationEmailSent />
        </div>
    );
};

export default Page;