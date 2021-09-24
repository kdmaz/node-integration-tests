import { Pool } from 'pg'

const connectionString =
  'postgresql://postgres:postgres@localhost:5433/integration'

export const pool = new Pool({ connectionString })

export function closeDb(): void {
  pool.end()
}
