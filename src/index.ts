import express from 'express'
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg
const app = express()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

app.get('/', async (req, res) => {
  const result = await pool.query('SELECT NOW()')
  res.json({ time: result.rows[0].now })
})

app.listen(3000, () => {
  console.log('🚀 Servidor rodando na porta 3000')
})
