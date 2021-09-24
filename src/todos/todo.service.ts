import { TodoDto, TodoEntity } from './todo.interface'
import { getTodoEntities } from './todo.repository'

function todoMapper(todoEntities: TodoEntity[]): TodoDto[] {
  return todoEntities.map(({ todo_id, description, is_complete }) => ({
    id: todo_id,
    desc: description,
    isComplete: is_complete,
  }))
}

export async function getTodos(): Promise<TodoDto[]> {
  const todoEntities = await getTodoEntities()
  return todoMapper(todoEntities)
}
