import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../api/axios';
import { Link } from 'react-router-dom';

function ArticleCategory() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories/');
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch categories', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) return <p>Loading...</p>;

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this category?');
        if (!confirmDelete) return;
        try {
            await api.delete(`categories/${id}/`);
            setCategories(prev => prev.filter(category => category.id !== id));
        } catch (error) {
            console.error('Failed to delete Category', error);
        }
    }

    return (
        <>
            <Helmet>
                <title>Article Category - Dashboard</title>
                <meta name="description" content="List of Article Category" />
            </Helmet>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Articles Category</h1>
                    <Link to="/dashboard/category/create" className="btn btn-primary p-2 bg-green-500 hover:bg-green-700 font-bold rounded-md">
                        + New Category
                    </Link>
                </div>

                <div className="dark:bg-gray-900 bg-gray-100 rounded-lg shadow">
                    <table className="w-full table-auto text-left">
                        <thead className="dark:bg-gray-900 bg-gray-100">
                            <tr>
                                <th className="p-4">Id</th>
                                <th className="p-4">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(category => (
                                <tr key={category.id} className="border-t">
                                    <td className="p-4">{category.id}</td>
                                    <td className="p-4">{category.name}</td>
                                    <td className="p-4">
                                        <Link to={`/dashboard/category/${category.id}/edit`} className="text-yellow-500 hover:underline mr-2">
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(category.id)} className="text-red-500 cursor-pointer hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ArticleCategory;