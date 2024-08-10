import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionList from './components/QuestionList';
import AnswerList from './components/AnswerList';
import './index.css';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/404NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/miner" element={<QuestionList />} />
        <Route path="/validator" element={<AnswerList />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
