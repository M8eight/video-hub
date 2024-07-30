import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

import Home from "../home/Home"
import VideoHome from "../videos/VideoHome";
import NotFound from "../errors/NotFound";
import CurrentVideo from "../videos/currentVideo/CurrentVideo";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<VideoHome />} />
          <Route path="/video/*" element={<CurrentVideo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;