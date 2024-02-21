'use client'
import GameCard from '@/components/games/GameCard';

import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { axiosInstance } from '@/lib/axios-instance';

const Dashboard: React.FC = () => {
    const [games, setGames] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        alert(session);
        if (session && session.user.token){
            const token = session.user.token
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
                try {
                    await axiosInstance.post('/api/games',null,config)
                    .catch((error) => {})
                    .then((response) => {
                        alert(response);
                    });
                    
                } catch (error) {
                    console.error('Error fetching games:', error);
                }
            }
    };

    return (
        <div>
            {games.map((game:any) => (
                <GameCard
                    key={game.id}
                    id={game.id}
                    title={game.title}
                    publisher={game.publisher}
                    releaseYear={game.releaseYear}
                    genres={game.genres}
                    platforms={game.platforms}
                    image={game.image}
                />
            ))}
        </div>
    );
};

export default Dashboard;
