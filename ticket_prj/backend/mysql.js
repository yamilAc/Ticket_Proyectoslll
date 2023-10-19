const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

const db = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Univalle',
  database: 'ticket_db',
});

app.use(express.json());

// Create a new event (Example endpoint)
app.post('/events', async (req, res) => {
  try {
    const { title, location, description } = req.body;
    const [result] = await db.query(
      'INSERT INTO events (admin_id, title, location, description) VALUES (?, ?, ?, ?)',
      [1, title, location, description]
    );
    res.json({ id: result.insertId });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch all events (Example endpoint)
app.get('/events', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM events');
    res.json(results);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

