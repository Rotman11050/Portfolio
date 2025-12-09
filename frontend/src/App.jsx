import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import HomePage from './components/HomePage'
import Projects from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";
import About from "./components/About";

// Component to handle GitHub Pages 404.html redirect
function RedirectHandler() {
  const location = useLocation();

  useEffect(() => {
    // Handle redirect from 404.html (format: /?/path/to/page)
    if (location.search.startsWith('?/')) {
      const path = location.search.slice(2).split('&')[0].replace(/~and~/g, '&');
      if (path) {
        window.history.replaceState(null, '', `/Portfolio/${path}`);
        window.location.reload();
      }
    }
  }, [location]);

  return null;
}

function App() {
    return (
        <Router basename="/Portfolio">
            <RedirectHandler />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    )
}

export default App;
