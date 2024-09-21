# Notes Application

This is a basic notes application that allows users to create, retrieve, and delete notes. The application features a backend built with Node.js and Express, and a frontend developed using React, Tailwind CSS, Vite, and Axios. This project was assisted by ChatGPT.

## Features

- **User Authentication:** Users can register and log in to access their notes securely.
- **Create Notes:** Users can add new notes with a title and content.
- **Retrieve Notes:** Users can view all their notes.
- **Delete Notes:** Users can delete specific notes.

## How It Works

1. **Backend:**

   - The backend is built using Node.js and Express.
   - MongoDB is used for data storage, with Mongoose as the ODM.
   - JSON Web Tokens (JWT) are used for user authentication.

2. **Frontend:**
   - The frontend is developed using React with Vite for fast development and build processes.
   - Tailwind CSS is utilized for styling and responsive design.
   - Axios is used for making HTTP requests to the backend API.

## Installation

To run the project locally, follow these steps:

### Backend

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd notes-application-backend
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:

   - Create a `.env` file in the root directory and add your MongoDB connection string and JWT secret key:
     ```
     MONGO_URI=<your_mongodb_uri>
     JWT_SECRET_KEY=<your_secret_key>
     ```

4. Start the server:
   ```bash
   node index.js
   ```

### Frontend

1. Open a new terminal and navigate to the frontend directory:

   ```bash
   cd notes-application-frontend
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   nodemon index.js
   ```

## Usage

- Navigate to the frontend application in your web browser.
- Register a new user or log in with existing credentials.
- After logging in, you can create, view, and delete your notes.

## Technologies Used

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **Frontend:** React, Tailwind CSS, Vite, Axios

## Acknowledgments

This project was developed with the assistance of ChatGPT.

## License

This project is licensed under the MIT License.
