import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

const DRAFT_KEY = "caketalk_cake_draft";

export default function SetBudgetPage() {
  const navigate = useNavigate();
  const [budget, setBudget] = useState(1000);
  const [weddingDate, setWeddingDate] = useState("");
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  useEffect(() => {
    const savedDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");
    const savedBudget = typeof savedDraft.budget === "number" ? savedDraft.budget : 1000;
    const savedDate = savedDraft.weddingDate || "";
    setBudget(savedBudget);
    setWeddingDate(savedDate);
  }, []);

  const saveDraft = (updatedFields) => {
    const existingDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");
    const updatedDraft = { ...existingDraft, budget, weddingDate, ...updatedFields };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(updatedDraft));
  };

  const handleSliderChange = (e) => {
    const value = Number(e.target.value);
    setBudget(value);
    saveDraft({ budget: value });
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setWeddingDate(value);
    saveDraft({ weddingDate: value });
  };

  const handleNext = () => {
    saveDraft({ budget, weddingDate });
    navigate("/venue");
  };

  const handleDashboardConfirm = () => {
    setShowLeaveModal(false);
    navigate("/home");
  };

  const sliderPercent = (budget / 3000) * 100;

  const markers = [
    { label: "$300",    value: 300  },
    { label: "$1,000",  value: 1000 },
    { label: "$1,700",  value: 1700 },
    { label: "$2,500+", value: 2500 },
  ];

  return (
    <div className="budget-page">

      <div className="budget-topbar">
        <button className="back-btn" onClick={() => setShowLeaveModal(true)}>
          Dashboard
        </button>
        <ProgressBar currentStep="Budget" />
      </div>

      <div className="budget-card">

        <div className="budget-header" style={{ marginBottom: "28px" }}>
          <h1 className="budget-title">Set Budget</h1>
          <p className="budget-subtitle">Adjust your budget with flexible options.</p>
        </div>

        <div style={{ position: "relative", marginBottom: "56px", paddingTop: "44px" }}>

          <div
            style={{
              position:      "absolute",
              top:           "0px",
              left:          `calc(${sliderPercent / 100} * (100% - 28px) + 14px)`,
              transform:     "translateX(-50%)",
              background:    "#8b6f58",
              color:         "#fff",
              borderRadius:  "10px",
              padding:       "4px 14px",
              fontSize:      "20px",
              fontFamily:    "Georgia, 'Times New Roman', serif",
              fontWeight:    "600",
              whiteSpace:    "nowrap",
              pointerEvents: "none",
              boxShadow:     "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            ${budget.toLocaleString()}
            <span style={{
              position:    "absolute",
              bottom:      "-6px",
              left:        "50%",
              transform:   "translateX(-50%)",
              width:       0,
              height:      0,
              borderLeft:  "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop:   "6px solid #8b6f58",
              display:     "block",
            }} />
          </div>

          <div className="slider-label-row">
            <span>$0</span>
            <span>$3,000</span>
          </div>

          <input
            type="range"
            min="0"
            max="3000"
            step="50"
            value={budget}
            onChange={handleSliderChange}
            className="budget-slider"
            style={{
              width:      "100%",
              background: `linear-gradient(to right, #8b6f58 0%, #8b6f58 ${sliderPercent}%, #ddd0c4 ${sliderPercent}%, #ddd0c4 100%)`,
            }}
          />

          <div style={{ position: "relative", marginTop: "10px", height: "36px" }}>
            {markers.map(({ label, value }) => {
              const pct = (value / 3000) * 100;
              const pos = `calc(${pct / 100} * (100% - 28px) + 14px)`;
              return (
                <div
                  key={label}
                  style={{
                    position:      "absolute",
                    left:          pos,
                    transform:     "translateX(-50%)",
                    display:       "flex",
                    flexDirection: "column",
                    alignItems:    "center",
                    gap:           "3px",
                  }}
                >
                  <div style={{
                    width:        "2px",
                    height:       "8px",
                    background:   "#b7977b",
                    borderRadius: "1px",
                  }} />
                  <span style={{
                    fontSize:   "14px",
                    color:      "#6b5a4e",
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    whiteSpace: "nowrap",
                  }}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="budget-bottom-section">
          <div className="budget-tips">
            <div className="tip-item">
              <div className="tip-icon">!</div>
              <p>Larger guest counts and more cake tiers usually increase cost.</p>
            </div>
            <div className="tip-item">
              <div className="tip-icon">!</div>
              <p>Intricate decorations, premium flavors, and fillings may require a higher budget.</p>
            </div>
          </div>
          <div className="date-next-section">
            <div className="date-picker-row">
              <label className="date-label">Set Date:</label>
              <input
                type="date"
                value={weddingDate}
                onChange={handleDateChange}
                className="date-input"
              />
            </div>
          </div>
        </div>

        <div className="card-nav-row">
          <button className="secondary-nav-btn" onClick={() => navigate("/home")}>
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