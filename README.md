# Portfolio 2.0 🚀

An immersive, animation-rich developer portfolio built with Next.js 15 that blends storytelling, 3D experiences, and performant web techniques. This project showcases professional work, experiments, and craft case studies while delivering a memorable user journey on every device.

![Portfolio Preview](./src/app/opengraph-image.png)

<p align="center">
  <a href="https://www.salahm.uz" target="_blank" rel="noreferrer">🌐 Live Site</a>
  ·
  <a href="https://github.com/salah/portfolio-2.0/issues">🐛 Report Bug</a>
  ·
  <a href="https://github.com/salah/portfolio-2.0/issues">💡 Request Feature</a>
</p>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Core Experiences](#-core-experiences)
- [Performance & Accessibility](#-performance--accessibility)
- [Deployment](#-deployment)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## ✨ Features

- **Parallax storytelling** powered by a custom `ParallaxScrollWrapper` that uses GSAP Observer for buttery smooth section transitions.
- **Cinematic hero moment** with GSAP timelines, gradient typography, and animated underline elements.
- **Interactive hobby stories** delivered in an Instagram-inspired iPhone mockup with auto-progress reels.
- **3D integration** via Three.js and React Three Fiber for immersive visual highlights.
- **Rich MDX content pipeline** powering long-form case studies and craft writeups with live components.
- **Dark/light mode** switching with persisted preferences using `next-themes`.
- **Keyboard-friendly navigation** and motion-reduced states for accessible experiences.
- **Production-grade tooling** including Turbopack, TypeScript, ESLint, and Prettier.

## 🛠️ Tech Stack

| Layer         | Technologies                                           |
| ------------- | ------------------------------------------------------ |
| Framework     | Next.js 15 (App Router), React 19                      |
| Language      | TypeScript, MDX                                        |
| Styling       | Tailwind CSS, Shadcn/ui, Radix Primitives              |
| Animation     | GSAP, Framer Motion, SplitType                         |
| 3D / Graphics | Three.js, React Three Fiber, @react-three/drei, Cobe   |
| Data & APIs   | next-mdx-remote, Octokit GraphQL                       |
| Tooling       | Turbopack, ESLint, Prettier, pnpm script compatibility |

## 🧱 Architecture

The portfolio uses a component-driven architecture with domain-focused feature folders. Key concepts include:

- **App Router** for route-based code splitting and streaming.
- **Composable UI primitives** extending Shadcn/ui for consistent styling.
- **Store layer** with Zustand for lightweight global state (e.g., active section, theme toggles).
- **Animation orchestration** using GSAP timelines coupled with IntersectionObserver hooks.
- **MDX content system** stored in `src/mdx-content` for project narratives and thought pieces.

## 🚀 Getting Started

### Prerequisites

- Node.js **18.x** or newer
- Yarn **1.22.x** (project default) or pnpm/npm (supported but not committed)
- Git

### Installation

```bash
git clone https://github.com/salah/portfolio-2.0.git
cd portfolio-2.0
yarn install
```

### Run the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. The page auto-reloads as you edit components thanks to Fast Refresh.

## 🔐 Environment Variables

Duplicate the sample file and populate secrets:

```bash
cp .env.example .env.local
```

Key variables used in production:

```env
# Optional – used for GitHub API integrations
GITHUB_TOKEN=your_personal_access_token

# Optional – surfaced in analytics dashboards
VERCEL_ANALYTICS_ID=your_vercel_analytics_id

# Add any other secrets your fork requires
```

> **Tip:** Avoid committing `.env.local`. Use Vercel or your hosting provider to configure secrets in production.

## 📦 Available Scripts

```bash
yarn dev     # Start Next.js in development mode with Turbopack
yarn build   # Generate an optimized production build
yarn start   # Start the production server
yarn lint    # Run ESLint across the project
```

## 🗂️ Project Structure

```text
src/
├── app/                 # App Router routes, metadata, and API handlers
│   ├── layout.tsx       # Root layout with providers and global styles
│   ├── page.tsx         # Landing page composition
│   ├── tech-stack/      # Dedicated tech stack showcase
│   ├── work/            # Work experience and case studies
│   └── craft/           # MDX-driven craft stories
├── components/
│   ├── ui/              # Reusable UI primitives (Shadcn/ui adaptations)
│   ├── intro-view/      # Animated hero & GSAP hover interactions
│   ├── hobby-view/      # Instagram story-style hobby section
│   └── ...              # Additional feature-specific components
├── hooks/               # Custom React hooks (animations, breakpoints, etc.)
├── lib/                 # Utilities, configuration helpers, MDX processors
├── mdx-content/         # Source content for craft section
├── store/               # Zustand stores for global state
└── styles/              # Tailwind layers and global CSS overrides
```

## 🌟 Core Experiences

- **ParallaxScrollWrapper** – Locks the scroll wheel to full-screen sections with elegant y-axis parallax while allowing inner content to scroll independently.
- **IntroView** – Hovering portfolio keywords reveals contextual imagery with staggered GSAP animations.
- **JourneyView** – Framer Motion scroll progress reveals, gradient animated typography, and progress indicators.
- **HobbyView** – Instagram reel simulation with auto-progress bars, tap navigation, and GSAP character reveals.
- **Dock Navigation** – macOS-inspired dock using PNG icons with hover magnification.

## ⚡ Performance & Accessibility

- Core Web Vitals optimized via Next.js Image, dynamic imports, and streaming data.
- Custom `useReducedMotion` hooks to respect OS-level motion preferences.
- Keyboard navigable components with appropriate ARIA attributes & focus states.
- Lazy-loading heavy sections (Three.js scenes, MDX content) to reduce first load time.

## 🛡️ Security

- Please review [SECURITY.md](./SECURITY.md) for our responsible disclosure policy.
- Vulnerabilities should be reported privately via email before creating public issues.

## 🤝 Contributing

Contributions, ideas, and bug reports are welcome!

1. Fork the project.
2. Create a feature branch: `git checkout -b feature/awesome-improvement`.
3. Commit with Conventional Commits or clear messages.
4. Push and open a Pull Request describing your change.

Make sure `yarn lint` passes before submitting. Include screenshots or screen recordings for UI changes when possible.

## 📄 License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

## 📬 Contact

- **Author:** Muhammad (aka Salah)
- **Website:** [salah.uz](https://www.salahm.uz)
- **GitHub:** [@salahbm](https://github.com/salahbm)
- **LinkedIn:** [linkedin.com/in/salahbm](https://www.linkedin.com/in/salahbm)

## SHOUTOUTS

- Big Thanks to [SugarDarius](https://github.com/SugarDarius) for the layout of the portfolio.

---

Built with ❤️ using Next.js, TypeScript, and a passion for delightful web experiences.
