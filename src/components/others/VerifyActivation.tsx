'use client'
import React, { Suspense, useEffect, useState } from 'react';
import AccountActivated from '@/components/others/AccountActivated';
import { axiosInstance } from '@/lib/axios-instance';
import { useSearchParams } from 'next/navigation'
import ErrorMessage from '@/components/others/ErrorMessage';

const VerifyActivation: React.FC = () => {
    const searchParams = useSearchParams()
    const [activated, setActivated] = useState(false);   

    
    useEffect(() => {
        const activateAccount = async () => {
            if (searchParams) {
                const id = searchParams.get('id')
                const code = searchParams.get('code')
                const activationData = { id, code }

                await axiosInstance.post('/auth/activate-account', activationData)
                    .then(response => {
                        console.log(response.data);
                        setActivated(true);
                    })
                    .catch(error => {
                        console.error(error.response.data.message);
                    });

            }
        }
        if (searchParams) activateAccount();

    }, [searchParams]);

    return (        
            <div>
                {activated ? <AccountActivated /> : <ErrorMessage text='Something went wrong. Please wait or try again later.' />}
            </div>
        
    );
};

export default VerifyActivation;