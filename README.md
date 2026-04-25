# 🎬 Dual Subtitle Maker

A React web app that translates any `.SRT` subtitle file and combines the original + translated text into a single dual-subtitle file — ready to use in VLC, MPC-HC, or KMPlayer.

No account. No API key. No backend. Just open and use.

---

## 📸 Screenshot

<!-- Replace the image below with your own screenshot -->
![Dual Subtitle Maker Screenshot](./src/Screenshot%202026-04-25%20101852.png)

---

## ✨ Features

- **33 languages supported** — Arabic, Hindi, French, Japanese, Chinese, and more
- **Drag & drop or paste** your `.srt` file directly
- **Real-time progress** — see each subtitle translated line by line
- **Flexible ordering** — original-first or translation-first
- **HTML tag stripping** — cleans up styled subtitles automatically
- **Download or copy** the finished dual `.srt` file
- **Completely free** — uses Google Translate's free endpoint

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone or unzip the project
cd dual-subtitle-app

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder — ready to deploy to any static host (Netlify, Vercel, GitHub Pages, etc.).

---

## 🗂️ Project Structure

```
dual-subtitle-app/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                   # Entry point
    ├── index.css                  # Global CSS variables + body styles
    ├── App.jsx                    # Root component — wires everything together
    ├── App.module.css
    │
    ├── constants/
    │   └── languages.js           # Language list, delay options, order options
    │
    ├── utils/
    │   ├── srt.js                 # parseSRT, buildSRT, countValidSubs, escapeHtml, downloadFile
    │   └── translate.js           # translateOne (Google Translate), sleep
    │
    ├── hooks/
    │   ├── useTranslation.js      # Full translation workflow + progress state
    │   └── useFileLoader.js       # File drag-drop + FileReader logic
    │
    └── components/
        ├── Card.jsx / .module.css
        ├── LanguagePicker.jsx / .module.css
        ├── SrtInput.jsx / .module.css
        ├── OptionsPanel.jsx / .module.css
        ├── ProgressPanel.jsx / .module.css
        └── ResultPanel.jsx / .module.css
```

---

## 🧭 How to Use

1. **Pick your language** — search or scroll through the language grid and click yours
2. **Load your subtitle file** — drag & drop a `.srt` file, click to browse, or paste the content directly
3. **Set options** — choose translation order and request delay
4. **Click Translate** — watch the real-time progress log as each subtitle is processed
5. **Download** the finished `.srt` file

### Showing Dual Subtitles in a Video Player

| Step | What to do |
|------|-----------|
| 1 | Download the dual `.srt` file |
| 2 | Rename it to match your video — e.g. `movie.srt` for `movie.mp4` |
| 3 | Put both files in the **same folder** |
| 4 | Open the video in **VLC**, **MPC-HC**, or **KMPlayer** |

The dual subtitles will appear automatically — no extra setup needed.

---

## ⚙️ Options

| Option | Description |
|--------|-------------|
| **Translation Order** | Show original first then translation, or vice versa |
| **Delay Between Requests** | Fast (300ms) / Normal (600ms) / Careful (1200ms) — slower = less chance of rate limiting |
| **Strip HTML Tags** | Remove `<i>`, `<b>`, `<font>` etc. from subtitles before translating |

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [React 18](https://react.dev/) | UI framework |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [CSS Modules](https://github.com/css-modules/css-modules) | Scoped component styles |
| [Google Translate free API](https://translate.googleapis.com) | Translation (no key needed) |

---

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server at `localhost:5173` |
| `npm run build` | Build optimized production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |

---

## ⚠️ Limitations

- Uses Google Translate's **unofficial free endpoint** — not intended for high-volume production use
- Very long subtitle files (500+ entries) may hit rate limits; use the **Careful** delay setting
- Translation quality depends on Google Translate and may vary by language pair

---

## 📄 License

MIT — free to use, modify, and distribute.