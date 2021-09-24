import supertest from 'supertest'
import { app } from '../src/app'
import { pool } from '../src/db'
import { TodoDto } from '../src/todos/todo.interface'

const request = supertest(app)

const baseUrl = '/api/todos'

const todos: TodoDto[] = [
  {
    desc: 'mow the grass',
    id: 1,
    isComplete: false,
  },
  {
    desc: 'take out the garbage',
    id: 2,
    isComplete: true,
  },
]

async function insertTodos(): Promise<void> {
  for (let i = 0; i < todos.length; i++) {
    const { desc, isComplete } = todos[i]
    await pool.query({
      text: 'INSERT INTO todo (description, is_complete) VALUES ($1, $2)',
      values: [desc, isComplete],
    })
  }
}

async function clearTodos(): Promise<void> {
  await pool.query('DROP TABLE IF EXISTS todo')
  await pool.query(`CREATE TABLE IF NOT EXISTS todo (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(50) NOT NULL,
    is_complete BOOLEAN NOT NULL
  )`)
}
beforeEach(async () => {
  await clearTodos()
  await insertTodos()
})

afterAll(() => {
  pool.end()
})

test('get all todos', async () => {
  const { body: todos, statusCode } = await request.get(baseUrl)
  expect(statusCode).toBe(200)
  expect(todos).toMatchSnapshot()
})

test('add a todo', async () => {
  const {
    body: { todoId },
    statusCode: postStatusCode,
  } = await request.post(baseUrl).send({
    desc: 'new todo',
    isComplete: true,
  })
  expect(postStatusCode).toBe(201)
  expect(todoId).toBe(3)

  const { body: todos, statusCode: getStatusCode } = await request.get(baseUrl)
  expect(getStatusCode).toBe(200)
  expect(todos).toMatchSnapshot()
})

test('delete a todo', async () => {
  const { body, statusCode: deleteStatusCode } = await request.delete(
    `${baseUrl}/1`,
  )
  expect(deleteStatusCode).toBe(204)
  expect(body).toEqual({})

  const { body: todos, statusCode: getStatusCode } = await request.get(baseUrl)
  expect(getStatusCode).toBe(200)
  expect(todos).toMatchSnapshot()
})
