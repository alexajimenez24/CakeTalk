import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

const DRAFT_KEY = "caketalk_cake_draft";

const fillingOptions = [
  { id: "pudding", label: "Pudding", defaultText: "default: vanilla pudding" },
  { id: "curd",    label: "Curd",    defaultText: "default: lemon curd" },
  { id: "jam",     label: "Jam",     defaultText: "default: strawberry jam" },
  { id: "none",    label: "None",    defaultText: "" },
];

const frostingOptions = [
  { id: "buttercream",    label: "Buttercream",   defaultText: "default: vanilla buttercream" },
  { id: "cream-cheese",  label: "Cream Cheese",  defaultText: "default: classic cream cheese" },
  { id: "whipped-cream", label: "Whipped Cream", defaultText: "default: heavy whipping cream" },
  { id: "fondant",       label: "Fondant",       defaultText: "default: standard fondant" },
];

const colorOptions = ["White", "Ivory", "Blush"];

const radioBtn = (selected) => ({
  width: "16px", height: "16px", minWidth: "16px", borderRadius: "50%",
  border: selected ? "2px solid #2d2d2d" : "2px solid #aaa",
  background: "transparent", cursor: "pointer", padding: "0",
  display: "flex", alignItems: "center", justifyContent: "center",
  flexShrink: 0, outline: "none",
});

const radioDot = {
  width: "7px", height: "7px", borderRadius: "50%",
  background: "#2d2d2d", display: "block", flexShrink: 0,
};

const rowStyle = { display: "flex", alignItems: "center", gap: "10px", padding: "6px 0" };
const labelStyle = { fontSize: "14px", cursor: "default", userSelect: "none" };

export default function FillingsPage() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [selectedFilling,  setSelectedFilling]  = useState("");
  const [fillingSpec,      setFillingSpec]       = useState("");
  const [selectedFrosting, setSelectedFrosting] = useState("");
  const [frostingSpec,     setFrostingSpec]      = useState("");
  const [cakeColor,        setCakeColor]         = useState("");
  const [showColorMenu,    setShowColorMenu]     = useState(false);
  const [tiers,            setTiers]             = useState(3);
  const [extraNotes,       setExtraNotes]        = useState("");
  const [showLeaveModal,   setShowLeaveModal]    = useState(false);

  useEffect(() => {
    const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");
    if (draft.selectedFilling)  setSelectedFilling(draft.selectedFilling);
    if (draft.fillingSpec)      setFillingSpec(draft.fillingSpec);
    if (draft.selectedFrosting) setSelectedFrosting(draft.selectedFrosting);
    if (draft.frostingSpec)     setFrostingSpec(draft.frostingSpec);
    if (draft.cakeColors?.[0]) setCakeColor(draft.cakeColors[0]);
    if (draft.cakeTiers)        setTiers(draft.cakeTiers);
    if (draft.extraNotes)       setExtraNotes(draft.extraNotes);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowColorMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const saveDraft = (overrides = {}) => {
    const existing = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");
    const updated = {
      ...existing, selectedFilling, fillingSpec, selectedFrosting,
      frostingSpec, cakeColors: cakeColor ? [cakeColor] : [], cakeTiers: tiers, extraNotes, ...overrides,
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(updated));
  };

  const handleSelectFilling = (id) => {
    const option  = fillingOptions.find((o) => o.id === id);
    const newVal  = selectedFilling === id ? "" : id;
    const newSpec = newVal ? option.defaultText : "";
    setSelectedFilling(newVal);
    setFillingSpec(newSpec);
    saveDraft({ selectedFilling: newVal, fillingSpec: newSpec });
  };

  const handleSelectFrosting = (id) => {
    const option  = frostingOptions.find((o) => o.id === id);
    const newVal  = selectedFrosting === id ? "" : id;
    const newSpec = newVal ? option.defaultText : "";
    setSelectedFrosting(newVal);
    setFrostingSpec(newSpec);
    saveDraft({ selectedFrosting: newVal, frostingSpec: newSpec });
  };

  const handleColorSelect = (color) => {
    const newVal = cakeColor === color ? "" : color;
    setCakeColor(newVal);
    setShowColorMenu(false);
    saveDraft({ cakeColors: newVal ? [newVal] : [] });
  };

  const incrementTiers = () => {
    const updated = Math.min(3, tiers + 1);
    setTiers(updated);
    saveDraft({ cakeTiers: updated });
  };

  const decrementTiers = () => {
    const updated = Math.max(1, tiers - 1);
    setTiers(updated);
    saveDraft({ cakeTiers: updated });
  };

  const handleDashboardConfirm = () => { setShowLeaveModal(false); navigate("/home"); };

  return (
    <div className="fillings-page">
      <div className="fillings-topbar">
        <button className="back-btn" onClick={() => setShowLeaveModal(true)}>
          Dashboard
        </button>
      </div>

      <div className="fillings-card">
        <ProgressBar currentStep="Fillings" />

        <div className="fillings-header">
          <h1 className="fillings-title">Choose Extras</h1>
          <p className="fillings-subtitle">
            Select one filling and one outer decor option, then adjust the specifications.
          </p>
        </div>

        <div className="fillings-layout">
          <div className="fillings-menu-box" style={{ display: "flex", flexDirection: "column" }}>
            <div className="fillings-menu-header">Inside Filling (Choose 1)</div>
            <div className="fillings-options-list" style={{ flex: 1 }}>
              {fillingOptions.map((option) => (
                <div key={option.id} style={rowStyle}>
                  <button
                    type="button"
                    style={radioBtn(selectedFilling === option.id)}
                    onClick={() => handleSelectFilling(option.id)}
                    aria-label={`Select ${option.label}`}
                  >
                    {selectedFilling === option.id && <span style={radioDot} />}
                  </button>
                  <span style={labelStyle}>{option.label}</span>
                </div>
              ))}
            </div>
            <div className="specify-area">
              <span className="specify-label">Specify: </span>
              <input
                type="text"
                className="specify-input"
                value={fillingSpec}
                placeholder="e.g. vanilla pudding"
                onChange={(e) => { setFillingSpec(e.target.value); saveDraft({ fillingSpec: e.target.value }); }}
              />
            </div>
          </div>

          <div className="fillings-menu-box" style={{ display: "flex", flexDirection: "column" }}>
            <div className="fillings-menu-header">Outer Decor (Choose 1)</div>
            <div className="fillings-options-list" style={{ flex: 1 }}>
              {frostingOptions.map((option) => (
                <div key={option.id} style={rowStyle}>
                  <button
                    type="button"
                    style={radioBtn(selectedFrosting === option.id)}
                    onClick={() => handleSelectFrosting(option.id)}
                    aria-label={`Select ${option.label}`}
                  >
                    {selectedFrosting === option.id && <span style={radioDot} />}
                  </button>
                  <span style={labelStyle}>{option.label}</span>
                </div>
              ))}
            </div>
            <div className="specify-area">
              <span className="specify-label">Specify: </span>
              <input
                type="text"
                className="specify-input"
                value={frostingSpec}
                placeholder="e.g. vanilla buttercream"
                onChange={(e) => { setFrostingSpec(e.target.value); saveDraft({ frostingSpec: e.target.value }); }}
              />
            </div>
          </div>
        </div>

        <div className="specification-box">
          <h2 className="specification-title">Specification</h2>
          <div className="specification-grid">

            <div className="specification-field" ref={dropdownRef}>
              <label>Color:</label>
              <button
                type="button"
                className="multi-select-dropdown"
                onClick={() => setShowColorMenu((prev) => !prev)}
              >
                {cakeColor || "Select a color"}
              </button>
              {showColorMenu && (
                <div className="multi-select-menu">
                  {colorOptions.map((color) => (
                    <div key={color} style={rowStyle}>
                      <button
                        type="button"
                        style={radioBtn(cakeColor === color)}
                        onClick={() => handleColorSelect(color)}
                        aria-label={`Select ${color}`}
                      >
                        {cakeColor === color && <span style={radioDot} />}
                      </button>
                      <span style={labelStyle}>{color}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="specification-field tiers-field">
              <label>Tiers (max 3):</label>
              <div className="tier-stepper">
                <button type="button" className="tier-btn" onClick={decrementTiers}>−</button>
                <input
                  type="number"
                  className="tier-input no-arrows"
                  value={tiers}
                  min="1"
                  max="3"
                  readOnly
                  style={{ MozAppearance: "textfield" }}
                />
                <button type="button" className="tier-btn" onClick={incrementTiers}>+</button>
              </div>
            </div>

            <div className="specification-field notes-field">
              <label>Extra Notes:</label>
              <textarea
                className="extra-notes-input"
                value={extraNotes}
                onChange={(e) => { setExtraNotes(e.target.value); saveDraft({ extraNotes: e.target.value }); }}
                placeholder="Add any extra notes..."
              />
            </div>

          </div>
        </div>

        <div className="card-nav-row">
          <button className="secondary-nav-btn" onClick={() => { saveDraft(); navigate("/flavor"); }}>
            Back
          </button>
          <button className="next-btn" onClick={() => { saveDraft(); navigate("/design"); }}>
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