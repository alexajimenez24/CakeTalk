import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

const designStyleMap = {
  "classic-floral": "flower",
  "vintage-piped":  "vintage",
  "garden-cascade": "garden",
  "minimal-romance":"romance",
  "modern-drip":    "drip"
};

const DRAFT_KEY = "caketalk_cake_draft";

const designOptions = [
  { id: "classic-floral",  title: "Classic Floral"  },
  { id: "vintage-piped",   title: "Vintage Piped"   },
  { id: "garden-cascade",  title: "Garden Cascade"  },
  { id: "minimal-romance", title: "Minimal Romance" },
  { id: "modern-drip",     title: "Modern Drip"     },
];

export default function DesignPage() {
  const navigate = useNavigate();
  const [selectedDesign, setSelectedDesign] = useState("");
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  useEffect(() => {
    const savedDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");
    if (savedDraft.selectedDesign) setSelectedDesign(savedDraft.selectedDesign);
  }, []);

  const saveDraft = (updatedFields) => {
    const existingDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");
    const updatedDraft = { ...existingDraft, selectedDesign, ...updatedFields };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(updatedDraft));
  };

  const handleSelectDesign = (designId) => {
    setSelectedDesign(designId);
    saveDraft({ selectedDesign: designId });
  };

  const handleNext = () => {
    saveDraft({ selectedDesign });
    navigate("/submit");
  };

  const handleDashboardConfirm = () => {
    setShowLeaveModal(false);
    navigate("/home");
  };

  return (
    <div className="design-page">
      <div className="design-topbar">
        <button className="back-btn" onClick={() => setShowLeaveModal(true)}>
          Dashboard
        </button>
      </div>

      <div className="design-card">
        <ProgressBar currentStep="Design" />

        <div className="design-header">
          <h1 className="design-title">Pick Design</h1>
          <p className="design-subtitle">Choose one cake style as your inspiration.</p>
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
                <img
                  src={require(`../cake_illustrations/3_${designStyleMap[design.id]}_white.png`)}
                  alt={design.title}
                  className="design-cake-img"
                />
                <p className="design-option-title">{design.title}</p>
              </button>
            );
          })}
        </div>

        <div className="card-nav-row">
          <button className="secondary-nav-btn" onClick={() => { saveDraft(); navigate("/fillings"); }}>
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
            <p className="modal-text">Your current progress may not be fully completed yet.</p>
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