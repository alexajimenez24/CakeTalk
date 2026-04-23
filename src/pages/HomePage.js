import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const DRAFT_KEY = "caketalk_cake_draft";
const SAVED_CAKES_KEY = "caketalk_saved_cakes";

const designStyleMap = {
  "classic-floral": "flower",
  "vintage-piped": "vintage",
  "garden-cascade": "garden",
  "minimal-romance": "romance",
  "modern-drip": "drip"
};

const designTitleMap = {
  "classic-floral": "Classic Floral",
  "vintage-piped": "Vintage Piped",
  "garden-cascade": "Garden Cascade",
  "minimal-romance": "Minimal Romance",
  "modern-drip": "Modern Drip"
};

function getCakeImage(design, tiers, colors) {
  const style = designStyleMap[design];
  const tier = tiers || 3;
  const color = (colors && colors[0]) ? colors[0].toLowerCase() : "white";
  if (!style) return null;
  try {
    return require(`../cake_illustrations/${tier}_${style}_${color}.png`);
  } catch {
    try {
      return require(`../cake_illustrations/3_${style}_white.png`);
    } catch {
      return null;
    }
  }
}

export default function HomePage() {
  const navigate = useNavigate();

  const [savedCakes, setSavedCakes] = useState([]);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem(SAVED_CAKES_KEY) || "[]");
    setSavedCakes(existing);
  }, []);

  const handleSelectCake = (cake) => {
    const draftToLoad = { ...cake, savedCakeId: cake.id };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draftToLoad));
    navigate(`/saved/${cake.id}`);
  };

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
            <img
              src={require("../cake_illustrations/3_flower_white.png")}
              alt="Wedding cake"
              className="hero-cake-img"
            />
          </div>

          <button className="oval-btn" onClick={handleStartNew}>
            Start New
          </button>
        </div>

        <div className="dashboard-card saved-cakes-card">
          <h2 className="dashboard-title">Continue with Saved Cakes</h2>
          
          {savedCakes.length === 0 ? (
            <p className="dashboard-text">No saved cakes yet.</p>
          ) : (
          <div className="saved-cake-previews">
            {savedCakes.map((cake) => {
              const img = getCakeImage(cake.selectedDesign, cake.cakeTiers, cake.cakeColors);
              return (
              <div
              className="saved-preview"
              key={cake.id}
              onClick={() => handleSelectCake(cake)}
              style={{ cursor: "pointer" }}
              >
                {img ? (
                  <img
                    src={img}
                    alt={designTitleMap[cake.selectedDesign] || "Saved cake"}
                    className="mini-cake-img"
                  />
                ) : (
                <div className="mini-cake mini-cake-one" />
                )}
                <p className="mini-cake-label">
                  {designTitleMap[cake.selectedDesign] || "Custom Cake"}
                </p>
              </div>
              );
            })}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}