import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

const venueLabelMap = {
  "banquet-hall": "Banquet Hall",
  outdoors: "Outdoors",
  "country-club": "Country Club"
};

const fillingLabelMap = {
  pudding: "Pudding",
  curd: "Curd",
  jam: "Jam",
  none: "None (defaults to frosting)"
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

export default function SavedCakesPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cake, setCake] = useState(null);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem(SAVED_CAKES_KEY) || "[]");
    const found = existing.find((c) => String(c.id) === String(id));
    setCake(found || null);
  }, [id]);

  const handleBack = () => navigate("/home");

  const handleEdit = () => {
    const draftToLoad = { ...cake, savedCakeId: cake.id };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draftToLoad));
    navigate("/budget");
  };

  const handleDelete = () => {
    const existing = JSON.parse(localStorage.getItem(SAVED_CAKES_KEY) || "[]");
    const updated = existing.filter((c) => String(c.id) !== String(id));
    localStorage.setItem(SAVED_CAKES_KEY, JSON.stringify(updated));
    navigate("/home");
  };

  if (!cake) {
    return (
      <div className="saved-page">
        <div className="saved-page-card">
          <p className="saved-page-text">Cake not found.</p>
          <button className="oval-btn" onClick={handleBack}>Back</button>
        </div>
      </div>
    );
  }

  const img = getCakeImage(cake.selectedDesign, cake.cakeTiers, cake.cakeColors);

  const allFlavors = [
    ...(cake.selectedFlavors || []),
    ...(cake.otherFlavorEnabled && cake.otherFlavorText
      ? [`Other: ${cake.otherFlavorText}`]
      : cake.otherFlavorEnabled ? ["Other"] : [])
  ];

  return (
    <div className="saved-page">
      <div className="saved-page-card saved-detail-card">

        <div className="submit-topbar">
          <button className="back-btn" onClick={handleBack}>Dashboard</button>
        </div>

        <h1 className="saved-page-title">Cake Details</h1>

        <div className="saved-detail-layout">

          <div className="saved-detail-left">
            {img ? (
              <img
                src={img}
                alt={designTitleMap[cake.selectedDesign] || "Cake"}
                className="saved-detail-img"
              />
            ) : (
              <div className="mini-cake mini-cake-one" />
            )}
            <p className="saved-detail-design-label">
              {designTitleMap[cake.selectedDesign] || "Custom Cake"}
            </p>
          </div>

          <div className="saved-detail-right">
            <ul className="saved-detail-list">
              <li><span className="detail-label">Budget</span><span className="detail-value">{cake.budget ? `$${cake.budget}` : "Not set"}</span></li>
              <li><span className="detail-label">Date</span><span className="detail-value">{cake.weddingDate || "Not set"}</span></li>
              <li><span className="detail-label">Venue</span><span className="detail-value">{venueLabelMap[cake.venueType] || "Not selected"}</span></li>
              <li><span className="detail-label">Venue Memo</span><span className="detail-value">{cake.venueMemo || "None"}</span></li>
              <li><span className="detail-label">Flavors</span><span className="detail-value">{allFlavors.length ? allFlavors.join(", ") : "None"}</span></li>
              <li><span className="detail-label">Filling</span><span className="detail-value">{fillingLabelMap[cake.selectedFilling] || "Not selected"}</span></li>
              <li><span className="detail-label">Colors</span><span className="detail-value">{Array.isArray(cake.cakeColors) && cake.cakeColors.length ? cake.cakeColors.join(", ") : "None"}</span></li>
              <li><span className="detail-label">Tiers</span><span className="detail-value">{cake.cakeTiers || "Not set"}</span></li>
              <li><span className="detail-label">Extra Notes</span><span className="detail-value">{cake.extraNotes || "None"}</span></li>
              <li><span className="detail-label">Special Requests</span><span className="detail-value">{cake.specialRequests || "None"}</span></li>
              <li><span className="detail-label">Saved</span><span className="detail-value">{cake.savedAt ? new Date(cake.savedAt).toLocaleString() : "Unknown"}</span></li>
            </ul>

            <div className="saved-detail-actions">
              <button className="next-btn" onClick={handleEdit}>Edit</button>
              <button className="next-btn" onClick={handleDelete}>Delete</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}