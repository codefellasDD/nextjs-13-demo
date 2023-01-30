import Link from 'next/link';
import React, { Suspense } from 'react'
import {  Todo } from "../../typings";
import Loading from '../Loading';

const fetchTodos = async ()=>{
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/")
    const todos: Todo[] = await res.json()
    return todos
}

export default async function TodosList() {
    const todos = await fetchTodos()
  return <Suspense fallback={<Loading />}>
  {todos.map((todo) => (
    <p key={todo.id}>
      <Link href={`/todos/${todo.id}`}>Todo: {todo.id}</Link>
    </p>
  ))}
  </Suspense>
}
