import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DRAFT_KEY = "caketalk_cake_draft";

const venueOptions = [
  {
    id: "banquet-hall",
    title: "Banquet Hall",
    icon: "▭",
    bullets: ["Formal venue", "Indoor setting", "Great for larger receptions"]
  },
  {
    id: "outdoors",
    title: "Outdoors",
    icon: "✿",
    bullets: ["Backyard option", "Garden feel", "Beautiful natural setting"]
  },
  {
    id: "country-club",
    title: "Country Club",
    icon: "⌂",
    bullets: ["Upscale atmosphere", "Private setting", "Polished presentation"]
  }
];

export default function VenuePage() {
  const navigate = useNavigate();
  const [selectedVenue, setSelectedVenue] = useState("");
  const [venueMemo, setVenueMemo] = useState("");
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  useEffect(() => {
    const savedDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");

    if (savedDraft.venueType) {
      setSelectedVenue(savedDraft.venueType);
    }

    if (savedDraft.venueMemo) {
      setVenueMemo(savedDraft.venueMemo);
    }
  }, []);

  const saveDraft = (updatedFields) => {
    const existingDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");

    const updatedDraft = {
      ...existingDraft,
      venueType: selectedVenue,
      venueMemo,
      ...updatedFields
    };

    localStorage.setItem(DRAFT_KEY, JSON.stringify(updatedDraft));
  };

  const handleSelectVenue = (venueId) => {
    setSelectedVenue(venueId);
    saveDraft({ venueType: venueId });
  };

  const handleMemoChange = (e) => {
    const value = e.target.value;
    setVenueMemo(value);
    saveDraft({ venueMemo: value });
  };

  const handleGoBudget = () => {
    saveDraft({ venueType: selectedVenue, venueMemo });
    navigate("/budget");
  };

  const handleGoFlavor = () => {
    saveDraft({ venueType: selectedVenue, venueMemo });
    navigate("/flavor");
  };

  const handleNext = () => {
    saveDraft({ venueType: selectedVenue, venueMemo });
    navigate("/flavor");
  };

  const handleDashboardConfirm = () => {
    setShowLeaveModal(false);
    navigate("/home");
  };

  const steps = [
    "Budget",
    "Venue",
    "Flavor & Extras",
    "Design",
    "Submit"
  ];

  return (
    <div className="venue-page">
      <div className="venue-topbar">
        <button className="back-btn" onClick={() => setShowLeaveModal(true)}>
          Dashboard
        </button>

        <div className="progress-tracker">
          {steps.map((step, index) => {
            const isBudget = index === 0;
            const isVenue = index === 1;
            const isFlavorExtras = index === 2;

            return (
              <div className="progress-step" key={step}>
                <button
                  className={`progress-circle ${isBudget || isVenue ? "active" : ""}`}
                  type="button"
                  onClick={
                    isBudget ? handleGoBudget : isFlavorExtras ? handleGoFlavor : undefined
                  }
                >
                  {isVenue ? "✓" : ""}
                </button>
                <span className="progress-label">{step}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="venue-card">
        <div className="venue-header">
          <h1 className="venue-title">Venue Type</h1>
          <p className="venue-subtitle">
            Pick where your cake will be served.
          </p>
        </div>

        <div className="venue-options-grid">
          {venueOptions.map((venue) => {
            const isSelected = selectedVenue === venue.id;

            return (
              <div
                key={venue.id}
                className={`venue-option-card ${isSelected ? "selected" : ""}`}
              >
                <h2 className="venue-option-title">{venue.title}</h2>

                <div className="venue-icon">{venue.icon}</div>

                <ul className="venue-bullets">
                  {venue.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <button
                  className="select-btn"
                  onClick={() => handleSelectVenue(venue.id)}
                >
                  Select
                </button>

                {isSelected && (
                  <div className="memo-section">
                    <label className="memo-label">Memo...</label>
                    <textarea
                      className="memo-input"
                      placeholder="Add notes about this venue..."
                      value={venueMemo}
                      onChange={handleMemoChange}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="card-nav-row">
          <button className="secondary-nav-btn" onClick={handleGoBudget}>
            Back
          </button>

          <button className="next-btn" onClick={handleNext}>
            Next &gt;
          </button>
        </div>
      </div>

      {showLeaveModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2 className="modal-title">Leave without saving?</h2>
            <p className="modal-text">
              Your current progress may not be fully completed yet.
            </p>
            <div className="modal-actions">
              <button className="secondary-nav-btn" onClick={() => setShowLeaveModal(false)}>
                Continue Editing
              </button>
              <button className="next-btn modal-confirm-btn" onClick={handleDashboardConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}