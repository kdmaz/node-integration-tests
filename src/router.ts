import express from 'express'
import { router as todoController } from './todos/todo.controller'
export const router = express.Router()

router.use('/todos', todoController)
