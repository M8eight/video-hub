import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

import Home from "../home/Home"
import Videos from "../videos/Videos";
import NotFound from "../errors/NotFound";
import CurrentVideo from "../videos/currentVideo/CurrentVideo";
import Login from "../authorization/login/Login";
import Register from "../authorization/register/Register";
import UserDetails from "../users/UserDetails";

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;