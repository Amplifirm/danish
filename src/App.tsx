import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import InnerCompassDashboard from './pages/Home';


function App() {
  return (
    <Router>
      <div className="App">
       
        <Routes>
          <Route path="/" element={<InnerCompassDashboard />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;