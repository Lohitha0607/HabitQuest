# HabitQuest Frontend Source Summary

This file provides a brief summary of each file in the `frontend/src/` directory.

| File Path | Description |
|-----------|-------------|
| frontend/src/index.css | Imports Tailwind CSS directives (`base`, `components`, `utilities`) for the application's global styling. |
| frontend/src/App.jsx | The main application component that sets up React Router with routes for Signin, Signup, and Dashboard. |
| frontend/src/dashboard_components/HabitList.jsx | Renders a list of habits with options to update, delete, or complete them. Includes a modal for updating habit details and handles daily completion logic with warning messages. |
| frontend/src/dashboard_components/Navbar.jsx | A navigation bar that displays the user's name, the project title ("HabitQuest"), and a coin counter linked to rewards. |
| frontend/src/dashboard_components/SearchBar.jsx | A simple search input component that allows users to filter their habits by name. |
| frontend/src/dashboard_components/RewardPopUp.jsx | A modal component that displays a congratulatory message when a user achieves a habit reward. |
| frontend/src/dashboard_components/AddHabitForm.jsx | A form component for adding new habits, collecting the habit name, target days, and reward type. |
| frontend/src/App.css | An empty CSS file intended for application-specific styles. |
| frontend/src/pages/Signin.jsx | The Sign-in page component. It handles user authentication via email and password, communicates with the backend API, and manages token storage and error display. |
| frontend/src/pages/Dashboard.jsx | The main dashboard page. It orchestrates the habit management logic, including fetching user data and habits, and handling add/update/delete/complete actions through API calls. |
| frontend/src/pages/Signup.jsx | The Sign-up page component. It allows new users to create an account by providing a name, email, and password, managing API interaction and redirection upon success. |
| frontend/src/main.jsx | The entry point for the React application, rendering the `App` component within `StrictMode`. |
| frontend/src/components/Button.jsx | A reusable, styled button component used throughout the application. |
| frontend/src/components/SubHeading.jsx | A reusable text component for displaying sub-headings or descriptive text in forms. |
| frontend/src/components/Heading.jsx | A reusable text component for large, bold headings. |
| frontend/src/components/InputBox.jsx | A reusable input field component with a label, used for capturing user data in forms. |
| frontend/src/components/BottomWarning.jsx | A small utility component used at the bottom of auth pages to provide a link between the Sign-in and Sign-up screens. |
