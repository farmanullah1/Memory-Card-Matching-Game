# Memory Card Matching Game

A beautiful, fully responsive memory card matching game built with React, TypeScript, and Vite. This game features smooth animations, multiple themes, sound effects, and high score tracking.

## 🎮 Live Demo

**[Play Now](https://farmanullah1.github.io/memory-card-game/)**

## ✨ Features

### Core Gameplay
- **4x4 Grid**: 8 pairs of cards to match
- **Move Counter**: Track your moves (each pair flip counts as one move)
- **Timer**: Real-time game timer using requestAnimationFrame for 60 FPS performance
- **Win Condition**: Celebratory modal when all pairs are matched

### Feature-Rich Experience
- **Sound Effects**: Toggleable sounds for card flips, matches, and victory (using Web Audio API)
- **High Score System**: Tracks best moves and best time using localStorage
- **New Game**: Start a completely fresh session (resets scores)
- **Reset Game**: Shuffle the board and restart without resetting high scores

### Visual Identity & Theming
- **Vibrant Gradients**: Beautiful gradient backgrounds for cards
- **Glassmorphism**: Modern glass effect on UI panels
- **Dark Mode**: Full dark mode support
- **Skin System**: 4 complete color themes:
  - 🎨 Default (Purple/Pink)
  - 🌊 Ocean Blue
  - 🌅 Sunset
  - ✨ Neon Cyber

### Performance & Polish
- **60 FPS**: Optimized with useRef for non-rendering state and requestAnimationFrame for timer
- **Smooth Animations**: Framer Motion for card flips and modal transitions
- **GPU-Accelerated CSS**: Using transform and opacity for animations
- **Fully Responsive**: Works perfectly on mobile, tablet, and desktop

## 🛠️ Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Framer Motion** - Animation library
- **CSS Modules** - Custom styling with CSS variables
- **Web Audio API** - Sound effects generation
- **localStorage** - High score persistence

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/farmanullah1/memory-card-game.git

# Navigate to project directory
cd memory-card-game

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server at localhost:5173

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Deployment
npm run deploy       # Deploy to GitHub Pages
```

## 📁 Project Structure

```
memory-card-game/
├── src/
│   ├── components/
│   │   ├── Card.tsx           # Individual card component
│   │   ├── GameBoard.tsx      # 4x4 game grid
│   │   ├── Scoreboard.tsx     # Moves and timer display
│   │   ├── GameOverModal.tsx  # Win celebration modal
│   │   └── ThemeSwitcher.tsx  # Theme/skin selector
│   ├── hooks/
│   │   ├── useHighScore.ts    # High score management
│   │   ├── useSound.ts        # Sound effects hook
│   │   └── useTimer.ts        # Timer with RAF
│   ├── styles/
│   │   └── index.css          # Global styles & themes
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   ├── App.tsx                # Main application
│   └── main.tsx               # Entry point
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 How to Play

1. Click any card to flip it over
2. Click another card to find its match
3. If the cards match, they stay face-up
4. If they don't match, they flip back after 1 second
5. Find all 8 pairs to win!
6. Try to complete the game in the fewest moves and shortest time

## 🏆 Scoring

- **Moves**: Each pair of flips counts as one move
- **Time**: Total time from first card flip to winning
- **Best Scores**: Your best moves and time are saved locally

## 🌈 Theme System

The game uses CSS custom properties (variables) for theming. Switch between themes using the buttons in the top-right corner:

- **🌙/☀️**: Toggle dark/light mode
- **🔇/🔊**: Toggle sound on/off
- **🎨**: Default purple/pink theme
- **🌊**: Ocean blue theme
- **🌅**: Sunset orange/pink theme
- **✨**: Neon cyber theme

## 📱 Responsive Design

The game is fully responsive and works on:
- Desktop (1024px+)
- Tablet (640px - 1023px)
- Mobile (< 640px)

On mobile devices, the theme switcher moves to the bottom for easier access.

## 🔗 Links

- **[Live Demo](https://farmanullah1.github.io/memory-card-game/)**
- **[My Portfolio](https://farmanullah1.github.io/My-Portfolio/)**
- **[GitHub Repository](https://github.com/farmanullah1/memory-card-game)**

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Farmanullah**

- Portfolio: [farmanullah1.github.io/My-Portfolio](https://farmanullah1.github.io/My-Portfolio/)
- GitHub: [@farmanullah1](https://github.com/farmanullah1)

---

Made with ❤️ using React, TypeScript, and Vite