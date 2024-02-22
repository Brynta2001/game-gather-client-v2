import React, { Suspense } from 'react';
import ResetPasswordForm from '@/components/forms/ResetPasswordFrom';
import ErrorMessage from '@/components/others/ErrorMessage';

const Page: React.FC = () => {
    
    return (
        <div>
            <Suspense fallback={<ErrorMessage text='Something went wrong. Please wait or try again later.' />}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
};

export default Page;