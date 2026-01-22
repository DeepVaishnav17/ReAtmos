import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import "./topnav.css";

const TopNav = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // trigger animation after mount
    const timer = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleTrackClick = () => {
    navigate("/track");
  };

  return (
    <div className={`topnav-wrapper ${show ? "show" : ""}`}>
      <div className="topnav">
        {/* Left */}
        <div className="topnav-left">
          <Link to="/dashboard" className="logo-link">
            <span className="logo">
              <span className="logo-icon">♻</span>
              CarbonDetect
            </span>
          </Link>
        </div>

        {/* Center - Navigation */}
        <div className="topnav-center">
          <Link to="/dashboard" className={`nav-item ${isActive("/dashboard") ? "active" : ""}`}>
            Dashboard
          </Link>
         <Link
  to="/maps"
  className={`nav-item ${isActive("/maps") ? "active" : ""}`}
>
  Maps
</Link>
          <Link to="/events" className={`nav-item ${isActive("/events") ? "active" : ""}`}>
            Events
          </Link>
          <a href="#about" className="nav-item">
            Impact
          </a>
        </div>

        {/* Right - Actions */}
        <div className="topnav-right">
          <button className="nav-btn secondary" onClick={handleProfileClick}>
            Profile
          </button>
          <button className="nav-btn secondary logout-btn" onClick={handleLogout}>
            Logout
          </button>
          <button className="nav-btn primary" onClick={handleTrackClick}>
            Track
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
