# CakeTalk: Prototype README

**Course:** CS 422 **Group:** CakeTalk  
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
| **Dependencies** | None: no npm, no server, no internet required |

---

## Platform & Requirements

- **Tool used to build:** React (JavaScript), written and edited in VS Code
- **Platform:** Runs in a web browser as a React application
- **Browser:** Google Chrome (recommended). Also compatible with Edge and Firefox.
- **Operating System:** Windows or macOS`

## How to Run the Prototype

**Requirements:** Node.js must be installed on your computer. Download it at https://nodejs.org if you do not have it.
1. Download or clone the CakeTalk project folder to your computer
2. Open the project folder in VS Code
3. Open the terminal in VS Code (View, Terminal)
4. Run npm install to install dependencies
5. Run npm start to launch the app
6. The prototype will automatically open in your browser at http://localhost:3000
---

## How to Log In

Use any credentials: the login is a prototype (not real authentication):

- **Username:** `sarah@example.com` *(pre-filled)*
- **Password:** `password` *(pre-filled)*

Click **Sign In** to enter the app.

---

## Walkthrough: Core User Flow

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

- **Saved Cakes** : On the dashboard, click the cake thumbnails or "View Saved →" to see previously saved designs
- **Bakery Search** : On the Thank You screen, enter a zip code and click Search, then hit "Send Invoice" on any bakery
- **Forgot Password** : Click the link on the login screen
- **Back button** : Each step has a back button to go to the previous screen

---

## Shallow Parts (Not Fully Implemented)

| Feature | Status |
|---|---|
| Login authentication | Accepts any input: no real backend |
| Saved cakes | Static display only, not loaded from a database |
| Bakery search by zip | Always shows the same 3 hardcoded Chicago bakeries |
| "Send Invoice" button | Shows a success message; no email is actually sent |
| "Download" button | Shows a toast notification; no PDF is generated |
| "Save to Profile" button | Shows a toast notification; no data is persisted |
| Budget slider filter | Visual only; does not filter actual options |

---

## File Structure

```
CAKETALK/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── AuthCard.js
│   ├── pages/
│   │   ├── AuthPage.js
│   │   ├── DesignPage.js
│   │   ├── FillingsPage.js
│   │   ├── FlavorPage.js
│   │   ├── HomePage.js
│   │   ├── SavedCakesPage.js
│   │   ├── SetBudgetPage.js
│   │   ├── SubmitPage.js
│   │   ├── ThankYouPage.js
│   │   └── VenuePage.js
│   ├── App.js
│   ├── index.js
│   └── styles.css
├── package-lock.json
├── package.json
└── README.md
```
