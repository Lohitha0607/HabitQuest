# 🎯 HabitQuest

HabitQuest is a full-stack habit-tracking application designed to help users build and maintain positive routines. It combines the power of the MERN stack with AI-driven motivation to provide a rewarding habit-building experience.

🔗 **Live Demo:** [habitquest.netlify.app](https://habitquest.netlify.app/)

## ✨ Features

- **AI Motivation:** Personalized rewards and motivational messages powered by Gemini AI.
- **Streak Tracking:** Keep the momentum going with visual streak indicators and customizable targets.
- **Secure Auth:** JWT-based authentication for secure and persistent user sessions.
- **Modern UI:** Responsive and clean interface built with React and Tailwind CSS.
- **Detailed Insights:** Habit details and progress tracking via intuitive modals.

## 🚀 Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** for styling
- **Axios** for API communication
- **React Router** for navigation

### Backend
- **Node.js & Express.js**
- **MongoDB & Mongoose** for data persistence
- **JSON Web Tokens (JWT)** for authentication
- **Zod** for schema validation

### AI Integration
- **Gemini AI API** for generating motivational content

## 🛠️ Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB account/instance
- Gemini AI API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Lohitha0607/HabitQuest.git
   cd HabitQuest
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   # Create a .env file and add your MONGO_URL, JWT_SECRET, and GEMINI_API_KEY
   node index.js
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## 📸 Screenshots

<div align="center">
  <img src="https://i.imgur.com/0vKrN4F.png" width="400" alt="Dashboard"/>
  <img src="https://i.imgur.com/RjztgyM.png" width="400" alt="Habit List"/>
  <img src="https://i.imgur.com/ioaiZl0.png" width="400" alt="Add Habit"/>
  <img src="https://i.imgur.com/fOMafpK.png" width="400" alt="Progress View"/>
  <img src="https://i.imgur.com/UHXkHnC.png" width="400" alt="Mobile View"/>
</div>

---
Made with ❤️ by [Lohitha](https://github.com/Lohitha0607)
