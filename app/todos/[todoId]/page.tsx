import React from 'react'
import { Todo } from '../../../typings'
import {notFound} from 'next/navigation'

export const dynamicParams=true

type PageProps = {
  params: {
    todoId: string
  }
}

const fetchTodo = async (todoId: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, { next: { revalidate: 60 } })
  const todo: Todo = await res.json()
  return todo
}

async function TodoPage({ params: { todoId } }: PageProps) {
  const todo = await fetchTodo(todoId)

  if (!todo.id) {
    return notFound()
  }

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-10 bg-yellow border-2 m-2 text-dark shadow-lg">
        <p>{todo.title}</p>
        <p>{todo.completed ? 'Ja' : 'Nein'}</p>
        <p className='border-t border-black mt-5 text-right'>{todo.userId}</p>
      </div>
    </div>

  )
}

export default TodoPage


export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/")
  const todos: Todo[] = await res.json()

  //Demo
  const trimmedTodos= todos.splice(0,10)

  return trimmedTodos.map((todo) => ({
    todoId: todo.id.toString()
  }))
}