import React from 'react'
import { Comment } from '../../../typings'
import { notFound } from 'next/navigation'

export const dynamicParams = true

type PageProps = {
  params: {
    commentId: string
  }
}

const fetchComment = async (commentId: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments/${commentId}`, { next: { revalidate: 60 } })

  const comment: Comment = await res.json()
  console.log(comment)
  return comment
}

async function CommentPage({ params: { commentId } }: PageProps) {
  const comment = await fetchComment(commentId)

  if (!comment.id) {
    return notFound()
  }

  return (
    <figure className='md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800'>
      <img className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="https://cdn.elferspot.com/wp-content/uploads/2022/07/04/DSC04876-1800x1200.jpg" alt="" width="384" height="512" />
      <div className="pt-3 md:p-8 text-center md:text-left space-y-4">
        <blockquote>
        <p className="text-lg font-medium">
            {comment.id}
          </p>
          <p className="text-lg font-medium">
            {comment.title}
          </p>
        </blockquote>
        <figcaption className="font-medium">
          <div className="text-sky-500 dark:text-sky-400">
            UserId: {comment.userId}
          </div>
          <div className="text-slate-700 dark:text-slate-500">
            {comment.body}
          </div>
        </figcaption>
      </div>
    </figure>
  )
}

export default CommentPage


export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/comments/")
  const comments: Comment[] = await res.json()

  //Demo
  const trimmedComments = comments.splice(0, 10)

  return trimmedComments.map((comment) => ({
    commentId: comment.id.toString()
  }))
}