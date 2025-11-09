// src/index.ts

import express from 'express'
import dotenv from 'dotenv'
// CORREÇÃO: Adicione a extensão .js para que o Node.js em modo ESM encontre o arquivo compilado
import { AppDataSource } from './db/data-source-cli.js'

dotenv.config()

const app = express()

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Database connected!')
    app.listen(3000, () => console.log('🚀 Server running on port 3000'))
  })
  .catch((err) => console.error('❌ Error during Data Source initialization:', err))

app.get('/health-check', (req, res) => {
  // OBS: Adicionei req, res e return
  res.send('Ok')
})
