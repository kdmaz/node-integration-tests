import { pool } from '../db'
import { TodoEntity } from './todo.interface'

export async function getTodoEntities(): Promise<TodoEntity[]> {
  const queryResult = await pool.query<TodoEntity>('SELECT * FROM todo')
  return queryResult.rows
}
