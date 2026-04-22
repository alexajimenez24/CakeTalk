import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DRAFT_KEY = "caketalk_cake_draft";

const designStyleMap = {
  "classic-floral": "flower",
  "vintage-piped": "vintage",
  "garden-cascade": "garden",
  "minimal-romance": "romance",
  "modern-drip": "drip"
};

function getCakeImage(design, tiers, colors) {
  const style = designStyleMap[design];
  const tier = tiers || 3;
  const color = (colors && colors[0]) ? colors[0].toLowerCase() : "white";
  if (!style) return null;
  try {
    return require(`../cake_illustrations/${tier}_${style}_${color}.png`);
  } catch {
    return require(`../cake_illustrations/3_${style}_white.png`);
  }
}

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

export default function SubmitPage() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState({});
  const [specialRequests, setSpecialRequests] = useState("");
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  useEffect(() => {
    const savedDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");
    setDraft(savedDraft);
    setSpecialRequests(savedDraft.specialRequests || "");
  }, []);

  const saveDraft = (updatedFields) => {
    const existingDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");
    const updatedDraft = {
      ...existingDraft,
      ...updatedFields
    };

    localStorage.setItem(DRAFT_KEY, JSON.stringify(updatedDraft));
    setDraft(updatedDraft);
  };

  const handleSpecialRequestsChange = (e) => {
    const value = e.target.value;
    setSpecialRequests(value);
    saveDraft({ specialRequests: value });
  };

  const handleGoBudget = () => navigate("/budget");
  const handleGoVenue = () => navigate("/venue");
  const handleGoFlavor = () => navigate("/flavor");
  const handleGoFillings = () => navigate("/fillings");
  const handleGoDesign = () => navigate("/design");

  const handleConfirm = () => {
    navigate("/thank-you");
  };
  const handleDashboardConfirm = () => {
    setShowLeaveModal(false);
    navigate("/home");
  };

  const selectedFlavors = draft.selectedFlavors || [];
  const otherFlavor =
    draft.otherFlavorEnabled && draft.otherFlavorText
      ? `Other: ${draft.otherFlavorText}`
      : draft.otherFlavorEnabled
      ? "Other"
      : null;

  const allFlavors = otherFlavor
    ? [...selectedFlavors, otherFlavor]
    : [...selectedFlavors];

  const fillingSpec =
    draft.selectedFilling &&
    draft.selectedFilling !== "none" &&
    draft.fillingSpecs &&
    draft.fillingSpecs[draft.selectedFilling]
      ? draft.fillingSpecs[draft.selectedFilling]
      : "";

  const designTitleMap = {
    "classic-floral": "Classic Floral",
    "vintage-piped": "Vintage Piped",
    "garden-cascade": "Garden Cascade",
    "minimal-romance": "Minimal Romance",
    "modern-drip": "Modern Drip"
  };

  const steps = [
    "Budget",
    "Venue",
    "Flavor",
    "Fillings",
    "Design",
    "Submit"
  ];

  return (
    <div className="submit-page">
      <div className="submit-topbar">
        <button className="back-btn" onClick={() => setShowLeaveModal(true)}>
          Dashboard
        </button>

        <div className="progress-tracker">
          {steps.map((step, index) => {
            const isBudget = index === 0;
            const isVenue = index === 1;
            const isFlavor = index === 2;
            const isFillings = index === 3;
            const isDesign = index === 4;
            const isSubmit = index === 5;

            return (
              <div className="progress-step" key={step}>
                <button
                  className={`progress-circle ${
                    isBudget || isVenue || isFlavor || isFillings || isDesign || isSubmit
                      ? "active"
                      : ""
                  }`}
                  type="button"
                  onClick={
                    isBudget
                      ? handleGoBudget
                      : isVenue
                      ? handleGoVenue
                      : isFlavor
                      ? handleGoFlavor
                      : isFillings
                      ? handleGoFillings
                      : isDesign
                      ? handleGoDesign
                      : undefined
                  }
                >
                  {isSubmit ? "✓" : ""}
                </button>
                <span className="progress-label">{step}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="submit-card">
        <div className="submit-header">
          <h1 className="submit-title">Review Your Cake</h1>
          <p className="submit-subtitle">
            Review your selections before confirming.
          </p>
        </div>

        <div className="submit-layout">
          <div className="submit-design-preview">
            {(() => {
              const img = getCakeImage(draft.selectedDesign, draft.cakeTiers, draft.cakeColors);
              return img ? (
                <img
                  src={img}
                  alt="Your cake design"
                  className="design-cake-img"
                />
              ) : (
                <p>No design selected</p>
              );
            })()}

            <p className="submit-design-label">
              {designTitleMap[draft.selectedDesign] || "No design selected"}
            </p>
          </div>

          <div className="submit-summary-panel">
            <div className="summary-box">
              <h2 className="summary-title">Cake Summary</h2>

              <ul className="summary-list">
                <li><strong>Budget:</strong> {draft.budget ? `$${draft.budget}` : "Not set"}</li>
                <li><strong>Date:</strong> {draft.weddingDate || "Not set"}</li>
                <li><strong>Venue:</strong> {venueLabelMap[draft.venueType] || "Not selected"}</li>
                <li><strong>Venue Memo:</strong> {draft.venueMemo || "None"}</li>
                <li><strong>Flavors:</strong> {allFlavors.length ? allFlavors.join(", ") : "None selected"}</li>
                <li><strong>Filling:</strong> {fillingLabelMap[draft.selectedFilling] || "Not selected"}</li>
                <li><strong>Filling Spec:</strong> {fillingSpec || "N/A"}</li>
                <li>
                  <strong>Colors:</strong>{" "}
                  {Array.isArray(draft.cakeColors) && draft.cakeColors.length
                    ? draft.cakeColors.join(", ")
                    : "None selected"}
                </li>
                <li><strong>Tiers:</strong> {draft.cakeTiers || "Not set"}</li>
                <li><strong>Extra Notes:</strong> {draft.extraNotes || "None"}</li>
              </ul>
            </div>

            <div className="special-requests-box">
              <label className="special-requests-label">Special Requests</label>
              <textarea
                className="special-requests-input"
                value={specialRequests}
                onChange={handleSpecialRequestsChange}
                placeholder="Add any final requests or notes..."
              />
            </div>
          </div>
        </div>

        <div className="card-nav-row">
          <button className="secondary-nav-btn" onClick={handleGoDesign}>
            Back
          </button>

          <button className="next-btn" onClick={handleConfirm}>
            Confirm &gt;
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
              <button
                className="secondary-nav-btn"
                onClick={() => setShowLeaveModal(false)}
              >
                Continue Editing
              </button>
              <button
                className="next-btn modal-confirm-btn"
                onClick={handleDashboardConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}