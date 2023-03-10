import { RecordWithTtl } from 'dns';
import React from 'react';
import TodosList from './TodosList'

export default function RootLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <main className='flex'>
            <div>
                {/*@ts-ignore */}
                <TodosList />
            </div>
            <div className='flex-initial w-50'>
                {children}
            </div>
        </main>
    )
}