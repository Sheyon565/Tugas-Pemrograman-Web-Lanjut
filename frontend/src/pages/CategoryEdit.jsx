import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../api/axios';

function CategoryEdit() {
    const { id } = useParams();
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await api.get(`/categories/${id}/`);
                setCategory(response.data.name);
            } catch (error) {
                console.error('Failed to fetch category', error);
            } finally {
                setLoading(false);
            }
        }
        fetchCategory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/categories/${id}/`, { name: category });
            alert('Category updated succsesfully!');
            navigate('/dashboard/category');
        } catch (error) {
            console.error('Failed to update article:', error);
            alert('Failed to update category');
        }
    }

    if (loading) return <p>Loading...</p>

    return (
        <>
            <Helmet>
                <title>Edit {category} - Dashboard</title>
            </Helmet>
            <div>
                <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
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
                    <button type="submit" className="p-2 btn btn-primary cursor-pointer bg-green-500 dark:bg-green-900 rounded-md hover:bg-green-700 dark:hover:bg-green-500 font-bold">Update Category</button>
                </form>
            </div>
        </>
    )
}

export default CategoryEdit;