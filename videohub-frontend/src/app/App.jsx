import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

import Home from "../home/Home";
import Videos from "../videos/allVideos/Videos";
import CurrentVideo from "../videos/currentVideo/CurrentVideo";
import EditVideo from "../videos/editVideo/EditVideo";
import Login from "../authorization/login/Login";
import Register from "../authorization/register/Register";
import UserDetails from "../users/userDetails/UserDetails";
import VideoSearch from "../search/VideoSearch";
import AdminPanel from "../admin/AdminPanel";
import NotFound from "../components/errors/NotFound";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/video/:id" element={<CurrentVideo />} />
          <Route path="/video/:id/edit" element={<EditVideo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/*" element={<UserDetails />} />
          <Route path="/search/*" element={<VideoSearch />} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;