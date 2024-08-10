import { useEffect, useState } from 'react';
import api from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from './LoadingSpinner';
import BackIcon from './BackIcon';

interface Resource {
    [key: string]: string;
}

interface Question {
    id: string;
    question: string;
    answer_choices: Record<string, string>;
}

interface Miner {
    user_address: string;
}

interface Answer {
    id: string
    question_id: string;
    answer: string;
    supporting_resources: Resource;
    question: Question;
    miner: Miner;
}

interface AnswerWithScore extends Answer {
    score: number | null; // Allow null initially for validation purposes
}

const AnswerList = () => {
    const [answers, setAnswers] = useState<AnswerWithScore[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const response = await api.get('/answers/');
                const answersWithScore = response.data.map((answer: Answer) => ({
                    ...answer,
                    score: null,
                }));
                setAnswers(answersWithScore);
            } catch (error) {
                setTimeout(() => { toast.error('Failed to load answers'); }, 1);
            } finally {
                setLoading(false);
            }
        };

        fetchAnswers();
    }, []);

    const handleScoreChange = (questionId: string, score: number) => {
        if (score < 0 || score > 1) {
            toast.error('Score must be between 0 and 1');
            return;
        }
        setAnswers((prevAnswers) =>
            prevAnswers.map((answer) =>
                answer.question_id === questionId
                    ? { ...answer, score: score }
                    : answer
            )
        );
    };

    const handleSubmit = async () => {
        // Validation: Ensure all answers are scored
        for (const answer of answers) {
            if (answer.score === null) {
                toast.error('All answers must be scored before submitting');
                return;
            }
        }

        setSubmitting(true);
        try {
            await api.patch('/answers/', answers);
            toast.success('Scores validated successfully');
        } catch (error) {
            toast.error('Failed to validate scores');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="p-6 bg-gradient-to-br from-secondary to-accent rounded-lg shadow-lg max-w-3xl mx-auto">
            <ToastContainer />
            <BackIcon />
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                Answers
            </h1>
            <ul className="space-y-4">
                {answers.map((answer) => (
                    <li
                        key={answer.question_id}
                        className="p-4 bg-primary text-gray-900 rounded-lg shadow"
                    >
                        <p className="mb-2">
                            <strong>Question:</strong> {answer.question.question}
                        </p>
                        <p className="mb-2">
                            <strong>Answer Choices:</strong>
                        </p>
                        <ul className="mb-3 pl-5 list-disc">
                            {Object.values(answer.question.answer_choices).map((choice, index) => (
                                <li key={index}>{choice}</li>
                            ))}
                        </ul>
                        <p className="mb-2">
                            <strong>Answer:</strong> {answer.answer}
                        </p>
                        <p className="mb-3">
                            <strong>Miner:</strong> {answer.miner.user_address}
                        </p>
                        <div className="mb-3">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">
                                Supporting Resources
                            </h2>
                            <ul className="space-y-2">
                                {Object.entries(answer.supporting_resources).map(([key, value]) => (
                                    <li key={key} className="flex items-center space-x-2">
                                        <span className="font-medium">{key}:</span>
                                        {value.startsWith('http') ? (
                                            <a
                                                href={value}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline"
                                            >
                                                {value}
                                            </a>
                                        ) : (
                                            <span>{value}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex items-center space-x-4">
                            <label htmlFor={`score-${answer.question_id}`} className="font-medium">
                                Score:
                            </label>
                            <input
                                type="number"
                                id={`score-${answer.question_id}`}
                                value={answer.score ?? ''}
                                onChange={(e) =>
                                    handleScoreChange(
                                        answer.question_id,
                                        parseFloat(e.target.value)
                                    )
                                }
                                min="0"
                                max="1"
                                step="0.1"
                                className="p-2 w-20 border border-gray-300 rounded-md shadow focus:outline-none"
                            />
                        </div>
                    </li>
                ))}
            </ul>
            <button
                onClick={handleSubmit}
                disabled={submitting}
                className={`mt-6 w-full ${submitting ? 'bg-gray-500' : 'bg-accent'} text-white py-3 rounded-lg shadow-lg transition-colors duration-300 ${submitting ? '' : 'hover:bg-purple-700'
                    }`}
            >
                {submitting ? 'Validating...' : 'Validate'}
            </button>
        </div>
    );
};

export default AnswerList;
