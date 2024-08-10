import { useEffect, useState } from 'react';
import api from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from './LoadingSpinner';
import BackIcon from './BackIcon';

interface AnswerChoices {
    [key: string]: string;
}

export interface Question {
    id: string;
    question: string;
    answer_choices: AnswerChoices;
}

interface Answer {
    question_id: string;
    answer: string;
    supporting_resources: Record<string, any>;
}

const QuestionList = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [supportingResources, setSupportingResources] = useState<Record<string, { resources: Record<string, string>, newKey: string, newValue: string }>>({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchQuestionsData = async () => {
            try {
                const questions = await api.get<Question[]>('questions/');
                setQuestions(questions.data);
            } catch (error) {
                toast.error('Failed to load questions');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestionsData();
    }, []);

    const handleAnswerChange = (questionId: string, answer: string) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleAddResource = (questionId: string) => {
        if (supportingResources[questionId]?.newKey && supportingResources[questionId]?.newValue) {
            setSupportingResources((prevResources) => ({
                ...prevResources,
                [questionId]: {
                    ...prevResources[questionId],
                    resources: {
                        ...prevResources[questionId]?.resources,
                        [prevResources[questionId].newKey]: prevResources[questionId].newValue,
                    },
                    newKey: '',
                    newValue: '',
                },
            }));
        }
    };

    const handleRemoveResource = (questionId: string, resourceKey: string) => {
        setSupportingResources((prevResources) => {
            const { [resourceKey]: removed, ...remainingResources } = prevResources[questionId]?.resources || {};
            return {
                ...prevResources,
                [questionId]: {
                    ...prevResources[questionId],
                    resources: remainingResources,
                },
            };
        });
    };

    const handleNewKeyChange = (questionId: string, key: string) => {
        setSupportingResources((prevResources) => ({
            ...prevResources,
            [questionId]: {
                ...prevResources[questionId],
                newKey: key,
            },
        }));
    };

    const handleNewValueChange = (questionId: string, value: string) => {
        setSupportingResources((prevResources) => ({
            ...prevResources,
            [questionId]: {
                ...prevResources[questionId],
                newValue: value,
            },
        }));
    };

    const handleSubmit = async () => {
        // Validation: Ensure all questions have an answer selected
        for (const question of questions) {
            if (!answers[question.id]) {
                toast.error('All questions must be answered before submitting');
                return;
            }
        }

        setSubmitting(true);
        try {
            let data: Answer[] = [];
            for (const key in answers) {
                data.push({
                    question_id: key,
                    answer: answers[key],
                    supporting_resources: supportingResources[key]?.resources || {},
                });
            }
            await api.post('/answers/', data);
            toast.success('Answers submitted successfully',);
        } catch (error) {
            toast.error('Failed to submit answers');
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
                Questions
            </h1>
            <ul className="space-y-4">
                {questions.map((question) => (
                    <li
                        key={question.id}
                        className="p-4 bg-primary text-gray-900 rounded-lg shadow"
                    >
                        <p className="mb-3">{question.question}</p>
                        <select
                            value={answers[question.id] || ''}
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="" disabled>
                                Select an answer...
                            </option>
                            {Object.values(question.answer_choices).map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>

                        <div className="mt-4">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">
                                Supporting Resources
                            </h2>
                            <div className="space-y-2">
                                {supportingResources[question.id]?.resources && Object.keys(supportingResources[question.id].resources).map((key) => (
                                    <div key={key} className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            value={key}
                                            readOnly
                                            className="w-1/3 p-2 bg-white border-2 border-primary rounded-md shadow focus:outline-none"
                                        />
                                        <input
                                            type="text"
                                            value={supportingResources[question.id].resources[key]}
                                            onChange={(e) => {
                                                setSupportingResources((prevResources) => ({
                                                    ...prevResources,
                                                    [question.id]: {
                                                        ...prevResources[question.id],
                                                        resources: {
                                                            ...prevResources[question.id].resources,
                                                            [key]: e.target.value,
                                                        },
                                                    },
                                                }));
                                            }}
                                            className="w-2/3 p-2 bg-white border-2 border-primary rounded-md shadow focus:outline-none"
                                        />
                                        <button
                                            onClick={() => handleRemoveResource(question.id, key)}
                                            className="px-3 py-1 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
                                        >
                                            -
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={supportingResources[question.id]?.newKey || ''}
                                    onChange={(e) => handleNewKeyChange(question.id, e.target.value)}
                                    placeholder="Key"
                                    className="w-1/3 p-2 bg-white border-2 border-primary rounded-md shadow focus:outline-none"
                                />
                                <input
                                    type="text"
                                    value={supportingResources[question.id]?.newValue || ''}
                                    onChange={(e) => handleNewValueChange(question.id, e.target.value)}
                                    placeholder="Value"
                                    className="w-2/3 p-2 bg-white border-2 border-primary rounded-md shadow focus:outline-none"
                                />
                                <button
                                    onClick={() => handleAddResource(question.id)}
                                    className="px-3 py-1 bg-accent text-white rounded-md shadow hover:bg-primary"
                                >
                                    +
                                </button>
                            </div>
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
                {submitting ? 'Submitting...' : 'Submit Answers'}
            </button>
        </div>
    );
};

export default QuestionList;
