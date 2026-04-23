// src/components/ProgressBar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const STEPS = [
  { label: "Budget",   path: "/budget"   },
  { label: "Venue",    path: "/venue"    },
  { label: "Flavor",   path: "/flavor"   },
  { label: "Fillings", path: "/fillings" },
  { label: "Design",   path: "/design"   },
  { label: "Submit",   path: "/submit"   },
];

export default function ProgressBar({ currentStep }) {
  const navigate = useNavigate();
  const currentIndex = STEPS.findIndex((s) => s.label === currentStep);

  return (
    <div className="progress-tracker">
      {STEPS.map((step, index) => {
        const isDone    = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isActive  = isDone || isCurrent;
        const handleClick = isDone ? () => navigate(step.path) : undefined;

        return (
          <div className="progress-step" key={step.label}>
            <button
              className={`progress-circle ${isActive ? "active" : ""}`}
              type="button"
              onClick={handleClick}
              style={{ cursor: isDone ? "pointer" : "default" }}
            >
              {isDone ? "✓" : ""}
            </button>
            <span className="progress-label">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}