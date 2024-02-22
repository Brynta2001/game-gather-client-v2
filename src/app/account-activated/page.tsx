// This file represents the page component for the account activation feature.
// It imports necessary dependencies and components for rendering the page.

'use client'
import React, { Suspense} from 'react';
import ErrorMessage from '@/components/others/ErrorMessage';
import VerifyActivation from '@/components/others/VerifyActivation';

const Page: React.FC = () => {
    // The Suspense component is used to handle loading states and errors during code splitting.
    // It displays an error message if something goes wrong during the rendering process.
    // The fallback prop specifies the component to be rendered while waiting for the main component to load.
    return (
        <Suspense fallback={<ErrorMessage text='Something went wrong. Please wait or try again later.' />}>
            <div>
                <VerifyActivation />
            </div>
        </Suspense>
    );
};

export default Page;