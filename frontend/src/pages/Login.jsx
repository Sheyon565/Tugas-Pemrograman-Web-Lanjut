import { useState, useEffect } from 'react';
import { loginUser } from '../api/auth';
import { Link, useNavigate } from 'react-router-dom'


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access');
        if (token) {
            navigate('/dashboard');
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser({ username, password });
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            setError('');
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <section className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md dark:bg-gray-900">
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text"
                    placeholder="Username"
                    className="w-full border px-3 py-2 rounded dark:bg-gray-900"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />

                <input type="password"
                    placeholder="Password"
                    className="w-full border px-3 py-2 rounded dark:bg-gray-900"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer" >Login</button>
                <p className="text-sm mt-4">
                    Don't have an account? {' '}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Register Here
                    </Link>
                </p>
            </form>
        </section>
    );
}

export default Login;