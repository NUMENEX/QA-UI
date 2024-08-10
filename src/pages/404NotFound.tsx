import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-secondary to-accent">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-6">404</h1>
            <p className="text-xl text-gray-700 mb-8">Page Not Found</p>
            <button
                onClick={handleGoHome}
                className="px-6 py-3 bg-accent text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300"
            >
                Go to Home
            </button>
        </div>
    );
};

export default NotFoundPage;
