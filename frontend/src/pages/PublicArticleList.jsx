import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../api/axios';

function stripHtml(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
};

export default function PublicArticleList() {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        api.get("articles/")
            .then((res) => {
                setArticles(res.data);
                setFilteredArticles(res.data);
            })
            .catch((err) => console.error("Error loading articles", err))

        api.get("categories/")
            .then((res) => setCategories(res.data))
            .catch((err) => console.error("Error loading categories", err));
    }, []);

    useEffect(() => {
        const filtered = articles.filter((article) => {
            const matchesTitle = article.title.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = selectedCategory ? article.category === parseInt(selectedCategory) : true;
            return matchesTitle && matchesCategory;
        });
        setFilteredArticles(filtered);
    }, [search, selectedCategory, articles])

    return (
        <>
            <Helmet>
                <title>Explore Article</title>
                <meta name="description" content="List of article" />
            </Helmet>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Explore Articles</h1>

                <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
                    <input type="text"
                        placeholder="Search by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded px-4 py-2 w-full sm:w-1/2"
                    />

                    <select name="category" id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border rounded px-4 py-2 w-full sm:w-1/3">
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredArticles.map((article) => (
                        <div key={article.id} className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
                            {article.image ? (
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-48 object-cover" />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 relative flex items-center justify-center">
                                    <span className="absolute transform -rotate-30 text-gray-600 font-semibold text-3xl opacity-70">
                                        No Image
                                    </span>
                                </div>
                            )}
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                                <p className="text-sm text-gray-500 mb-1">
                                    by {article.author} · {article.category_name}
                                </p>
                                <p className="text-gray-700">{article.excerpt}...</p>
                                <Link
                                    to={`/articles/${article.id}`}
                                    className="text-blue-600 hover:underline mt-3 inline-block"
                                >
                                    Read More →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}