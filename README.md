# Contacts App (Technical Assesment)
This is a monorepo for a React and Express Application.
The purpose of this app is to store contact's information such as name, phone, email and a profie photo.


![architecture](https://github.com/user-attachments/assets/35afcc2d-e6ea-4b64-a393-90e129bc7150)


## Features

### Frontend
- **React**: Built using [Create React App](https://create-react-app.dev/).
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **TypeScript**: Strongly typed JavaScript for better developer experience.
- **ESLint & Prettier**: Configured for consistent code formatting and linting.
- **Redux toolkit**: Global state management
  
### Backend
- **Express**: Minimal and flexible Node.js web framework.
- **Joi**: Schema description and data validation.
- **TypeORM**: ORM for interacting with the database.
- **Nodemon**: Automatically restarts the server during development.
- **TypeScript**: Ensures type safety across the backend.
- **Postgres**: SQL Database.
- **Jest**: Testing code.
- **Imgur storage service**: Connects to a third party service to storage images

## Getting Started

### Prerequisites
Make sure you have the following installed:
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository and witch to branch interview:
   ```bash
   git clone <repository_url>
   git branch interview
   cd <repository_name>
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

### Running the Project

1. Start the Posgres Container
 ```bash
   cd backend
   docker-compose up -d
   ```
3. Start the backend server:
   ```bash
   cd backend
   npm run start:dev
   ```

4. Start the frontend:
   ```bash
   cd frontend
   npm run start
   ```
5. Run tests:
   ```bash
   cd backend
   npm run test
   ```


### Directory Structure
- `backend/`: Contains the Express server and associated logic.
- `frontend/`: Contains the React application.

# Screenshots
<img width="1168" alt="Screenshot 2024-12-18 at 13 47 23" src="https://github.com/user-attachments/assets/aea2491a-07f9-43fa-b466-96abda4e07e2" />
