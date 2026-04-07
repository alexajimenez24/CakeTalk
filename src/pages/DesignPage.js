import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DRAFT_KEY = "caketalk_cake_draft";

const designOptions = [
  {
    id: "classic-floral",
    title: "Classic Floral",
    visual: "classic"
  },
  {
    id: "vintage-piped",
    title: "Vintage Piped",
    visual: "vintage"
  },
  {
    id: "garden-cascade",
    title: "Garden Cascade",
    visual: "cascade"
  },
  {
    id: "minimal-romance",
    title: "Minimal Romance",
    visual: "minimal"
  },
  {
    id: "modern-drip",
    title: "Modern Drip",
    visual: "drip"
  }
];

export default function DesignPage() {
  const navigate = useNavigate();
  const [selectedDesign, setSelectedDesign] = useState("");
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  useEffect(() => {
    const savedDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");

    if (savedDraft.selectedDesign) {
      setSelectedDesign(savedDraft.selectedDesign);
    }
  }, []);

  const saveDraft = (updatedFields) => {
    const existingDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");

    const updatedDraft = {
      ...existingDraft,
      selectedDesign,
      ...updatedFields
    };

    localStorage.setItem(DRAFT_KEY, JSON.stringify(updatedDraft));
  };

  const handleSelectDesign = (designId) => {
    setSelectedDesign(designId);
    saveDraft({ selectedDesign: designId });
  };

  const handleGoBudget = () => {
    saveDraft({ selectedDesign });
    navigate("/budget");
  };

  const handleGoVenue = () => {
    saveDraft({ selectedDesign });
    navigate("/venue");
  };

  const handleGoFlavor = () => {
    saveDraft({ selectedDesign });
    navigate("/flavor");
  };

  const handleNext = () => {
    saveDraft({ selectedDesign });
    navigate("/submit");
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
    <div className="design-page">
      <div className="design-topbar">
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
                    isBudget || isVenue || isFlavorExtras || isDesign
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
                      : isSubmit
                      ? handleNext
                      : undefined
                  }
                >
                  {isDesign ? "✓" : ""}
                </button>
                <span className="progress-label">{step}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="design-card">
        <div className="design-header">
          <h1 className="design-title">Pick Design</h1>
          <p className="design-subtitle">
            Choose one cake style as your inspiration.
          </p>
        </div>

        <div className="design-grid">
          {designOptions.map((design) => {
            const isSelected = selectedDesign === design.id;

            return (
              <button
                key={design.id}
                className={`design-option-card ${isSelected ? "selected" : ""}`}
                onClick={() => handleSelectDesign(design.id)}
                type="button"
              >
                <div className={`design-cake-visual ${design.visual}`}>
                  <div className="design-cake-base"></div>
                  <div className="design-cake-stand"></div>
                  <div className="design-tier bottom"></div>
                  <div className="design-tier middle"></div>
                  <div className="design-tier top"></div>

                  {design.visual === "classic" && <div className="floral-accent classic-flower"></div>}
                  {design.visual === "vintage" && <div className="piped-accent"></div>}
                  {design.visual === "cascade" && <div className="cascade-flowers"></div>}
                  {design.visual === "minimal" && <div className="minimal-flowers"></div>}
                  {design.visual === "drip" && <div className="drip-lines"></div>}
                </div>

                <p className="design-option-title">{design.title}</p>
              </button>
            );
          })}
        </div>

        <div className="card-nav-row">
          <button className="secondary-nav-btn" onClick={handleGoFlavor}>
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