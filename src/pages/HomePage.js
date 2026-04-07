import React from "react";
import { useNavigate } from "react-router-dom";

const DRAFT_KEY = "caketalk_cake_draft";

export default function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("caketalk_current_user");
    navigate("/");
  };

  const handleStartNew = () => {
    localStorage.removeItem(DRAFT_KEY);
    navigate("/budget");
  };

  const handleViewSaved = () => {
    navigate("/saved");
  };

  return (
    <div className="dashboard-page">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <div className="dashboard-container">
        <div className="dashboard-card new-cake-card">
          <h2 className="dashboard-title">Design a New Cake</h2>
          <p className="dashboard-text">
            Start a new cake and bring your vision to life.
          </p>

          <div className="hero-cake">
            <div className="hero-cake-stand"></div>
            <div className="hero-cake-base"></div>
            <div className="hero-cake-tier bottom-tier"></div>
            <div className="hero-cake-tier top-tier"></div>
            <div className="hero-cake-flower"></div>
          </div>

          <button className="oval-btn" onClick={handleStartNew}>
            Start New
          </button>
        </div>

        <div className="dashboard-card saved-cakes-card">
          <h2 className="dashboard-title">Continue with Saved Cakes</h2>

          <div className="saved-cake-previews">
            <div className="saved-preview">
              <div className="mini-cake mini-cake-one"></div>
            </div>
            <div className="saved-preview">
              <div className="mini-cake mini-cake-two"></div>
            </div>
            <div className="saved-preview">
              <div className="mini-cake mini-cake-three"></div>
            </div>
          </div>

          <button className="oval-btn" onClick={handleViewSaved}>
            View Saved
          </button>
        </div>
      </div>
    </div>
  );
}