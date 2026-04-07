import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DRAFT_KEY = "caketalk_cake_draft";

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
    "Flavor & Extras",
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
            const isFlavorExtras = index === 2;
            const isDesign = index === 3;
            const isSubmit = index === 4;

            return (
              <div className="progress-step" key={step}>
                <button
                  className={`progress-circle ${
                    isBudget || isVenue || isFlavorExtras || isDesign || isSubmit
                      ? "active"
                      : ""
                  }`}
                  type="button"
                  onClick={
                    isBudget
                      ? handleGoBudget
                      : isVenue
                      ? handleGoVenue
                      : isFlavorExtras
                      ? handleGoFlavor
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
            <div className={`design-cake-visual submit-preview ${draft.selectedDesign?.split("-")[0] || ""} ${draft.selectedDesign === "garden-cascade" ? "cascade" : ""} ${draft.selectedDesign === "minimal-romance" ? "minimal" : ""} ${draft.selectedDesign === "classic-floral" ? "classic" : ""} ${draft.selectedDesign === "vintage-piped" ? "vintage" : ""} ${draft.selectedDesign === "modern-drip" ? "drip" : ""}`}>
              <div className="design-cake-base"></div>
              <div className="design-cake-stand"></div>
              <div className="design-tier bottom"></div>
              <div className="design-tier middle"></div>
              <div className="design-tier top"></div>

              {draft.selectedDesign === "classic-floral" && (
                <div className="floral-accent classic-flower"></div>
              )}
              {draft.selectedDesign === "vintage-piped" && (
                <div className="piped-accent"></div>
              )}
              {draft.selectedDesign === "garden-cascade" && (
                <div className="cascade-flowers"></div>
              )}
              {draft.selectedDesign === "minimal-romance" && (
                <div className="minimal-flowers"></div>
              )}
              {draft.selectedDesign === "modern-drip" && (
                <div className="drip-lines"></div>
              )}
            </div>

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