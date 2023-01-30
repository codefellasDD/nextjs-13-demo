import Link from 'next/link';
import React, { Suspense } from 'react'
import {  Comment } from "../../typings";
import Loading from '../Loading';

const fetchComments = async ()=>{
    const res = await fetch("https://jsonplaceholder.typicode.com/comments/")
    const comments: Comment[] = await res.json()
    return comments
}

export default async function CommentsList() {
    const comments = await fetchComments()
  return <Suspense fallback={<Loading />}>
  {comments.map((comment) => (
    <p key={comment.id}>
      <Link href={`/comments/${comment.id}`}>Comment: {comment.id}</Link>
    </p>
  ))}
  </Suspense>
}
