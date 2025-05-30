import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 text-center p-4">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Our Article Portal</h1>
            <p className="text-lg text-gray-700 mb-6">Create and manage articles with ease.</p>

            <div className="flex gap-4">
                <Link to="/login" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Login
                </Link>
                <Link to="/register" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    Register
                </Link>
            </div>
        </div>
    )
}