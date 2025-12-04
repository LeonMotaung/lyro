import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Onboarding from './Onboarding';
import Learn from './Learn';
import FormulaSheet from './FormulaSheet';
import Login from './Login';
import Signup from './Signup';
import AdminDashboard from './AdminDashboard';
import Paper1 from './Paper1';
import Paper2 from './Paper2';
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
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/paper1" element={<Paper1 />} />
        <Route path="/paper2" element={<Paper2 />} />
      </Routes>
    </Router>
  );
}

export default App;
