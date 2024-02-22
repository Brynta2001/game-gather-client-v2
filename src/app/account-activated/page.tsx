'use client'
import React, { Suspense} from 'react';
import ErrorMessage from '@/components/others/ErrorMessage';
import VerifyActivation from '@/components/others/VerifyActivation';

const Page: React.FC = () => {
       

    return (
        <Suspense fallback={<ErrorMessage text='Something went wrong. Please wait or try again later.' />}>
            <div>
                <VerifyActivation />
            </div>
        </Suspense>
    );
};

export default Page;