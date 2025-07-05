import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../api/axios';

function LandingPage() {
    const [articles, setArticles] = useState([]);
    const [current, setCurrent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);

    useEffect(() => {
        api.get('articles/')
            .then((res) => {
                const sorted = res.data
                    .filter(a => a.image)
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setArticles(sorted.slice(0, 5));
                setCurrent(1); // or 0 if you want the first slide first
            })
            .catch((err) => console.error("Failed to load articles", err));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % heroArticles.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [articles]);

    const nextSlide = () => {
        setCurrent((current + 1) % heroArticles.length);
    };

    const prevSlide = () => {
        setCurrent((current - 1 + heroArticles.length) % heroArticles.length);
    };

    const heroArticles = articles.slice(0, 3);

    return (
        <>
            <Helmet>
                <title>Home - Article Platform</title>
                <meta name="description" content="Explore the latest articles and share your ideas on our simple, inspiring platform." />
            </Helmet>
            <div className="min-h-screen bg-gray-100 flex flex-col ">
                <div className="relative h-[500px] overflow-hidden">
                    <div
                        className={`flex ${isTransitioning ? 'transition-transform duration-1000 ease-in-out' : ''}`}
                        style={{ transform: `translateX(-${current % heroArticles.length * 100}%)` }}
                    >
                        {heroArticles.map((article, index) => (
                            <div key={index} className="w-full flex-shrink-0 relative">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-[500px] object-cover"
                                />

                                <div className="absolute inset-0 z-10 bg-black/40 flex flex-col justify-center items-start pl-36 pr-10 text-white">
                                    <div className="space-y-4 animate-fade-slide-up">
                                        <h1 className="text-3xl md:text-5xl font-bold max-w-xl">
                                            {article.title}
                                        </h1>
                                        <p className="text-sm md:text-lg max-w-2xl line-clamp-3">
                                            by {article.author} · {article.category_name}
                                        </p>
                                        <Link
                                            to={`/articles/${article.id}`}
                                            className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold inline-block"
                                        >
                                            Read Article →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation buttons */}
                    <div
                        onClick={prevSlide}
                        className="absolute left-0 top-0 bottom-0 w-[12.5%] cursor-pointer z-20"
                    >
                        <div className="absolute top-1/2 left-6 -translate-y-1/2 text-white bg-opacity-60 hover:bg-opacity-100 p-4 rounded-full shadow text-2xl">
                            ❮
                        </div>
                    </div>

                    <div
                        onClick={nextSlide}
                        className="absolute right-0 top-0 bottom-0 w-[12.5%] cursor-pointer z-20"
                    >
                        <div className="absolute top-1/2 right-6 -translate-y-1/2 text-white bg-opacity-60 hover:bg-opacity-100 p-4 rounded-full shadow text-2xl">
                            ❯
                        </div>
                    </div>
                </div>

                <main className="flex-grow container mx-auto px-4 py-20">
                    <div className="flex jutify-between items-center mb-8">
                        <h2 className="text-4xl font-bold mb-4 pr-2">Latest Article</h2>
                        <Link to="/articles"
                            className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition">
                            View All →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Left 2/3 section for articles */}
                        <div className="md:col-span-2 space-y-6">
                            {articles.map(article => (
                                <div key={article.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-800">{article.title}</h3>
                                        <p className="text-sm text-gray-500 mb-2">
                                            by {article.author} · {article.category_name}
                                        </p>
                                        <p className="text-gray-700 line-clamp-3 mb-4">
                                            {article.excerpt || article.content?.slice(0, 150)}
                                        </p>
                                        <Link
                                            to={`/articles/${article.id}`}
                                            className="text-blue-600 hover:underline font-medium"
                                        >
                                            Read more →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right 1/3 section (you can put anything here) */}
                        <div className="space-y-6">
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <h4 className="text-lg font-bold mb-2">Welcome!</h4>
                                <p className="text-gray-600">Write. Share. Inspire. Start sharing your thoughts and creativity with the world.</p>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="bg-white shadow mt-auto py-6">
                    <div className="text-center text-sm text-gray-500">
                        &copy; 2025 Chandra Dvaipayana. All rights reserved.
                    </div>
                </footer>
            </div>
        </>
    )
}

export default LandingPage;