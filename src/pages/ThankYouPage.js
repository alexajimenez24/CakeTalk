import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const DRAFT_KEY = "caketalk_cake_draft";
const SAVED_CAKES_KEY = "caketalk_saved_cakes";

const bakeryPresets = {
  "60617": [
    {
      id: 1,
      name: "Mary's Bakery",
      address: "801 W Cake St",
      cityState: "60617, Chicago IL"
    },
    {
      id: 2,
      name: "Cake Walk",
      address: "792 S Sweet Rd",
      cityState: "60617, Chicago IL"
    },
    {
      id: 3,
      name: "Velvet Crumb Bakery",
      address: "155 Frosting Ave",
      cityState: "60617, Chicago IL"
    }
  ],
  "10001": [
    {
      id: 4,
      name: "Pearl Bakery",
      address: "18 Hudson Lane",
      cityState: "10001, New York NY"
    },
    {
      id: 5,
      name: "Sweet Bloom Cakes",
      address: "240 W 29th St",
      cityState: "10001, New York NY"
    }
  ],
  "90210": [
    {
      id: 6,
      name: "Golden Tier Bakery",
      address: "410 Beverly Dr",
      cityState: "90210, Beverly Hills CA"
    },
    {
      id: 7,
      name: "Ivory Crumb Studio",
      address: "122 Canon Rd",
      cityState: "90210, Beverly Hills CA"
    }
  ],
  default: [
    {
      id: 8,
      name: "Willow Bakery",
      address: "24 Buttercream Blvd",
      cityState: "Your area"
    },
    {
      id: 9,
      name: "Honey & Crumb",
      address: "78 Celebration St",
      cityState: "Your area"
    },
    {
      id: 10,
      name: "The Wedding Cake Room",
      address: "190 Tier Terrace",
      cityState: "Your area"
    }
  ]
};

const designTitleMap = {
  "classic-floral": "Classic Floral",
  "vintage-piped": "Vintage Piped",
  "garden-cascade": "Garden Cascade",
  "minimal-romance": "Minimal Romance",
  "modern-drip": "Modern Drip"
};

export default function ThankYouPage() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState({});
  const [zipCode, setZipCode] = useState("60617");
  const [bakeryResults, setBakeryResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sentInvoices, setSentInvoices] = useState({});
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const savedDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");
    setDraft(savedDraft);

    const initialZip = "60617";
    const initialResults = bakeryPresets[initialZip] || bakeryPresets.default;
    setBakeryResults(initialResults);
  }, []);

  const selectedDesignClasses = useMemo(() => {
    return `design-cake-visual thank-you-preview ${
      draft.selectedDesign?.split("-")[0] || ""
    } ${draft.selectedDesign === "garden-cascade" ? "cascade" : ""} ${
      draft.selectedDesign === "minimal-romance" ? "minimal" : ""
    } ${draft.selectedDesign === "classic-floral" ? "classic" : ""} ${
      draft.selectedDesign === "vintage-piped" ? "vintage" : ""
    } ${draft.selectedDesign === "modern-drip" ? "drip" : ""}`;
  }, [draft.selectedDesign]);

  const handleDashboard = () => {
    navigate("/home");
  };

  const handleDownload = () => {
    const cakeSummary = {
      ...draft,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(cakeSummary, null, 2)], {
      type: "application/json"
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-wedding-cake.json";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSaveToProfile = () => {
    const existingSaved = JSON.parse(localStorage.getItem(SAVED_CAKES_KEY) || "[]");

    if (draft.savedCakeId) {
      const updatedSavedCakes = existingSaved.map((cake) =>
        cake.id === draft.savedCakeId
          ? {
              ...cake,
              ...draft,
              id: draft.savedCakeId,
              title:
                designTitleMap[draft.selectedDesign] || "Custom Wedding Cake",
              savedAt: new Date().toISOString()
            }
          : cake
      );

      localStorage.setItem(SAVED_CAKES_KEY, JSON.stringify(updatedSavedCakes));

      const updatedDraft = {
        ...draft,
        savedCakeId: draft.savedCakeId
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(updatedDraft));
      setDraft(updatedDraft);
      setSaveMessage("Saved changes to your profile.");
      return;
    }

    const newCakeId = Date.now();

    const savedCake = {
      ...draft,
      id: newCakeId,
      savedCakeId: newCakeId,
      title: designTitleMap[draft.selectedDesign] || "Custom Wedding Cake",
      savedAt: new Date().toISOString()
    };

    localStorage.setItem(
      SAVED_CAKES_KEY,
      JSON.stringify([savedCake, ...existingSaved])
    );

    const updatedDraft = {
      ...draft,
      savedCakeId: newCakeId
    };

    localStorage.setItem(DRAFT_KEY, JSON.stringify(updatedDraft));
    setDraft(updatedDraft);
    setSaveMessage("Cake saved to profile.");
  };

  const handleSearchBakery = () => {
    setIsSearching(true);

    setTimeout(() => {
      const trimmedZip = zipCode.trim();
      const results = bakeryPresets[trimmedZip] || bakeryPresets.default;
      setBakeryResults(results);
      setSentInvoices({});
      setIsSearching(false);
    }, 900);
  };

  const handleSendInvoice = (bakeryId) => {
    setTimeout(() => {
      setSentInvoices((prev) => ({
        ...prev,
        [bakeryId]: true
      }));
    }, 500);
  };

  return (
    <div className="thank-you-page">
      <div className="thank-you-topbar">
        <button className="back-btn" onClick={handleDashboard}>
          Dashboard
        </button>
      </div>

      <div className="thank-you-card">
        <div className="thank-you-layout">
          <div className="thank-you-left">
            <div className="thank-you-header">
              <h1 className="thank-you-title">Thank You</h1>
              <p className="thank-you-subtitle">
                Your cake design is ready. You can download it, save it to your
                profile, or send it to a bakery.
              </p>
            </div>

            <div className="thank-you-preview-card">
              <div className={selectedDesignClasses}>
                <div className="design-cake-base"></div>
                <div className="design-cake-stand"></div>
                <div className="design-tier bottom"></div>
                <div className="design-tier middle"></div>
                <div className="design-tier top"></div>

                {draft.selectedDesign === "classic-floral" && (
                  <div className="floral-accent classic-flower"></div>
                )}
                {draft.selectedDesign === "vintage-piped" && (
                  <div className="piped-accent"></div>
                )}
                {draft.selectedDesign === "garden-cascade" && (
                  <div className="cascade-flowers"></div>
                )}
                {draft.selectedDesign === "minimal-romance" && (
                  <div className="minimal-flowers"></div>
                )}
                {draft.selectedDesign === "modern-drip" && (
                  <div className="drip-lines"></div>
                )}
              </div>

              <p className="thank-you-design-label">
                {designTitleMap[draft.selectedDesign] || "Custom Cake Design"}
              </p>
            </div>

            <div className="thank-you-actions">
              <button className="next-btn thank-you-action-btn" onClick={handleDownload}>
                Download
              </button>
              <button
                className="secondary-nav-btn thank-you-action-btn"
                onClick={handleSaveToProfile}
              >
                Save to Profile
              </button>
            </div>

            {saveMessage && <p className="thank-you-save-message">{saveMessage}</p>}
          </div>

          <div className="thank-you-right">
            <div className="bakery-panel">
              <h2 className="summary-title">Select a Bakery</h2>

              <div className="bakery-search-row">
                <label className="bakery-search-label">Zipcode</label>
                <input
                  className="bakery-search-input"
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Enter zipcode"
                />
                <button className="bakery-search-btn" onClick={handleSearchBakery}>
                  {isSearching ? "Refreshing..." : "Search"}
                </button>
              </div>

              <div className="bakery-results">
                {bakeryResults.map((bakery) => {
                  const isSent = sentInvoices[bakery.id];

                  return (
                    <div className="bakery-result-card" key={bakery.id}>
                      <div className="bakery-result-info">
                        <h3 className="bakery-name">{bakery.name}</h3>
                        <p className="bakery-address">{bakery.address}</p>
                        <p className="bakery-address">{bakery.cityState}</p>
                      </div>

                      <button
                        className={`invoice-btn ${isSent ? "sent" : ""}`}
                        onClick={() => handleSendInvoice(bakery.id)}
                        disabled={isSent}
                      >
                        {isSent ? "Sent" : "Send Invoice"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}