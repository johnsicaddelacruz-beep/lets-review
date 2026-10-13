# LET Reviewer — Philippine Board Exam Prep

A free, offline-capable, installable Progressive Web App (PWA) for reviewing the **Licensure Examination for Professional Teachers (LET)** in the Philippines.

Built by **Sir JC Dela Cruz** for future Filipino teachers. No ads. No tracking. No subscriptions. 100% offline-ready.

---

## Key Highlights

- **8 Interactive Study Modes**:
  - **Relax Mode**:
    - **Flashcards**: Interactive 3D flip cards with Leitner recall ratings.
    - **Practice Test**: Official PRC-style multiple choice (A/B/C/D) with instant rationalizations.
    - **Cheat Sheet**: Searchable 2-column reference table with Web Speech text-to-speech audio reader.
    - **Mnemonics**: Visual acronym shortcuts, phrase formulas, and active recall test cards.
  - **Challenge Mode**:
    - **Fact or Bluff**: Rapid binary quiz to train discernment against deceptive distractors.
    - **Rapid-Fire**: Speed sprint with live countdown timer and streak multipliers.
    - **Mix & Match**: Interactive Column A (terms) vs Column B (definitions) paired in sets of 5.
    - **Complete Word**: Masked keyword puzzle from definition clues with letter hints.
- **3 Official Subject Categories & Difficulty Tiers**:
  - **General Education (Easy)**: Rizal Law (RA 1425), history, and civic statutes (30 items).
  - **Professional Education (Medium)**: Teaching Profession, philosophical heritage, and theorists (39 items).
  - **Majorship English (Advanced)**: Structure of English, basic sentence patterns, and syntax (41 items).
- **Offline First**: Works anywhere in the Philippines without internet after initial load.
- **Installable PWA**: Add to Home Screen on Android (Chrome) and iPhone/iPad (Safari).
- **Privacy First**: All quiz scores, bookmarks, and progress saved locally on device.

---

## Repository Tree

```
lets-review/
│
├── index.html                         <- SPA entry point
├── 404.html                           <- Fallback for broken URLs
├── manifest.json                      <- PWA configuration
├── service-worker.js                  <- Offline caching engine
├── VERSION.json                       <- Version tracker
├── topics.json                        <- Content registry
├── README.md                          <- Documentation
│
├── data/
│   ├── gened/rizal/rizal_law/
│   │   └── rizal_law.json             <- 30 items (easy)
│   ├── profed/teaching_profession/philosophical_heritage/
│   │   └── philosophical_heritage.json<- 39 items (medium)
│   └── english_majorship/structure_of_english/basic_sentence_pattern/
│       └── basic_sentence_pattern.json<- 41 items (advanced)
│
├── public/
│   ├── manifest.json
│   ├── VERSION.json
│   ├── topics.json
│   └── assets/icons/                  <- PWA icons
│
└── src/
    ├── App.tsx                        <- Main controller
    ├── types.ts                       <- TypeScript definitions
    ├── core/                          <- DataLoader, Engine, Storage, Sound, Utils
    ├── hooks/                         <- usePWAInstall hook
    ├── components/ui/                 <- HUD, FinishModal, PWAInstallButton, Toast
    ├── components/modes/              <- 8 Study Mode components
    └── components/views/              <- HomeView, SetupView, BookmarksView, AboutView
```

---

## Deployment to GitHub Pages

The repository already comes pre-configured with automated GitHub Actions deployment (`.github/workflows/deploy.yml`) and relative asset paths (`base: './'`).

1. **Push to GitHub**:
   - Create a GitHub repository and push your code to the `main` branch.
2. **Enable GitHub Pages**:
   - Go to your repository on GitHub: **Settings** -> **Pages**.
   - Under **Build and deployment** -> **Source**, choose **GitHub Actions**.
   - The workflow will automatically trigger, build the app, and deploy it to `https://<your-username>.github.io/<your-repo-name>/`.

---

## Will Firebase Still Work on GitHub Pages?

**Yes!** The app interacts with Firebase Auth and Cloud Firestore directly from the user's browser.
- **Crucial Requirement for Google Sign-In**:
  - Open your [Firebase Console](https://console.firebase.google.com/) for your project.
  - Navigate to **Authentication** -> **Settings** -> **Authorized domains**.
  - Add your GitHub Pages domain (e.g. `<your-username>.github.io` or your custom domain).
  - Without this, Google Sign-in popup will be blocked by Firebase security for unauthorized domain origins. Once added, Google Sign-in and cloud sync work seamlessly.

---

## How to Add or Update Topics and Subtopics

Questions and topics are modular and automatically discovered by the build system via `import.meta.glob`:

1. **Create or edit a JSON file under `/data/`**:
   - Organize under: `data/<category>/<topic>/<subtopic>/<file_name>.json`
   - Example structure:
     ```json
     {
       "category": "General Education",
       "topic": "Mathematics",
       "subtopic": "Geometry & Trigonometry",
       "difficulty": "medium",
       "items": [
         {
           "term": "Pythagorean Theorem",
           "definition": "In a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides: a² + b² = c².",
           "rationalization": "Strictly applies to right-angled triangles to compute missing side lengths.",
           "mnemonic": {
             "title": "Right Triangle Sides",
             "phrase": "Add the Legs' Squares for C",
             "items": ["a² + b² = c²"]
           },
           "source": "PRC LET Board Exam Syllabus - GenEd Mathematics (2023 TOS)",
           "tosCompetency": "Solve geometric problems involving angles, perimeter, and area",
           "bloomsTaxonomy": "Applying",
           "highYield": true
         }
       ]
     }
     ```
2. **Automatic Detection**:
   - `src/core/dataLoader.ts` automatically scans and imports all `data/**/*.json` files at compile-time.
   - Topics, subtopics, and question counts update automatically in the UI without modifying any code.
3. **Update `topics.json` (Optional manifest index)**:
   - Add your new file path to `topics.json` to keep the reference index in sync.
4. **Commit & Push**:
   - Push your changes to `main`. GitHub Actions will automatically re-build and deploy the updated question pool!

---

## Author & Dedication

**Sir JC Dela Cruz** — Dedicated to all future Filipino Licensed Professional Teachers (LPTs) preparing for the Philippine Board Examination.

