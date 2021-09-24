import { Pool } from 'pg'

const connectionString =
  'postgresql://postgres:postgres@localhost:5432/integration'

export const pool = new Pool({ connectionString })
