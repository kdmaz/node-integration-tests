export interface TodoEntity {
  todo_id: number
  description: string
  is_complete: boolean
}

export interface TodoDto {
  id: number
  desc: string
  isComplete: boolean
}

export type NewTodoEntity = Omit<TodoEntity, 'todo_id'>

export type NewTodoDto = Omit<TodoDto, 'id'>
