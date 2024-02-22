import React from 'react';
import PasswordRecoveryForm from '@/components/forms/RecoverForm';

// The Page component renders the PasswordRecoveryForm component
// to display the password recovery form to the user.
const Page: React.FC = () => {
    return (
        <div>
            <PasswordRecoveryForm />
        </div>
    );
};

export default Page;