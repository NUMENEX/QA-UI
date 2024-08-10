import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackIcon: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <button
            onClick={handleGoBack}
            className="flex items-center space-x-2 text-gray-700 hover:text-purple-700 transition-colors duration-300 mb-4"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                />
            </svg>
            <span className="font-medium">Back</span>
        </button>
    );
};

export default BackIcon;
