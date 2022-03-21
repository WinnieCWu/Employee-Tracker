const db = require('./db/connection');
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const routes = require('./routes')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/routes', routes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

