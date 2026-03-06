const { Pool } = require('pg')

function normalizeEnv(value) {
  const normalized = String(value || '').trim()
  return normalized || undefined
}

const connectionString = normalizeEnv(process.env.DATABASE_URL)
const poolConfig = connectionString
  ? {
      connectionString,
    }
  : {
      host: normalizeEnv(process.env.PGHOST),
      port: process.env.PGPORT ? Number(process.env.PGPORT) : undefined,
      user: normalizeEnv(process.env.PGUSER),
      password: normalizeEnv(process.env.PGPASSWORD),
      database: normalizeEnv(process.env.PGDATABASE),
    }

const pool = new Pool({
  ...poolConfig,
  max: 10,
  idleTimeoutMillis: 30000,
})

pool.on('error', (err) => {
  console.error('Unexpected PG error', err)
})

module.exports = { pool }
