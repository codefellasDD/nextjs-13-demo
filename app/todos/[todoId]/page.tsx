import React from 'react'
import { Todo } from '../../../typings'
import { notFound } from 'next/navigation'

export const dynamicParams = true

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
    <figure className='md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800'>
      <img className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="https://cdn.elferspot.com/wp-content/uploads/2022/07/04/DSC04876-1800x1200.jpg" alt="" width="384" height="512" />
      <div className="pt-3 md:p-8 text-center md:text-left space-y-4">
        <blockquote>
        <p className="text-lg font-medium">
            {todo.id}
          </p>
          <p className="text-lg font-medium">
            {todo.title}
          </p>
        </blockquote>
        <figcaption className="font-medium">
          <div className="text-sky-500 dark:text-sky-400">
            UserId: {todo.userId}
          </div>
          <div className="text-slate-700 dark:text-slate-500">
            {todo.completed?'Fertig':'In Bearbeitung'}
          </div>
        </figcaption>
      </div>
    </figure>
  )

  // return (
  //   <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  //     <div className="p-10 bg-yellow border-2 m-2 text-white shadow-lg">
  //       <p className='text-white'>{todo.title}</p>
  //       <p className='text-white'>{todo.completed ? 'Ja' : 'Nein'}</p>
  //       <p className='border-t border-black mt-5 text-white text-right'>{todo.userId}</p>
  //     </div>
  //   </div>

  // )
}

export default TodoPage


export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/")
  const todos: Todo[] = await res.json()

  //Demo
  const trimmedTodos = todos.splice(0, 10)

  return trimmedTodos.map((todo) => ({
    todoId: todo.id.toString()
  }))
}