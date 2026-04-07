import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DRAFT_KEY = "caketalk_cake_draft";
const SAVED_CAKES_KEY = "caketalk_saved_cakes";

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

export default function SavedCakesPage() {
  const navigate = useNavigate();
  const [savedCakes, setSavedCakes] = useState([]);

  useEffect(() => {
    const existingSavedCakes = JSON.parse(
      localStorage.getItem(SAVED_CAKES_KEY) || "[]"
    );
    setSavedCakes(existingSavedCakes);
  }, []);

  const handleBack = () => {
    navigate("/home");
  };

  const handleEditCake = (cake) => {
    const draftToLoad = {
      ...cake,
      savedCakeId: cake.id
    };

    localStorage.setItem(DRAFT_KEY, JSON.stringify(draftToLoad));
    navigate("/budget");
  };

  const handleDeleteCake = (cakeId) => {
    const updatedCakes = savedCakes.filter((cake) => cake.id !== cakeId);
    localStorage.setItem(SAVED_CAKES_KEY, JSON.stringify(updatedCakes));
    setSavedCakes(updatedCakes);
  };

  return (
    <div className="saved-page">
      <div className="saved-page-card saved-page-card-wide">
        <h1 className="saved-page-title">Saved Cakes</h1>

        {savedCakes.length === 0 ? (
          <>
            <p className="saved-page-text">You have no saved cakes yet.</p>

            <button className="oval-btn" onClick={handleBack}>
              Back
            </button>
          </>
        ) : (
          <>
            <p className="saved-page-text">
              Select a saved cake to continue editing.
            </p>

            <div className="saved-cakes-list">
              {savedCakes.map((cake) => (
                <div className="saved-cake-item" key={cake.id}>
                  <div className="saved-cake-item-main">
                    <h2 className="saved-cake-item-title">
                      {cake.title ||
                        designTitleMap[cake.selectedDesign] ||
                        "Custom Wedding Cake"}
                    </h2>

                    <ul className="saved-cake-meta">
                      <li>
                        <strong>Budget:</strong>{" "}
                        {cake.budget ? `$${cake.budget}` : "Not set"}
                      </li>
                      <li>
                        <strong>Date:</strong>{" "}
                        {cake.weddingDate || "Not set"}
                      </li>
                      <li>
                        <strong>Venue:</strong>{" "}
                        {venueLabelMap[cake.venueType] || "Not selected"}
                      </li>
                      <li>
                        <strong>Flavors:</strong>{" "}
                        {Array.isArray(cake.selectedFlavors) &&
                        cake.selectedFlavors.length
                          ? cake.selectedFlavors.join(", ")
                          : "None selected"}
                      </li>
                      <li>
                        <strong>Design:</strong>{" "}
                        {designTitleMap[cake.selectedDesign] || "Not selected"}
                      </li>
                      <li>
                        <strong>Saved:</strong>{" "}
                        {cake.savedAt
                          ? new Date(cake.savedAt).toLocaleString()
                          : "Unknown"}
                      </li>
                    </ul>
                  </div>

                  <div className="saved-cake-actions">
                    <button
                      className="next-btn saved-cake-edit-btn"
                      onClick={() => handleEditCake(cake)}
                    >
                      Edit
                    </button>

                    <button
                      className="secondary-nav-btn saved-cake-delete-btn"
                      onClick={() => handleDeleteCake(cake.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="oval-btn saved-cakes-back-btn" onClick={handleBack}>
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}