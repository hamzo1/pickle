import express from 'express';
import pkg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/pickleball_db',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

app.get('/api/teams', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM teams ORDER BY name ASC');
    res.json(result.rows);
  } catch (err) { res.status(500).send('Database Error'); }
});

app.post('/api/teams', async (req, res) => {
  const { id, name, icon, pool: groupPool } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO teams (id, name, icon, pool) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, name, icon, groupPool || 'Unassigned']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).send('Database Error'); }
});

app.get('/api/matches', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM matches ORDER BY stage DESC, time ASC');
    res.json(result.rows);
  } catch (err) { res.status(500).send('Database Error'); }
});

app.put('/api/matches/:id', async (req, res) => {
  const { id } = req.params;
  const { games, winnerId, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE matches SET games = $1::jsonb, winner_id = $2, status = $3 WHERE id = $4 RETURNING *',
      [JSON.stringify(games), winnerId, status, id]
    );
    res.json(result.rows[0]);
  } catch (err) { res.status(500).send('Database Error'); }
});

app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
});