import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import Detail from './components/Detail/Detail';
import FormPage from './components/FormPage/FormPage';
import axios from "axios";
import EditActivityForm from "./components/EditActivityForm/EditActivityForm";

axios.defaults.baseURL = 'https://server-countries-4c6z.onrender.com/';



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/:page" element={<HomePage />} />
        <Route path="/home/id/:id" element={<Detail />} />
        <Route path="/form" element={<FormPage />} />
        <Route exact path="/edit-activity/:id" element={<EditActivityForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
