import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const { pathname } = useLocation();

    const hideNavPath = ['/dashboard'];
    const shouldHide = hideNavPath.some(path => pathname.startsWith(path));

    if (shouldHide) return null;

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-green-600 dark:text-green-400">
                    MyBlog
                </Link>

                <div className="space-x-4">
                    <Link to="/articles" className="hover:underline text-gray-700 dark:text-gray-300">
                        Articles
                    </Link>
                    <Link to="/login" className="hover:underline text-gray-700 dark:text-gray-300">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    )
}