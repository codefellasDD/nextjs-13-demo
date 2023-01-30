import React from 'react';
import CommentsList from './CommentsList'

export default function RootLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <main className='flex'>
            <div>
                {/*@ts-ignore */}
                <CommentsList />
            </div>
            <div className='flex-initial w-50'>
                {children}
            </div>
        </main>
    )
}