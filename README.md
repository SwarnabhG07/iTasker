# iTasker

A modern, feature-rich task management application built with React, TypeScript, and Vite. Manage your daily tasks with an intuitive interface, track progress, and stay productive.

## Features

- ✅ **Create & Manage Tasks** - Add, edit, and delete tasks with ease
- 🎯 **Progress Tracking** - Visual progress bar to track task completion
- ✔️ **Mark Complete** - Check off tasks as you complete them
- 🎨 **Modern UI** - Built with shadcn/ui components and TailwindCSS
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Fast Performance** - Vite for blazing-fast development and builds
- 🧪 **Type Safe** - Full TypeScript support for robust code

## Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [HugeIcons](https://hugeicons.com/)
- **Utilities**: UUID for unique task IDs, clsx for class merging

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm installed
- Basic understanding of React and TypeScript

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd iTasker
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Build the project:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Build for production (TypeScript check + Vite build)
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier
- `npm run typecheck` - Run TypeScript type checking
- `npm run preview` - Preview the production build locally

## Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── Navbar.tsx
│   │   ├── progress.tsx
│   │   └── ... (other UI components)
│   └── theme-provider.tsx  # Theme context provider
├── lib/
│   └── utils.ts            # Utility functions
├── assets/                 # Static assets
├── App.tsx                 # Main application component
├── main.tsx                # React entry point
└── index.css               # Global styles
```

## Key Components

- **Navbar** - Navigation and app header
- **Task Manager** - Main task creation and display interface
- **Progress Tracker** - Visual progress indicator for task completion
- **Task Card** - Individual task display with edit/delete/complete actions
- **Dialog** - Modal for creating/editing tasks
- **Input Fields** - Text input with validation

## Adding New Components

To add new shadcn/ui components:

```bash
npx shadcn@latest add <component-name>
```

This will automatically install and configure the component in `src/components/ui/`.

To use components in your app:

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Task</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Complete</Button>
      </CardContent>
    </Card>
  )
}
```

## Code Quality

- **ESLint** - Enforces code quality standards
- **Prettier** - Automatic code formatting with TailwindCSS plugin support
- **TypeScript** - Strict type checking for type safety

To check code quality:
```bash
npm run lint
```

To format code:
```bash
npm run format
```

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests to improve the project.

## Support

For issues, questions, or suggestions, please create an issue in the repository.

---

Happy tasking! 🚀
