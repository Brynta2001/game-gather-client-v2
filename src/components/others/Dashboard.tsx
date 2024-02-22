'use client'
import GameCard from '@/components/games/GameCard';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { axiosInstance } from '@/lib/axios-instance';
import { AxiosResponse } from 'axios';

const Dashboard: React.FC = () => {
    const [games, setGames] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchGames = async () => {
            if (session && session.user.token) {
                const token = session.user.token
                console.log(`Bearer ${token}`)
                await axiosInstance.get('/games',{
                    headers: {
                        'accept': 'application/json', 
                        'Authorization': `Bearer ${token}` }
                }).then((response: AxiosResponse) => {
                    setGames(response.data);
                }).catch((error: any) => {
                    console.log(error);
                });
            }
        };
        if (session?.user.token) fetchGames();
    }, [session]);



    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {games.map((game: any) => (
                <GameCard
                    key={game.id}
                    id={game.id}
                    title={game.title}
                    publisher={game.publisher}
                    releaseYear={game.releaseYear}
                    genres={game.genre} // Use "genre" instead of "genres"
                    platforms={game.platforms}
                    image={game.image}
                />
            ))}
        </div>
    );
};

export default Dashboard;
