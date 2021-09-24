import supertest from 'supertest'
import { app } from '../src/app'
import { pool } from '../src/db'

const request = supertest(app)

afterAll(() => {
  pool.end()
})

test('get all todos', async () => {
  const { body: todos, statusCode } = await request.get('/api/todos')
  expect(statusCode).toBe(200)
  expect(todos).toMatchSnapshot()
})
