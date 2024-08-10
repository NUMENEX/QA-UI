import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-secondary to-accent">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Select Your Role</h1>
            <div className="flex space-x-4">
                <button
                    onClick={() => handleNavigate('/miner')}
                    className="px-6 py-3 bg-accent text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300"
                >
                    Miner
                </button>
                <button
                    onClick={() => handleNavigate('/validator')}
                    className="px-6 py-3 bg-accent text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300"
                >
                    Validator
                </button>
            </div>
        </div>
    );
};

export default HomePage;
