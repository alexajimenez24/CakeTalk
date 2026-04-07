import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const DRAFT_KEY = "caketalk_cake_draft";
const MAX_COLORS = 3;

const fillingOptions = [
  {
    id: "pudding",
    label: "Pudding",
    defaultText: "default: vanilla pudding"
  },
  {
    id: "curd",
    label: "Curd",
    defaultText: "default: lemon curd"
  },
  {
    id: "jam",
    label: "Jam",
    defaultText: "default: strawberry jam"
  },
  {
    id: "none",
    label: "None",
    defaultText: ""
  }
];

const frostingOptions = [
  {
    id: "buttercream",
    label: "Buttercream",
    defaultText: "default: vanilla buttercream"
  },
  {
    id: "cream-cheese",
    label: "Cream Cheese",
    defaultText: "default: classic cream cheese"
  },
  {
    id: "whipped-cream",
    label: "Whipped Cream",
    defaultText: "default: heavy whipping cream"
  },
  {
    id: "swiss-meringue",
    label: "Swiss Meringue",
    defaultText: "default: vanilla swiss meringue"
  }
];

const colorOptions = [
  "White",
  "Ivory",
  "Cream",
  "Champagne",
  "Blush",
  "Sage",
  "Dusty Rose",
  "Lavender",
  "Sky Blue",
  "Gold",
  "Silver"
];

export default function FillingsPage() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [selectedFilling, setSelectedFilling] = useState("");
  const [fillingSpecs, setFillingSpecs] = useState({
    pudding: "default: vanilla pudding",
    curd: "default: lemon curd",
    jam: "default: strawberry jam"
  });
  const [selectedFrosting, setSelectedFrosting] = useState("");
  const [frostingSpecs, setFrostingSpecs] = useState({
    buttercream: "default: vanilla buttercream",
    "cream-cheese": "default: classic cream cheese",
    "whipped-cream": "default: heavy whipping cream",
    "swiss-meringue": "default: vanilla swiss meringue"
  });
  const [fondantChecked, setFondantChecked] = useState(false);
  const [cakeColors, setCakeColors] = useState([]);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [tiers, setTiers] = useState(3);
  const [extraNotes, setExtraNotes] = useState("");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [colorMessage, setColorMessage] = useState("");

  useEffect(() => {
    const savedDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");

    if (savedDraft.selectedFilling) {
      setSelectedFilling(savedDraft.selectedFilling);
    }

    if (savedDraft.fillingSpecs) {
      setFillingSpecs(savedDraft.fillingSpecs);
    }

    if (savedDraft.selectedFrosting) {
      setSelectedFrosting(savedDraft.selectedFrosting);
    }

    if (savedDraft.frostingSpecs) {
      setFrostingSpecs(savedDraft.frostingSpecs);
    }

    if (savedDraft.fondantChecked) {
      setFondantChecked(savedDraft.fondantChecked);
    }

    if (Array.isArray(savedDraft.cakeColors)) {
      setCakeColors(savedDraft.cakeColors);
    }

    if (savedDraft.cakeTiers) {
      setTiers(savedDraft.cakeTiers);
    }

    if (savedDraft.extraNotes) {
      setExtraNotes(savedDraft.extraNotes);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowColorMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const saveDraft = (updatedFields) => {
    const existingDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");

    const updatedDraft = {
      ...existingDraft,
      selectedFilling,
      fillingSpecs,
      selectedFrosting,
      frostingSpecs,
      fondantChecked,
      cakeColors,
      cakeTiers: tiers,
      extraNotes,
      ...updatedFields
    };

    localStorage.setItem(DRAFT_KEY, JSON.stringify(updatedDraft));
  };

  const handleSelectFilling = (fillingId) => {
    const newValue = selectedFilling === fillingId ? "" : fillingId;
    setSelectedFilling(newValue);
    saveDraft({ selectedFilling: newValue });
  };

  const handleSpecChange = (id, value) => {
    const updatedSpecs = {
      ...fillingSpecs,
      [id]: value
    };
    setFillingSpecs(updatedSpecs);
    saveDraft({ fillingSpecs: updatedSpecs });
  };

  const handleSelectFrosting = (frostingId) => {
    const newValue = selectedFrosting === frostingId ? "" : frostingId;
    setSelectedFrosting(newValue);
    saveDraft({ selectedFrosting: newValue });
  };

  const handleFrostingSpecChange = (id, value) => {
    const updatedSpecs = {
      ...frostingSpecs,
      [id]: value
    };
    setFrostingSpecs(updatedSpecs);
    saveDraft({ frostingSpecs: updatedSpecs });
  };

  const handleFondantToggle = () => {
    const updated = !fondantChecked;
    setFondantChecked(updated);
    saveDraft({ fondantChecked: updated });
  };

  const handleColorToggle = (color) => {
    const alreadySelected = cakeColors.includes(color);

    if (alreadySelected) {
      const updated = cakeColors.filter((item) => item !== color);
      setCakeColors(updated);
      setColorMessage("");
      saveDraft({ cakeColors: updated });
      return;
    }

    if (cakeColors.length >= MAX_COLORS) {
      setColorMessage("You can select up to 3 colors.");
      return;
    }

    const updated = [...cakeColors, color];
    setCakeColors(updated);
    setColorMessage("");
    saveDraft({ cakeColors: updated });
  };

  const incrementTiers = () => {
    const updated = Math.min(10, tiers + 1);
    setTiers(updated);
    saveDraft({ cakeTiers: updated });
  };

  const decrementTiers = () => {
    const updated = Math.max(1, tiers - 1);
    setTiers(updated);
    saveDraft({ cakeTiers: updated });
  };

  const handleGoBudget = () => {
    saveDraft({});
    navigate("/budget");
  };

  const handleGoVenue = () => {
    saveDraft({});
    navigate("/venue");
  };

  const handleGoFlavor = () => {
    saveDraft({});
    navigate("/flavor");
  };

  const handleNext = () => {
    saveDraft({});
    navigate("/design");
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
    <div className="fillings-page">
      <div className="fillings-topbar">
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

            return (
              <div className="progress-step" key={step}>
                <button
                  className={`progress-circle ${
                    isBudget || isVenue || isFlavor || isFillings ? "active" : ""
                  }`}
                  type="button"
                  onClick={
                    isBudget
                      ? handleGoBudget
                      : isVenue
                      ? handleGoVenue
                      : isFlavor
                      ? handleGoFlavor
                      : isDesign
                      ? handleNext
                      : undefined
                  }
                >
                  {isFillings ? "✓" : ""}
                </button>
                <span className="progress-label">{step}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="fillings-card">
        <div className="fillings-header">
          <h1 className="fillings-title">Choose Extras</h1>
          <p className="fillings-subtitle">
            Select one filling option and customize your cake specifications.
          </p>
        </div>

        <div className="fillings-layout">
          <div className="fillings-left-col">
            <div className="fillings-menu-box">
              <div className="fillings-menu-header">Inside Filling (Choose 1)</div>

              <div className="fillings-options-list">
                {fillingOptions.map((option) => (
                  <div key={option.id} className="filling-row">
                    <label className="filling-option">
                      <input
                        type="checkbox"
                        checked={selectedFilling === option.id}
                        onChange={() => handleSelectFilling(option.id)}
                      />
                      <span>{option.label}</span>
                    </label>

                    {option.id !== "none" && (
                      <div className="specify-row">
                        <span className="specify-label">specify:</span>
                        <input
                          type="text"
                          className="specify-input"
                          value={fillingSpecs[option.id] || ""}
                          onChange={(e) =>
                            handleSpecChange(option.id, e.target.value)
                          }
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="fillings-menu-box">
              <div className="fillings-menu-header">Outer Decor</div>

              <div className="fillings-options-list">
                {frostingOptions.map((option) => (
                  <div key={option.id} className="filling-row">
                    <label className="filling-option">
                      <input
                        type="checkbox"
                        checked={selectedFrosting === option.id}
                        onChange={() => handleSelectFrosting(option.id)}
                      />
                      <span>{option.label}</span>
                    </label>

                    <div className="specify-row">
                      <span className="specify-label">specify:</span>
                      <input
                        type="text"
                        className="specify-input"
                        value={frostingSpecs[option.id] || ""}
                        onChange={(e) =>
                          handleFrostingSpecChange(option.id, e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}

                <div className="filling-row">
                  <label className="filling-option">
                    <input
                      type="checkbox"
                      checked={fondantChecked}
                      onChange={handleFondantToggle}
                    />
                    <span>Fondant</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="specification-box">
            <h2 className="specification-title">Specification</h2>

            <div className="specification-field" ref={dropdownRef}>
              <label>Colors:</label>

              <button
                type="button"
                className="multi-select-dropdown"
                onClick={() => setShowColorMenu((prev) => !prev)}
              >
                {cakeColors.length > 0 ? cakeColors.join(", ") : "Select up to 3 colors"}
              </button>

              {showColorMenu && (
                <div className="multi-select-menu">
                  {colorOptions.map((color) => (
                    <label key={color} className="multi-select-option">
                      <input
                        type="checkbox"
                        checked={cakeColors.includes(color)}
                        onChange={() => handleColorToggle(color)}
                      />
                      <span>{color}</span>
                    </label>
                  ))}
                </div>
              )}

              {colorMessage && <p className="flavor-message">{colorMessage}</p>}
            </div>

            <div className="specification-field tiers-field">
              <label>Tiers:</label>
              <div className="tier-stepper">
                <button type="button" className="tier-btn" onClick={decrementTiers}>
                  −
                </button>
                <input
                  type="number"
                  className="tier-input"
                  value={tiers}
                  min="1"
                  max="10"
                  onChange={(e) => {
                    let value = Number(e.target.value);
                    if (value < 1) value = 1;
                    if (value > 10) value = 10;
                    setTiers(value);
                    saveDraft({ cakeTiers: value });
                  }}
                />
                <button type="button" className="tier-btn" onClick={incrementTiers}>
                  +
                </button>
              </div>
            </div>

            <div className="specification-field notes-field">
              <label>Extra Notes:</label>
              <textarea
                className="extra-notes-input"
                value={extraNotes}
                onChange={(e) => {
                  setExtraNotes(e.target.value);
                  saveDraft({ extraNotes: e.target.value });
                }}
                placeholder="Add any extra notes..."
              />
            </div>
          </div>
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