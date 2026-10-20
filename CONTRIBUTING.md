# Contributing to HabitQuest

Thank you for your interest in contributing to HabitQuest! We welcome contributions to improve the project.

## How to Run the Project Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (local or MongoDB Atlas)
- [Gemini AI API Key](https://ai.google.dev/)

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Lohitha0607/HabitQuest.git
    cd HabitQuest
    ```

2.  **Backend Setup:**
    - Navigate to the `backend` directory:
      ```bash
      cd backend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Create a `.env` file in the `backend` directory and add the following:
      ```env
      MONGO_URI=your_mongodb_connection_string
      MONGO_DB_NAME=HabitQuest
      JWT_SECRET=your_jwt_secret
      GEMINI_AI_API_KEY=your_gemini_api_key
      ```
    - Start the backend server:
      ```bash
      node index.js
      ```
      The backend will run on `http://localhost:3000`.

3.  **Frontend Setup:**
    - Navigate to the `frontend` directory:
      ```bash
      cd ../frontend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Start the frontend development server:
      ```bash
      npm run dev
      ```
      The frontend will usually run on `http://localhost:5173`.

4.  **Access the Application:**
    Open your browser and go to `http://localhost:5173`.

## Pull Request Guidelines

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Ensure your code follows the existing style.
4.  Commit your changes with clear and descriptive messages.
5.  Push your branch and open a pull request.
