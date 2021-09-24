import {
  NewTodoDto,
  NewTodoEntity,
  TodoDto,
  TodoEntity,
} from './todo.interface'
import {
  addTodoEntity,
  deleteTodoEntity,
  getTodoEntities,
} from './todo.repository'

function todoToDto(todoEntities: TodoEntity[]): TodoDto[] {
  return todoEntities.map(({ todo_id, description, is_complete }) => ({
    id: todo_id,
    desc: description,
    isComplete: is_complete,
  }))
}

function newTodoToEntity({ desc, isComplete }: NewTodoDto): NewTodoEntity {
  return {
    description: desc,
    is_complete: isComplete,
  }
}

export async function getTodos(): Promise<TodoDto[]> {
  const todoEntities = await getTodoEntities()
  return todoToDto(todoEntities)
}

export async function addNewTodo(newTodoDto: NewTodoDto): Promise<number> {
  const todoEntity = newTodoToEntity(newTodoDto)
  const todoID = await addTodoEntity(todoEntity)
  return todoID
}

export async function deleteTodo(todoId: number): Promise<void> {
  await deleteTodoEntity(todoId)
}
