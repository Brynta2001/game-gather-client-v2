'use client'
import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
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