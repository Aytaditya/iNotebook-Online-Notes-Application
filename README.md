# iNotebook

iNotebook is a comprehensive MERN (MongoDB, Express.js, React.js, Node.js) stack project that allows users to securely log in, jot down personal notes, and subsequently edit them. It implements CRUD (Create, Read, Update, Delete) operations for managing notes.

## Features

- User Authentication: Users can securely register, log in, and log out using bcrypt.js for password encryption.
- CRUD Operations: Users can create, read, update, and delete notes.
- Secure Sessions: User sessions are managed securely with JWT (JSON Web Tokens).
- Responsive Design: The application is designed to work seamlessly across various devices and screen sizes.

## Technologies Used

- MongoDB: A NoSQL database for storing user information and notes.
- Express.js: A web application framework for Node.js used for building the backend API.
- React.js: A JavaScript library for building user interfaces.
- Node.js: A JavaScript runtime environment used for running the backend server.
- bcrypt.js: A library for password hashing and encryption.
- JWT (JSON Web Tokens): Used for secure authentication and managing user sessions.
- Bootstrap: A front-end framework for designing responsive and mobile-first websites.
- Axios: A promise-based HTTP client for making requests to the backend server.

## Project Structure

The project is organized into two folders:

1. **frontend**: Contains the React.js frontend code.
   - The frontend server runs on port 3000.
   - Contains a `components` folder with reusable UI components used throughout the website.

frontend
   ├── public
   │   └── ...
   ├── src
   │   ├── components
   │   │   ├── Navbar.js
   │   │   ├── Notes.js
   │   │   └── ...
   │   ├── App.js
   │   ├── index.js
   │   └── ...
   └── ...


backend
├── models
│   ├── User.js
│   └── Note.js
├── routes
│   ├── notes.js
│   └── authorization.js
├── db.js
├── controllers
├── config
├── middleware
├── server.js
└── index.js
