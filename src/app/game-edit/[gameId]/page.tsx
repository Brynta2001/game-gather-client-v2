import React from 'react';
import GameEditForm from '@/components/forms/GameEditForm';

// This component represents the game creation form.
// It renders the GameRegisterForm component.

interface PageProps {
    params: {
        gameId: string;
    };

}

const Page: React.FC<PageProps> = ({ params }) => {
    return (
        <div>
            <GameEditForm gameId={params.gameId}/>
        </div>
    );
};

export default Page;