import { useState, useEffect } from 'react';
import { registerUser } from '../api/auth'
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
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
            await registerUser({ username, password });
            setMessage('Registration successful! you can now login.');
            setUsername('');
            setPassword('');
            navigate('/login');
        } catch (err) {
            setMessage('Registration failed. Try a different username');
        }
    };

    return (
        <section className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md dark:bg-gray-900">
            <h2 className="text-xl font-semibold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full border px-3 py-2 rounded dark:bg-gray-900"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border px-3 py-2 rounded dark:bg-gray-900"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {message && <p className="text-blue-600">{message}</p>}
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
                    Register
                </button>
            </form>
        </section>
    )
}

export default Register;