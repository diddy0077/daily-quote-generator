# Daily Quote Generator (React + Vite)

A beautiful and modern random quote generator built with React and Vite. Get inspired, laugh, or reflect with motivational, humorous, and life quotes. Save your favorites, copy, or share them instantly!

## Features
- Random quote generation from multiple categories
- Filter quotes by category (Motivational, Humor, Life)
- Save your favorite quotes locally
- Copy quotes to clipboard
- Share quotes directly to X (Twitter)
- Responsive, elegant UI with Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd rqg-with-react
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn
   ```

### Running Locally
Start the development server:
```sh
npm run dev
# or
yarn dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure
```
rqg-with-react/
├── public/
├── src/
│   ├── App.jsx         # Main React component
│   ├── quotes.js       # Quotes data
│   ├── main.jsx        # Entry point
│   ├── index.css       # Styles
│   └── assets/
├── package.json
├── vite.config.js
└── README.md
```

## Customization
- Add or edit quotes in `src/quotes.js`.
- Tweak styles in `src/index.css` or use Tailwind classes in components.

## Deployment
Build for production:
```sh
npm run build
# or
yarn build
```
Deploy the `dist/` folder to your favorite static hosting (Vercel, Netlify, GitHub Pages, etc).

## License
MIT

---
Made with ❤️ by [Daniel Udeh]
