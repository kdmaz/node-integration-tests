import dotenv from 'dotenv'

const nodeEnv = process.env.NODE_ENV
const path = nodeEnv ? `.env.${process.env.NODE_ENV}` : '.env'

dotenv.config({ path })

export const env = {
  connectionString: process.env.DB_CONNECTION_STRING,
}
