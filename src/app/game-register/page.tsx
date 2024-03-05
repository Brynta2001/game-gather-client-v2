import React from 'react';
import GameRegisterForm from '@/components/forms/GameRegisterForm';

// This component represents the game creation form.
// It renders the GameRegisterForm component.
const Page: React.FC = () => {
    return (
        <div>
            <GameRegisterForm />
        </div>
    );
};

export default Page;