# Portfolio Website

A clean, modern portfolio website to showcase your projects and work.

## Features

- ✨ Modern, responsive design
- 🎨 Beautiful UI with smooth animations
- 📱 Mobile-friendly
- 🔍 Project search and filtering
- 💼 Project showcase with details
- 📄 About page
- 🚀 Fast and lightweight

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Quick Start

**For Development (Recommended):**

```bash
# Navigate to frontend (in Git Bash: cd /d/Projects/Portofolio/frontend)
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser!

**For Production Build:**

```bash
# 1. Build frontend
cd frontend
npm install
npm run build

# 2. Start backend
cd ../backend
npm install
npm start
```

Open `http://localhost:3000` in your browser!

### Navigation Help

**In Git Bash:**
- Frontend: `cd /d/Projects/Portofolio/frontend`
- Backend: `cd /d/Projects/Portofolio/backend`

**In PowerShell/CMD:**
- Frontend: `cd D:\Projects\Portofolio\frontend`
- Backend: `cd D:\Projects\Portofolio\backend`

See `COMPLETE_SETUP.md` for detailed instructions!

## Customizing Your Portfolio

### Adding Projects

Edit `frontend/src/data/projects.js` to add your projects. Each project needs:

- `id` - Unique number
- `title` - Project name
- `shortDescription` - Brief description for cards
- `description` - Full description
- `technologies` - Array of technologies used
- `thumbnailUrl` - Image URL for project card
- `featuredImageUrl` - Larger image for detail page
- `githubUrl` - Link to GitHub (optional)
- `liveUrl` - Link to live demo (optional)
- `category` - Project category
- `status` - "completed", "in-progress", or "planned"
- `featured` - true/false

### Updating Your Information

- **Homepage:** Edit `frontend/src/components/HomePage.jsx`
- **About page:** Edit `frontend/src/components/About.jsx`
- **Navbar logo:** Edit `frontend/src/components/Navbar.jsx`

## Project Structure

```
Portofolio/
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── data/            # Projects data
│   │   └── ...
│   └── ...
├── backend/
│   └── app.js               # Simple Express server
└── README.md
```

## Technologies Used

- React
- React Router
- Vite
- Express
- CSS3