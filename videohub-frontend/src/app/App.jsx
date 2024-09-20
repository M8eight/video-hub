import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

import Home from "../home/Home"
import Videos from "../videos/Videos";
import NotFound from "../errors/NotFound";
import CurrentVideo from "../videos/currentVideo/CurrentVideo";
import Login from "../authorization/login/Login";
import Register from "../authorization/register/Register";
import UserDetails from "../users/UserDetails";
import VideoSearch from "../search/VideoSearch";
import AdminPanel from "../admin/AdminPanel";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/video/*" element={<CurrentVideo />} />
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