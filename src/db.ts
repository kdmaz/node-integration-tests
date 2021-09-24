import { Pool } from 'pg'
import { env } from './environment'

const connectionString = env.connectionString

export const pool = new Pool({ connectionString })
