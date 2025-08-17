
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import App1 from './pages/Home';
import Second from './pages/second';
import Third from './pages/third';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<App1 />} />
          <Route path="/first" element={<App1 />} />
          <Route path="/second" element={<Second />} />
          <Route path="/third" element={<Third />} />
          

          {/* <Route path="/signup" element={<SignupPage />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;