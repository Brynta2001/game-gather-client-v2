import React from 'react';
import { axiosInstance } from '@/lib/axios-instance';
import { useRouter } from 'next/navigation';

const handleDeleteGame = async (gameId: string) => {
  try {
    const response = await axiosInstance.delete(`/games/${gameId}`);

    if (response.status === 200) {
      // Juego eliminado correctamente
      console.log('Game deleted successfully');
      // Puedes realizar alguna acción adicional, como redirigir o actualizar la lista de juegos
    } else {
      console.error('Error deleting game', response.data);
      // Mostrar un mensaje de error en la interfaz de usuario
    }
  } catch (error) {
    console.error('Error deleting game:', error);
    // Mostrar un mensaje de error en la interfaz de usuario
  }
};

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

// GameCard component is used to display game details.
const GameCard: React.FC<GameCardProps> = ({ id, title, publisher, releaseYear, genres, platforms, image }) => {
  const router = useRouter();

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
            <span key={genre} className="mr-2 mb-2 px-2 py-1 bg-gray-200 rounded-full text-gray-800 text-sm">
              {genre}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap mt-2">
          {platforms.map((platform) => (
            <span key={platform} className="mr-2 mb-2 px-2 py-1 bg-gray-200 rounded-full text-gray-800 text-sm">
              {platform}
            </span>
          ))}
        </div>
        <div className="mt-4 flex space-x-4">
          <a href={`/game-edit/${id}`}>
            <button className="bg-red-500 text-white px-4 py-2 rounded">Edit Game</button>
          </a>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDeleteGame(id)}>
            Delete Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;