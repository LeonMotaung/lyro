import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Onboarding from './Onboarding';
import Learn from './Learn';
import FormulaSheet from './FormulaSheet';
import Login from './Login';
import Signup from './Signup';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/formula-sheet" element={<FormulaSheet />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Add other routes here, e.g., /learn */}
      </Routes>
    </Router>
  );
}

export default App;
