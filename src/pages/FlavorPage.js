import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const DRAFT_KEY = "caketalk_cake_draft";
const MAX_FLAVORS = 5;

const flavorOptions = [
  "Chocolate",
  "Vanilla",
  "Red Velvet",
  "Marble",
  "Funfetti",
  "Carrot",
  "German Chocolate",
  "Strawberry",
  "Fruit",
  "Banana",
  "Taro",
  "Lemon",
  "Biscoff",
  "Cinnamon",
  "Coffee"
];

export default function FlavorPage() {
  const navigate = useNavigate();
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [otherChecked, setOtherChecked] = useState(false);
  const [otherFlavorText, setOtherFlavorText] = useState("");
  const [message, setMessage] = useState("");
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  useEffect(() => {
    const savedDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");

    if (Array.isArray(savedDraft.selectedFlavors)) {
      setSelectedFlavors(savedDraft.selectedFlavors);
    }

    if (savedDraft.otherFlavorText) {
      setOtherFlavorText(savedDraft.otherFlavorText);
    }

    if (savedDraft.otherFlavorEnabled) {
      setOtherChecked(savedDraft.otherFlavorEnabled);
    }
  }, []);

  const saveDraft = (updatedFields) => {
    const existingDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");

    const updatedDraft = {
      ...existingDraft,
      selectedFlavors,
      otherFlavorEnabled: otherChecked,
      otherFlavorText,
      ...updatedFields
    };

    localStorage.setItem(DRAFT_KEY, JSON.stringify(updatedDraft));
  };

  const totalSelectedCount = selectedFlavors.length + (otherChecked ? 1 : 0);

  const selectedDisplayList = useMemo(() => {
    const items = [...selectedFlavors];

    if (otherChecked) {
      items.push(otherFlavorText ? `Other: ${otherFlavorText}` : "Other");
    }

    return items.slice(0, MAX_FLAVORS);
  }, [selectedFlavors, otherChecked, otherFlavorText]);

  const handleFlavorToggle = (flavor) => {
    const alreadySelected = selectedFlavors.includes(flavor);

    if (alreadySelected) {
      const updated = selectedFlavors.filter((item) => item !== flavor);
      setSelectedFlavors(updated);
      setMessage("");
      saveDraft({ selectedFlavors: updated });
      return;
    }

    if (totalSelectedCount >= MAX_FLAVORS) {
      setMessage("You can select up to 5 flavors.");
      return;
    }

    const updated = [...selectedFlavors, flavor];
    setSelectedFlavors(updated);
    setMessage("");
    saveDraft({ selectedFlavors: updated });
  };

  const handleOtherToggle = () => {
    if (otherChecked) {
      setOtherChecked(false);
      setMessage("");
      saveDraft({
        otherFlavorEnabled: false,
        otherFlavorText
      });
      return;
    }

    if (totalSelectedCount >= MAX_FLAVORS) {
      setMessage("You can select up to 5 flavors.");
      return;
    }

    setOtherChecked(true);
    setMessage("");
    saveDraft({
      otherFlavorEnabled: true,
      otherFlavorText
    });
  };

  const handleOtherTextChange = (e) => {
    const value = e.target.value;
    setOtherFlavorText(value);
    saveDraft({
      otherFlavorEnabled: otherChecked,
      otherFlavorText: value
    });
  };

  const handleGoBudget = () => {
    saveDraft({
      selectedFlavors,
      otherFlavorEnabled: otherChecked,
      otherFlavorText
    });
    navigate("/budget");
  };

  const handleGoVenue = () => {
    saveDraft({
      selectedFlavors,
      otherFlavorEnabled: otherChecked,
      otherFlavorText
    });
    navigate("/venue");
  };

  const handleGoFillings = () => {
    saveDraft({
      selectedFlavors,
      otherFlavorEnabled: otherChecked,
      otherFlavorText
    });
    navigate("/fillings");
  };

  const handleNext = () => {
    saveDraft({
      selectedFlavors,
      otherFlavorEnabled: otherChecked,
      otherFlavorText
    });
    navigate("/fillings");
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
    <div className="flavor-page">
      <div className="flavor-topbar">
        <button className="back-btn" onClick={() => setShowLeaveModal(true)}>
          Dashboard
        </button>

        <div className="progress-tracker">
          {steps.map((step, index) => {
            const isBudget = index === 0;
            const isVenue = index === 1;
            const isFlavor = index === 2;
            const isFillings = index === 3;

            return (
              <div className="progress-step" key={step}>
                <button
                  className={`progress-circle ${
                    isBudget || isVenue || isFlavor ? "active" : ""
                  }`}
                  type="button"
                  onClick={
                    isBudget
                      ? handleGoBudget
                      : isVenue
                      ? handleGoVenue
                      : isFillings
                      ? handleGoFillings
                      : undefined
                  }
                >
                  {isFlavor ? "✓" : ""}
                </button>
                <span className="progress-label">{step}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flavor-card">
        <div className="flavor-header">
          <h1 className="flavor-title">Choose Flavor</h1>
          <p className="flavor-subtitle">
            Select up to 5 flavors for your cake.
          </p>
        </div>

        <div className="flavor-layout">
          <div className="flavor-menu-box">
            <div className="flavor-menu-header">Flavor Options</div>

            <div className="flavor-grid">
              {flavorOptions.map((flavor) => (
                <label key={flavor} className="flavor-option">
                  <input
                    type="checkbox"
                    checked={selectedFlavors.includes(flavor)}
                    onChange={() => handleFlavorToggle(flavor)}
                  />
                  <span>{flavor}</span>
                </label>
              ))}
            </div>

            <div className="other-flavor-row">
              <label className="flavor-option other-option">
                <input
                  type="checkbox"
                  checked={otherChecked}
                  onChange={handleOtherToggle}
                />
                <span>Other</span>
              </label>

              {otherChecked && (
                <input
                  type="text"
                  className="other-flavor-input"
                  placeholder="Enter another flavor"
                  value={otherFlavorText}
                  onChange={handleOtherTextChange}
                />
              )}
            </div>

            {message && <p className="flavor-message">{message}</p>}
          </div>

          <div className="selected-box">
            <h2 className="selected-title">Selected</h2>

            <ol className="selected-list">
              {[0, 1, 2, 3, 4].map((index) => (
                <li key={index}>
                  {selectedDisplayList[index] ? selectedDisplayList[index] : ""}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="card-nav-row">
          <button className="secondary-nav-btn" onClick={handleGoVenue}>
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