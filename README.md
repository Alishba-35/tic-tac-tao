# Tic Tac Toe — React

A polished, two-player Tic Tac Toe game rebuilt from scratch in React. Started as a vanilla HTML/CSS/JS project ([original version](https://github.com/Alishba-35/tic-tac-tao)) and was migrated into a component-based React app with a scoreboard, persistent game history, and a dark/light theme.

## Features

- Two-player local play with custom player names
- Winner and draw detection, with the winning line highlighted on the board
- Scoreboard tracking wins for each player plus draws
- Game history (last 10 rounds), stored across sessions
- Dark and light themes, saved to `localStorage`
- Fully responsive layout — desktop, tablet, and mobile
- Keyboard-accessible controls with visible focus states
- No external UI libraries — just React and hand-written CSS

## Tech stack

- React 19
- Vite
- JavaScript (no TypeScript)
- CSS (custom properties for theming, no CSS framework)

## Project structure

```
src/
  components/
    Board/          # 3x3 grid + individual cell
    PlayerSetup/    # Start screen for entering player names
    ScoreBoard/     # Live scores and active-turn indicator
    StatusBanner/   # Turn / winner / draw message
    GameControls/   # Play again, reset scores, edit players
    GameHistory/    # Collapsible list of recent results
    ThemeToggle/    # Dark / light mode switch
  hooks/
    useLocalStorage.js   # Syncs a piece of state with localStorage
  utils/
    gameLogic.js    # Pure win/draw detection (no DOM, easy to test)
    storage.js      # Small localStorage read/write/clear helper
  App.jsx           # Wires state + components together
  main.jsx
  index.css         # Theme variables + base styles
  App.css           # App-level layout
```

## How the original logic was converted

The original vanilla JS version manipulated the DOM directly (`querySelector`, `innerText`, `classList`, `prompt()`) and kept game state in loose top-level variables. In the React version:

- The board is a plain array of 9 values (`null | 'X' | 'O'`) held in `useState`, instead of reading `innerText` off 9 buttons.
- Winner/draw detection is the same line-checking idea as the original, moved into a pure function (`findWinner`) in `utils/gameLogic.js` so it has no DOM dependency and is trivial to test.
- `window.prompt()` for player names was replaced with a proper `PlayerSetup` screen.
- Score and turn updates that used to mutate `innerText` directly now flow through state, and the UI re-renders automatically.
- `localStorage` calls are centralized in `utils/storage.js` instead of scattered across the code.

## LocalStorage

A small `useLocalStorage` hook keeps a few pieces of state in sync with the browser's storage automatically:

| Key           | What it stores                 |
| ------------- | ------------------------------- |
| `ttt:players` | Player X / Player O names       |
| `ttt:scores`  | Win counts for X, O, and draws  |
| `ttt:theme`   | `"dark"` or `"light"`           |
| `ttt:history` | The last 10 game results        |

The in-progress board itself is intentionally **not** persisted — refreshing mid-round starts a fresh board, while names, scores, theme, and history all survive.

## How to run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is written to `dist/`.

## Deployment

This is a static Vite app, so it deploys as-is to **Vercel** or **Netlify**:

- **Vercel**: import the repo, framework preset "Vite", no extra config needed.
- **Netlify**: build command `npm run build`, publish directory `dist`.

- Live Demo: _not yet deployed_
- GitHub Repository: _add your repo link here_

## Possible next steps

- A "vs Computer" mode (random moves for easy, minimax for a perfect-play hard mode)
- Sound effects on move/win
- Swipe-friendly mobile game history drawer
