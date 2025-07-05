import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import api from '../api/axios';

function ArticleEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [body, setBody] = useState('');
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await api.get(`/articles/${id}/`);
                setTitle(response.data.title);
                setCategory(response.data.category);
                setBody(response.data.body);
                setPreview(response.data.image);
            } catch (error) {
                console.error('Failed to fetch article:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchArticles();
    }, [id]);

    useEffect(() => {
        const fetchCatogories = async () => {
            try {
                const response = await api.get(`/categories/`)
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error)
            }
        };
        fetchCatogories()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('body', body);
        if (image) {
            formData.append('image', image)
        }
        try {
            await api.put(`/articles/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Article updated successfully!');
            navigate('/dashboard/articles');
        } catch (error) {
            console.error('Failed to update article:', error);
            alert('Failed to update article');
        }
    }

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <Helmet>
                <title>Edit {title} - Dashboard</title>
            </Helmet>
            <div>
                <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
                <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                    <div>
                        <label htmlFor="title" className="block mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            className="w-full p-2 border rounded dark:bg-gray-900"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required />
                        <label htmlFor="category" className="block mb-1">category</label>
                        <select
                            name="category"
                            id="category"
                            className="w-full p-2 border rounded dark:bg-gray-900"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required>
                            <option value="">Select a category</option>
                            {categories.map((cat) => {
                                return <option key={cat.id} value={cat.id}>{cat.name}</option>
                            })}
                        </select>
                        {preview && (
                            <div className="mb-4">
                                <label htmlFor="preview" className="block mb-1">Current Image</label>
                                <img src={preview} alt="Current Article" className="w-40 h-28 object-cover rounded" />
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="block mb-1">Upload New Image</label>

                            <label htmlFor="image" className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded cursor-pointer hover:bg-blue-700">
                                Choose File
                            </label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setImage(file);
                                    setPreview(URL.createObjectURL(file));
                                }}
                                className="hidden" />
                            {image && <p className="mt-2 text-sm text-gray-500">{image.name}</p>}
                        </div>

                        <label htmlFor="body" className="block mb-1">Body</label>
                        <ReactQuill
                            value={body}
                            onChange={setBody}
                            className="bg-white dark:bg-gray-900"
                            theme="snow" />
                    </div>
                    <button type="submit" className="p-2 btn btn-primary cursor-pointer bg-green-500 dark:bg-green-900 rounded-md hover:bg-green-700 dark:hover:bg-green-500 font-bold">Update Article</button>
                </form>
            </div>
        </>
    )
}

export default ArticleEdit;