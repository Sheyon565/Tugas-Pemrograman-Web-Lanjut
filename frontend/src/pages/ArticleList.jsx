import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api/axios';
import { Link } from 'react-router-dom';

function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await api.get('articles/')
                setArticles(response.data)
            } catch (error) {
                console.error(`Error fetching articles:`, error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    if (loading) return <p>Loading...</p>;

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this article?');
        if (!confirmDelete) return;

        try {
            await api.delete(`articles/${id}/`)
            setArticles(prev => prev.filter(article => article.id !== id));
        } catch (error) {
            console.log('Error deleting article:', error);
            alert('Failed to delete article. Please try again');
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Articles</h1>
                <Link to="/dashboard/articles/create" className="btn btn-primary p-2 bg-green-500 hover:bg-green-700 font-bold rounded-md">
                    + New Article
                </Link>
            </div>

            <div className="dark:bg-gray-900 bg-gray-100 rounded-lg shadow">
                <table className="w-full table-auto text-left">
                    <thead className="dark:bg-gray-900 bg-gray-100">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Author</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map(article => (
                            <tr key={article.id} className="border-t">
                                <td className="p-4">{article.title}</td>
                                <td className="p-4">{article.author}</td>
                                <td className="p-4">{article.category_name}</td>
                                <td className="p-4">
                                    <Link to={`/dashboard/articles/${article.id}`} className="text-blue-500 hover:underline mr-2">
                                        View
                                    </Link>
                                    <Link to={`/dashboard/articles/${article.id}/edit`} className="text-yellow-500 hover:underline mr-2">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(article.id)} className="text-red-500 cursor-pointer hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ArticleList;