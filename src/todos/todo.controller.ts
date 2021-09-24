import express, { Request, Response } from 'express'
import { NewTodoDto } from './todo.interface'
import { addNewTodo, deleteTodo, getTodos } from './todo.service'

export const router = express.Router()

router.get('/', async (_: Request, res: Response) => {
  const todos = await getTodos()
  res.send(todos)
})

router.post('/', async (req: Request, res: Response) => {
  const newTodoDto: NewTodoDto = req.body
  const todoId = await addNewTodo(newTodoDto)
  res.status(201).send({ todoId })
})

router.delete('/:todo_id', async (req: Request, res: Response) => {
  const todoId = +req.params.todo_id
  await deleteTodo(todoId)
  res.status(204).send()
})
