import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../api/axios';

export default function ArticleDetail() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        api.get(`articles/${id}/`)
            .then((res) => setArticle(res.data))
            .catch((err) => console.error("Failed to load article", err));
    }, [id]);

    if (!article) return <div className="text-center py-10">Loading...</div>;

    return (
        <>
            <Helmet>
                <title>{article.title} - Article Platform</title>
                <meta name="description" content="Detail of article" />
            </Helmet>
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
                <p className="text-gray-500 mb-6">
                    By {article.author} · {article.category_name} · {new Date(article.created_at).toLocaleDateString()}
                </p>

                {article.image ? (
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-80 object-cover rounded mb-6" />
                ) : (
                    <div className="w-full h-80 bg-gray-200 relative flex items-center justify-center rounded mb-6">
                        <span className="absolute transform -rotate-30 text-gray-600 font-semibold text-3xl opacity-70">
                            No Image
                        </span>
                    </div>
                )}

                <div
                    className="prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.body }}
                ></div>

                <div className="mt-8">
                    <Link to="/articles" className="text-blue-600 hover:underline">
                        ← Back to Articles
                    </Link>
                </div>
            </div>
        </>
    )
}