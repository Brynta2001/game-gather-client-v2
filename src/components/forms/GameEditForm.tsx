'use client'
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import FormTitle from '../others/FormTitle';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/lib/axios-instance';
import { useSession } from 'next-auth/react';
import { AxiosResponse } from 'axios';

interface GameData {
    title: string;
    publisher: string;
    releaseYear: number;
    description: string;
    genre: string[];
    platforms: string[];
    image: string;
}

const GameEditForm: React.FC = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [gameData, setGameData] = useState<GameData | null>(null);

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required').max(100, 'Title is too long'),
        publisher: Yup.string().required('Publisher is required').max(50, 'Publisher is too long'),
        releaseYear: Yup.number().required('Release year is required').positive().integer().max(new Date().getFullYear(), `Release year cannot be in the future`),
        description: Yup.string().required('Description is required').max(1000, 'Description is too long'),
        genre: Yup.array().of(Yup.string().required('Genre is required')).min(1, 'At least one genre is required'),
        platforms: Yup.array().of(Yup.string().required('Platform is required')).min(1, 'At least one platform is required'),
        image: Yup.string().required('Image link is required').url('Please enter a valid image URL'),
    });

    useEffect(() => {
        const fetchGameData = async () => {
            if (session && session.user.token && router.query.id) {
                const gameId = router.query.id;
        
                try {
                    const response = await axiosInstance.get(`/games/${gameId}`, {
                        headers: {
                            'Authorization': `Bearer ${session.user.token}`
                        }
                    });
        
                    if (response.status === 200) {
                        setGameData(response.data);
                    } else {
                        console.error('Error fetching game data', response.data);
                        alert('Error fetching game data');
                    }
                } catch (error) {
                    console.error('Error fetching game data:', error);
                    alert('Error fetching game data');
                }
            }
        };

        if (session?.user.token) fetchGameData();
    }, [session, router.query.id]);

    const handleSubmit = async (gameData: GameData) => {
        if (!session || !session.user.token) {
            console.error('No active session or valid token');
            return;
        }

        const gameId = router.query.id; // Obtener el id del juego desde la URL

        if (typeof gameId === 'string') {
            try {
                const response: AxiosResponse = await axiosInstance.patch(`/games/${gameId}`, gameData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session.user.token}`
                    },
                });

                if (response.status === 200) {
                    router.push('/game-success');
                } else {
                    console.error('Error updating game', response.data);
                    alert('Error updating game');
                }
            } catch (error: any) {
                console.error('Error updating game:', error.response.data);
                alert('Error updating game');
            }
        }
    };

    return (
        <div className="flex justify-center items-center">
            {gameData ? (
                <Formik
                    initialValues={gameData}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values }) => (
                        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
                            <FormTitle title="Edit Game" />
                            <ErrorMessage name="errorMessage" component="div" className="mb-4 text-red-500" />
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                    Title
                                </label>
                                <Field
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="title"
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                />
                                <ErrorMessage name="title" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publisher">
                                    Publisher
                                </label>
                                <Field
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="publisher"
                                    type="text"
                                    name="publisher"
                                    placeholder="Publisher"
                                />
                                <ErrorMessage name="publisher" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="releaseYear">
                                    Release Year
                                </label>
                                <Field
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="releaseYear"
                                    type="number"
                                    name="releaseYear"
                                    placeholder="Release Year"
                                />
                                <ErrorMessage name="releaseYear" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    Description
                                </label>
                                <Field
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="description"
                                    component="textarea"
                                    name="description"
                                    placeholder="Description"
                                    rows={4}
                                />
                                <ErrorMessage name="description" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genre">
                                    Genre
                                </label>
                                <FieldArray name="genre">
                                    {({ insert, remove, push }) => (
                                        <div>
                                            {values.genre.length > 0 &&
                                                values.genre.map((genre, index) => (
                                                    <div key={index} className="flex mb-2">
                                                        <Field
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                            name={`genre.${index}`}
                                                            placeholder="Genre"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                            onClick={() => remove(index)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            <button
                                                type="button"
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => push('')}
                                            >
                                                Add Genre
                                            </button>
                                        </div>
                                    )}
                                </FieldArray>
                                <ErrorMessage name="genre" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="platforms">
                                    Platforms
                                </label>
                                <FieldArray name="platforms">
                                    {({ insert, remove, push }) => (
                                        <div>
                                            {values.platforms.length > 0 &&
                                                values.platforms.map((platform, index) => (
                                                    <div key={index} className="flex mb-2">
                                                        <Field
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                            name={`platforms.${index}`}
                                                            placeholder="Platform"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                            onClick={() => remove(index)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            <button
                                                type="button"
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => push('')}
                                            >
                                                Add Platform
                                            </button>
                                        </div>
                                    )}
                                </FieldArray>
                                <ErrorMessage name="platforms" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                                    Image
                                </label>
                                <Field
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="image"
                                    type="text"
                                    name="image"
                                    placeholder="Insert image URL"
                                />
                                <ErrorMessage name="image" component="div" className="text-red-500" />
                            </div>
                            <div className="flex items-center justify-between text-center">
                                <button
                                    className="primary-color hover:bg-orange-700 text-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Update Game
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default GameEditForm;