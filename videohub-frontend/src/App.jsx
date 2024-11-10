import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

import Home from "./views/home/Home";
import Videos from "./views/videos/allVideos/Videos";
import CurrentVideo from "./views/videos/currentVideo/CurrentVideo";
import EditVideo from "./views/videos/editVideo/EditVideo";
import Login from "./views/authorization/login/Login";
import Register from "./views/authorization/register/Register";
import UserDetails from "./views/users/userDetails/UserDetails";
import VideoSearch from "./views/search/VideoSearch";
import AdminPanel from "./views/admin/AdminPanel";
import NotFound from "./components/errors/NotFound";
import Favorites from "./views/favorites/Favorites";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/video/:id" element={<CurrentVideo />} />
          <Route path="/video/:id/edit" element={<EditVideo />} />
          <Route path="/search/*" element={<VideoSearch />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/favorites" element={<Favorites />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;