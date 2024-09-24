import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./home/Home";
import AllVideos from './videos/AllVideos';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/videos" element={<AllVideos />} />
            </Routes>
        </Router>
    )
}