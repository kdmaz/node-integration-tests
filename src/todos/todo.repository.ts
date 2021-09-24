import { pool } from '../db'
import { NewTodoEntity, TodoEntity } from './todo.interface'

export async function getTodoEntities(): Promise<TodoEntity[]> {
  const queryResult = await pool.query<TodoEntity>('SELECT * FROM todo')
  return queryResult.rows
}

export async function addTodoEntity({
  description,
  is_complete,
}: NewTodoEntity): Promise<number> {
  await pool.query({
    text: 'INSERT INTO todo (description, is_complete) VALUES ($1, $2)',
    values: [description, is_complete],
  })

  const queryResult = await pool.query<{ todo_id: string }>(
    `SELECT currval(pg_get_serial_sequence('todo', 'todo_id')) as todo_id`,
  )
  const todoId = queryResult.rows[0].todo_id
  return +todoId
}

export async function deleteTodoEntity(todoId: number): Promise<void> {
  await pool.query({
    text: 'DELETE FROM todo WHERE todo_id = $1',
    values: [todoId],
  })
}
