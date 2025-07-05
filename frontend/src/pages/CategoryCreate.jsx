import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../api/axios';

function CategoryCreate() {
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/categories/', { name: category });
            alert('Cateogry successfully created');
            navigate('/dashboard/category')
        } catch (error) {
            console.error('error creating Category', error);
            alert('Failed to create Category');
        }
    }

    return (
        <>
            <Helmet>
                <title>Create Category - Dashboard</title>
                <meta name="description" content="Add new category into database" />
            </Helmet>
            <div>
                <h1 className="text-2xl font-bold mb-4">Create New Category</h1>
                <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                    <div>
                        <label htmlFor="name" className="block mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="w-full p-2 border rounded dark:bg-gray-900"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required />
                    </div>
                    <button type="submit" className="p-2 btn btn-primary cursor-pointer bg-green-500 dark:bg-green-900 rounded-md hover:bg-green-700 dark:hover:bg-green-500 font-bold">Create Category</button>
                </form>
            </div>
        </>
    )
}

export default CategoryCreate;