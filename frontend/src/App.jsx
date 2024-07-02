import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import './App.css';
import './index.css';

import Home from "./home/Home"
import VideoHome from "./video/VideoHome";
import NotFound from "./notFound/NotFound";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<VideoHome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  );
}

export default App;
