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

        return (
          <div
            className={`progress-step${isDone ? " done" : isCurrent ? " current" : ""}`}
            key={step.label}
          >
            <button
              className={`progress-circle${isDone ? " done" : isCurrent ? " current" : ""}`}
              type="button"
              onClick={isDone ? () => navigate(step.path) : undefined}
              style={{ cursor: isDone ? "pointer" : "default" }}
              title={isDone ? `Go back to ${step.label}` : undefined}
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