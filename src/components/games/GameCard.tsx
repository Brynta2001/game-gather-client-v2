import React from 'react';

// GameCardProps is an interface for the props of the GameCard component.
interface GameCardProps {
    id: string;
    title: string;
    publisher: string;
    releaseYear: number;
    genres: string[];
    platforms: string[];
    image: string;
}
//  GameCard component is used to display game details.
const GameCard: React.FC<GameCardProps> = ({ id, title, publisher, releaseYear, genres, platforms, image }) => {
    return (
        <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
            
            <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                <image href={image} height="200" width="200" />
            </svg>
            <div className="ml-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-gray-600">{publisher}</p>
                <p className="text-gray-600">{releaseYear}</p>
                <div className="flex flex-wrap mt-2">
                    {genres.map((genre) => (
                        <span
                            key={genre}
                            className="mr-2 mb-2 px-2 py-1 bg-gray-200 rounded-full text-gray-800 text-sm"
                        >
                            {genre}
                        </span>
                    ))}
                </div>
                <div className="flex flex-wrap mt-2">
                    {platforms.map((platform) => (
                        <span
                            key={platform}
                            className="mr-2 mb-2 px-2 py-1 bg-gray-200 rounded-full text-gray-800 text-sm"
                        >
                            {platform}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GameCard;
