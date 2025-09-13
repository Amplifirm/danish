import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import TracksPage from './pages/Tracks';
import AgendaPage from './pages/Agenda';
import SpeakersPage from './pages/Speakers';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import VenuePage from './pages/Venue';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tracks" element={<TracksPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/speakers" element={<SpeakersPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/venue" element={<VenuePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;