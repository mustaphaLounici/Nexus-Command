# Nexus Command

> A modern command palette for Next.js applications with smart search, AI assistance, and keyboard-first navigation.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern command palette implementation using Next.js 14, shadcn/ui, and TypeScript. Features a global search with keyboard navigation, recent searches, and AI assistance.

## Features

### Core Functionality
- 🔍 Global command menu (⌘K shortcut)
- 🎯 Smart result ranking with affinity scores
- 💾 Local storage for recent searches
- ⌨️ Full keyboard navigation
- 🌙 Dark mode support

### Search Experience
- **Empty State**
  - 3 suggested questions
  - 3 recent searches
  - Clear visual hierarchy

- **Active Search**
  - Navigation items (Home, Files, etc.)
  - Recent files matching query
  - "Search for" option
  - "Ask AI" option (prioritized for longer queries)

### Ranking System
- Affinity scoring (0-100) based on:
  - Exact matches (100 points)
  - Starts with matches (80 points)
  - Contains matches (60 points)
  - Recency bonus (up to 20 points)
  - Access frequency bonus (up to 10 points)

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd command-search-demo
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Keyboard Shortcuts
- `⌘K` / `Ctrl+K`: Open search
- `↑↓`: Navigate results
- `↵`: Select result
- `Esc`: Close search

### Search Behavior
- Empty state shows suggested questions and recent searches
- Type to see filtered results
- Results are ranked by relevance and affinity score
- Queries >30 characters prioritize AI assistance

## Technical Details

### Stack
- Next.js 14
- TypeScript
- shadcn/ui components
- Tailwind CSS
- next-themes for dark mode

### Key Components
- `CommandMenu`: Main search interface
- `useSearch`: Custom hook for search state
- Ranking utilities for smart result sorting

### Data Management
- Recent searches stored in localStorage
- Maximum 10 recent searches
- Affinity scoring for result ranking

## Project Structure
```
├── app/                  # Next.js app directory
├── components/          
│   ├── ui/              # shadcn/ui components
│   └── command-menu.tsx # Main search component
├── lib/
│   ├── hooks/           # Custom React hooks
│   ├── types.ts         # TypeScript types
│   └── utils.ts         # Utility functions
└── public/              # Static assets
```

## Implemented Features vs. Planned

### Implemented ✅
- Global command menu
- Keyboard navigation
- Recent searches
- Smart result ranking
- Dark mode
- File search
- Navigation items
- AI assistance option

### Planned 🚧
- OpenAI integration
- Search analytics
- Custom themes
- Search history management
- Unit tests

## Known Limitations
- AI suggestions are simulated
- Limited to 10 recent searches
- No server-side search functionality
- No real-time updates

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
