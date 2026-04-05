# CakeTalk – Prototype README

**Course:** CS 422 | **Group:** CakeTalk  
**Project:** Designing the Perfect Wedding Cake, Without the Miscommunication

---

## Overview

CakeTalk is a high fidelity web prototype that walks users through designing a custom wedding cake... covering budget, venue, flavor, fillings, visual design, and bakery selection all in one guided flow.

---

## Group Members

- Ushnah Hussain — uhuss2@uic.edu  
- Areli Celestin — acele2@uic.edu  
- Alexa Jimenez — ajime72@uic.edu  
- Anjali Viswan — avisw2@uic.edu  
- June Hong — hhong43@uic.edu  

## Platform & Requirements

| Detail | Info |
|---|---|
| **File** | `caketalk.html` |
| **Type** | Single-file HTML/CSS/JS (no install needed) |
| **Recommended Browser** | Google Chrome or Microsoft Edge |
| **OS** | Windows or macOS |
| **Dependencies** | None — no npm, no server, no internet required |

---

## How to Run It

### Option A — Just double-click (easiest)
1. Download `caketalk.html`
2. Double-click the file
3. It opens directly in your default browser — you're done!

### Option B — VS Code with Live Server
1. Open VS Code
2. Install the **Live Server** extension (by Ritwick Dey) if you don't have it
3. Open `caketalk.html` in VS Code
4. Right-click anywhere in the file → click **"Open with Live Server"**
5. The prototype opens at `http://127.0.0.1:5500/caketalk.html`

---

## How to Log In

Use any credentials — the login is a prototype (not real authentication):

- **Username:** `sarah@example.com` *(pre-filled)*
- **Password:** `password` *(pre-filled)*

Click **Sign In** to enter the app.

---

## Walkthrough — Core User Flow

Once logged in, follow these steps:

| Step | Screen | What to Do |
|---|---|---|
| 1 | **Dashboard** | Click **"Start New →"** to begin designing a cake |
| 2 | **Set Budget** | Choose a budget range or drag the slider; set your wedding date |
| 3 | **Venue Type** | Select Banquet Hall, Outdoors, or Country Club |
| 4 | **Choose Flavor** | Check up to 5 cake flavors from the grid |
| 5 | **Choose Extras** | Pick a filling (pudding/curd/jam/none); set color, tiers, and notes |
| 6 | **Pick Design** | Select a visual style (Floral Elegance, Drip & Fruit, etc.) |
| 7 | **Review** | Verify your selections and add any final notes |
| 8 | **Confirm** | Click **"Confirm & Submit 🎉"** |
| 9 | **Thank You** | Download your design, save to profile, or send to a nearby bakery |

---

## Other Things You Can Try

- **Saved Cakes** — On the dashboard, click the cake thumbnails or "View Saved →" to see previously saved designs
- **Bakery Search** — On the Thank You screen, enter a zip code and click Search, then hit "Send Invoice" on any bakery
- **Forgot Password** — Click the link on the login screen
- **Back button** — Each step has a back button to go to the previous screen

---

## Shallow Parts (Canned / Not Fully Implemented)

| Feature | Status |
|---|---|
| Login authentication | Accepts any input — no real backend |
| Saved cakes | Static display only, not loaded from a database |
| Bakery search by zip | Always shows the same 3 hardcoded Chicago bakeries |
| "Send Invoice" button | Shows a success message; no email is actually sent |
| "Download" button | Shows a toast notification; no PDF is generated |
| "Save to Profile" button | Shows a toast notification; no data is persisted |
| Budget slider filter | Visual only; does not filter actual options |

---

## File Structure

```
caketalk.html   ← the entire prototype (open this in your browser)
README.md       ← you are here
```

---

> **Note for evaluators:** Do not resize the browser window during testing — the prototype is designed for a standard desktop viewport (~1280px wide). The prototype will remain unchanged after submission until grades are released.
