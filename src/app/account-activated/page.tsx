import React, { useEffect } from 'react';
import Dashboard from '@/components/others/Dashboard';
import AccountActivated from '@/components/others/AccountActivated';
import { axiosInstance } from '@/lib/axios-instance';
import { useRouter } from 'next/router'

const Page: React.FC = () => {
    const router = useRouter()
    const { id, code } = router.query
    useEffect(() => {              
        if (id && code) {
            try {           
                axiosInstance.post('/api/auth/activate-account', { id, code })
                .then(response => {                    
                    console.log(response.data);
                })
                .catch(error => {                    
                    console.error(error);
                });
            } catch (error) {
                console.error(error);
            }
        }


    }, [id, code]);

    return (
        <div>
            <AccountActivated />
        </div>
    );
};

export default Page;