import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import Detail from './components/Detail/Detail';
import FormPage from './components/FormPage/FormPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/:page" element={<HomePage />} />
        <Route path="/home/id/:id" element={<Detail />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
