# Boilerplate Monolithic Project

This repository serves as a boilerplate for building monolithic applications using React and Express. It is designed to provide a solid foundation for projects, with pre-configured tools and a task module (as example) for handling task creation.

## Features

### Frontend
- **React**: Built using [Create React App](https://create-react-app.dev/).
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **TypeScript**: Strongly typed JavaScript for better developer experience.
- **ESLint & Prettier**: Configured for consistent code formatting and linting.

### Backend
- **Express**: Minimal and flexible Node.js web framework.
- **Joi**: Schema description and data validation.
- **TypeORM**: ORM for interacting with the database.
- **Nodemon**: Automatically restarts the server during development.
- **TypeScript**: Ensures type safety across the backend.
- **Postgres**: SQL Database.

### Additional Module
- **Task Module**: Boilerplate module included for handling task creation.

## Getting Started

### Prerequisites
Make sure you have the following installed:
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>
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

1. Start the Postgres Container:

2. ```bash
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

## Usage
The boilerplate includes a task module in the backend to handle task creation. You can extend this module to meet your project requirements.

