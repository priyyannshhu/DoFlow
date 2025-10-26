# DoFlow

A modern, minimal to-do list application built with Next.js 14, React, and TypeScript. DoFlow helps you organize your daily tasks with a beautiful, animated interface and dark mode support.

![DoFlow](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **Clean & Modern UI**: Minimalist design with smooth animations powered by Framer Motion
- **Dark Mode**: Toggle between light and dark themes with persistent preference storage
- **Task Management**: Add, complete, and delete tasks with ease
- **Local Storage**: All tasks are saved locally in your browser
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Motivational Quotes**: Get inspired with random quotes on each session
- **Smooth Animations**: Delightful micro-interactions throughout the app

## 🚀 Demo

**Live Demo**: [https://do-flow-as.vercel.app/](https://do-flow-as.vercel.app/)

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Font**: [Poppins](https://fonts.google.com/specimen/Poppins)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/priyyannshhu/DoFlow.git
cd DoFlow
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
DoFlow/
├── app/
│   ├── page.tsx           # Main page component
│   ├── layout.tsx         # Root layout with metadata
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── TaskCard.tsx       # Individual task card component
│   ├── ThemeToggle.tsx    # Dark/light mode toggle
│   └── Footer.tsx         # Footer component
├── lib/
│   ├── localStorage.ts    # Local storage utilities
│   └── quotes.ts          # Motivational quotes
└── public/                # Static assets
```

## 🎨 Key Components

### Home Page (`app/page.tsx`)
- Main application component
- Manages task state and localStorage
- Handles task CRUD operations

### TaskCard (`components/TaskCard.tsx`)
- Individual task item with checkbox and delete button
- Animated entry and exit transitions
- Strike-through styling for completed tasks

### ThemeToggle (`components/ThemeToggle.tsx`)
- Light/dark mode switcher
- Persists theme preference to localStorage
- Smooth rotation animation on toggle

## 💾 Local Storage

DoFlow uses browser localStorage to persist:
- Task list
- Theme preference (light/dark mode)

All data is stored locally on your device and never sent to any server.

## 🎯 Usage

1. **Add a Task**: Type in the input field and press Enter or click the + button
2. **Complete a Task**: Click the checkbox next to the task
3. **Delete a Task**: Click the trash icon on the right side of the task
4. **Toggle Theme**: Click the sun/moon icon in the top-right corner

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Priyanshu**

- Portfolio: [https://priyanshu-v.vercel.app/](https://priyanshu-v.vercel.app/)
- GitHub: [@priyyannshhu](https://github.com/priyyannshhu)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for the icon set

---

Made with ❤️ by Priyanshu