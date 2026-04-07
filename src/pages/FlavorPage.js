import React, { useEffect, useRef, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const DRAFT_KEY = "caketalk_cake_draft";
const MAX_FLAVORS = 5;
const MAX_COLORS = 3;

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
    label: "None (will default to frosting)",
    defaultText: ""
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

export default function FlavorPage() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [otherChecked, setOtherChecked] = useState(false);
  const [otherFlavorText, setOtherFlavorText] = useState("");
  const [flavorMessage, setFlavorMessage] = useState("");
  
  const [selectedFilling, setSelectedFilling] = useState("");
  const [fillingSpecs, setFillingSpecs] = useState({
    pudding: "default: vanilla pudding",
    curd: "default: lemon curd",
    jam: "default: strawberry jam"
  });
  const [cakeColors, setCakeColors] = useState([]);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [tiers, setTiers] = useState(3);
  const [extraNotes, setExtraNotes] = useState("");
  const [colorMessage, setColorMessage] = useState("");
  
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  useEffect(() => {
    const savedDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");

    // Load flavor data
    if (Array.isArray(savedDraft.selectedFlavors)) {
      setSelectedFlavors(savedDraft.selectedFlavors);
    }
    if (savedDraft.otherFlavorText) {
      setOtherFlavorText(savedDraft.otherFlavorText);
    }
    if (savedDraft.otherFlavorEnabled) {
      setOtherChecked(savedDraft.otherFlavorEnabled);
    }

    // Load fillings data
    if (savedDraft.selectedFilling) {
      setSelectedFilling(savedDraft.selectedFilling);
    }
    if (savedDraft.fillingSpecs) {
      setFillingSpecs(savedDraft.fillingSpecs);
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
      selectedFlavors,
      otherFlavorEnabled: otherChecked,
      otherFlavorText,
      selectedFilling,
      fillingSpecs,
      cakeColors,
      cakeTiers: tiers,
      extraNotes,
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
      setFlavorMessage("");
      saveDraft({ selectedFlavors: updated });
      return;
    }

    if (totalSelectedCount >= MAX_FLAVORS) {
      setFlavorMessage("You can select up to 5 flavors.");
      return;
    }

    const updated = [...selectedFlavors, flavor];
    setSelectedFlavors(updated);
    setFlavorMessage("");
    saveDraft({ selectedFlavors: updated });
  };

  const handleOtherToggle = () => {
    if (otherChecked) {
      setOtherChecked(false);
      setFlavorMessage("");
      saveDraft({
        otherFlavorEnabled: false,
        otherFlavorText
      });
      return;
    }

    if (totalSelectedCount >= MAX_FLAVORS) {
      setFlavorMessage("You can select up to 5 flavors.");
      return;
    }

    setOtherChecked(true);
    setFlavorMessage("");
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
    "Flavor & Extras",
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
            const isFlavorExtras = index === 2;
            const isDesign = index === 3;

            return (
              <div className="progress-step" key={step}>
                <button
                  className={`progress-circle ${
                    isBudget || isVenue || isFlavorExtras ? "active" : ""
                  }`}
                  type="button"
                  onClick={
                    isBudget
                      ? handleGoBudget
                      : isVenue
                      ? handleGoVenue
                      : isDesign
                      ? handleNext
                      : undefined
                  }
                >
                  {isFlavorExtras ? "✓" : ""}
                </button>
                <span className="progress-label">{step}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flavor-card combined-card">
        <div className="flavor-header">
          <h1 className="flavor-title">Choose Flavors & Extras</h1>
          <p className="flavor-subtitle">
            Select up to 5 flavors and customize your cake specifications.
          </p>
        </div>

        <div className="combined-layout">
          {/* LEFT SIDE: MENUS */}
          <div className="combined-left">
            {/* Flavor Section */}
            <div className="flavor-section">
              <div className="flavor-menu-header">Flavors (Choose up to 5)</div>

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

              {flavorMessage && <p className="flavor-message">{flavorMessage}</p>}
            </div>

            {/* Fillings Section */}
            <div className="fillings-section">
              <div className="flavor-menu-header">Fillings (Choose 1)</div>

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
          </div>

          {/* RIGHT SIDE: SPECIFICATIONS */}
          <div className="combined-right">
            <div className="specification-box">
              <h2 className="specification-title">Specifications</h2>

              <div className="specification-field" ref={dropdownRef}>
                <label>Color:</label>

                <button
                  type="button"
                  className="multi-select-dropdown"
                  onClick={() => setShowColorMenu((prev) => !prev)}
                >
                  {cakeColors.length > 0
                    ? cakeColors.join(", ")
                    : "Dropdown menu ▼"}
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