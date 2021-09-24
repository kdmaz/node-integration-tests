import express, { Request, Response } from 'express'
import { getTodos } from './todo.service'

export const router = express.Router()

router.get('/', async (_: Request, res: Response) => {
  const todos = await getTodos()
  res.send(todos)
})
