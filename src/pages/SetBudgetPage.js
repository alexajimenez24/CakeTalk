import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DRAFT_KEY = "caketalk_cake_draft";

export default function SetBudgetPage() {
  const navigate = useNavigate();
  const [budget, setBudget] = useState(1000);
  const [budgetInput, setBudgetInput] = useState("1000");
  const [weddingDate, setWeddingDate] = useState("");
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  useEffect(() => {
    const savedDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");

    const savedBudget =
      typeof savedDraft.budget === "number" ? savedDraft.budget : 1000;
    const savedDate = savedDraft.weddingDate || "";

    setBudget(savedBudget);
    setBudgetInput(String(savedBudget));
    setWeddingDate(savedDate);
  }, []);

  const saveDraft = (updatedFields) => {
    const existingDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");

    const updatedDraft = {
      ...existingDraft,
      budget,
      weddingDate,
      ...updatedFields
    };

    localStorage.setItem(DRAFT_KEY, JSON.stringify(updatedDraft));
  };

  const handlePresetClick = (value) => {
    setBudget(value);
    setBudgetInput(String(value));
    saveDraft({ budget: value });
  };

  const handleSliderChange = (e) => {
    const value = Number(e.target.value);
    setBudget(value);
    setBudgetInput(String(value));
    saveDraft({ budget: value });
  };

  const handleBudgetInputChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    setBudgetInput(rawValue);

    let numericValue = rawValue === "" ? 0 : Number(rawValue);

    if (numericValue > 3000) numericValue = 3000;
    if (numericValue < 0) numericValue = 0;

    setBudget(numericValue);
    saveDraft({ budget: numericValue });
  };

  const handleBudgetInputBlur = () => {
    let numericValue = Number(budgetInput || 0);

    if (numericValue > 3000) numericValue = 3000;
    if (numericValue < 0) numericValue = 0;

    setBudget(numericValue);
    setBudgetInput(String(numericValue));
    saveDraft({ budget: numericValue });
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

  const handleGoToVenue = () => {
    saveDraft({ budget, weddingDate });
    navigate("/venue");
  };

  const handleDashboardConfirm = () => {
    setShowLeaveModal(false);
    navigate("/home");
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
    <div className="budget-page">
      <div className="budget-topbar">
        <button className="back-btn" onClick={() => setShowLeaveModal(true)}>
          Dashboard
        </button>

        <div className="progress-tracker">
          {steps.map((step, index) => {
            const isBudget = index === 0;
            const isVenue = index === 1;

            return (
              <div className="progress-step" key={step}>
                <button
                  className={`progress-circle ${isBudget ? "active" : ""}`}
                  type="button"
                  onClick={isVenue ? handleGoToVenue : undefined}
                >
                  {isBudget ? "✓" : ""}
                </button>
                <span className="progress-label">{step}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="budget-card">
        <div className="budget-header">
          <div>
            <h1 className="budget-title">Set Budget</h1>
            <p className="budget-subtitle">
              Adjust your budget with flexible options.
            </p>
          </div>

          <div className="budget-display-box">
            <label className="budget-display-label" htmlFor="budgetInput">
              Budget:
            </label>
            <div className="budget-input-wrap">
              <span className="budget-dollar-sign">$</span>
              <input
                id="budgetInput"
                type="text"
                value={budgetInput}
                onChange={handleBudgetInputChange}
                onBlur={handleBudgetInputBlur}
                className="budget-display-input"
              />
            </div>
          </div>
        </div>

        <div className="preset-budget-row">
          <button className="preset-btn" onClick={() => handlePresetClick(300)}>
            {"< \$300"}
          </button>
          <button className="preset-btn" onClick={() => handlePresetClick(1000)}>
            {"≈ \$1000"}
          </button>
          <button className="preset-btn" onClick={() => handlePresetClick(1700)}>
            {"≈ \$1700"}
          </button>
          <button className="preset-btn" onClick={() => handlePresetClick(2500)}>
            {"≈ \$2500+"}
          </button>
        </div>

        <div className="slider-section">
          <div className="slider-label-row">
            <span>\$0</span>
            <span>\$3000</span>
          </div>

          <input
            type="range"
            min="0"
            max="3000"
            step="50"
            value={budget}
            onChange={handleSliderChange}
            className="budget-slider"
          />
        </div>

        <div className="budget-bottom-section">
          <div className="budget-tips">
            <div className="tip-item">
              <div className="tip-icon">!</div>
              <p>
                Larger guest counts and more cake tiers usually increase cost.
              </p>
            </div>

            <div className="tip-item">
              <div className="tip-icon">!</div>
              <p>
                Intricate decorations, premium flavors, and fillings may require
                a higher budget.
              </p>
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