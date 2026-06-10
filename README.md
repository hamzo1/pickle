# pickle
a website for users to create tournament platforms for pickleball
Kitchen Classic Tournament

Filing System

schema.sql — Database structure (PostgreSQL).

server.js — API backend (Node.js/Express).

package.json — Dependency management.

src/api.js — Frontend HTTP client.

src/App.jsx — React root application.

src/index.css — Styling and CSS variables.

src/components/ — UI components (Icons, Match Cards).

How to Run

1. Database Setup

Ensure you have PostgreSQL installed and running. Create the database and run the schema:

createdb pickleball_db
psql -d pickleball_db -f schema.sql


2. Backend

Install the server dependencies and start the API:

npm install
node server.js


The server will start on http://localhost:5001.

3. Frontend

Install the React/Vite dependencies and start the development server:

npm install
npm run dev


Open your browser to the URL displayed in the terminal (usually http://localhost:5173).