'use client'
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import FormTitle from '../others/FormTitle';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/lib/axios-instance';
import { AxiosResponse } from 'axios';

const GameRegisterForm: React.FC = () => {
    const router = useRouter();
    const [imageFile, setImageFile] = useState<File | null>(null);

    const initialValues = {
        title: '',
        publisher: '',
        releaseYear: '',
        description: '',
        genre: [''],
        platforms: [''],
        image: '',
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required').max(100, 'Title is too long'),
        publisher: Yup.string().required('Publisher is required').max(50, 'Publisher is too long'),
        releaseYear: Yup.number().required('Release year is required').positive().integer().max(new Date().getFullYear(), `Release year cannot be in the future`),
        description: Yup.string().required('Description is required').max(1000, 'Description is too long'),
        genre: Yup.array().of(Yup.string().required('Genre is required')).min(1, 'At least one genre is required'),
        platforms: Yup.array().of(Yup.string().required('Platform is required')).min(1, 'At least one platform is required'),
        image: Yup.mixed().required('Image is required'),
    });

    const handleSubmit = async (gameData: any) => {
        const formData = new FormData();
        formData.append('title', gameData.title);
        formData.append('publisher', gameData.publisher);
        formData.append('releaseYear', gameData.releaseYear);
        formData.append('description', gameData.description);
        formData.append('genre', JSON.stringify(gameData.genre));
        formData.append('platforms', JSON.stringify(gameData.platforms));
        formData.append('image', imageFile!);

        const response = await axiosInstance.post('/games', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response: AxiosResponse) => {
            if (response.status === 201) {
                router.push('/success');
            }
        }).catch((error: any) => {
            console.log(error);
            alert('Error registering game');
        });
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setImageFile(event.target.files[0]);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                    <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
                        <FormTitle title="Register Game" />
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
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
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <ErrorMessage name="image" component="div" className="text-red-500" />
                        </div>
                        <div className="flex items-center justify-between text-center">
                            <button
                                className="primary-color hover:bg-orange-700 text-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Register Game
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default GameRegisterForm;