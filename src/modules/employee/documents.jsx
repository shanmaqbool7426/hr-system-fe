import React from 'react'
import DocumentList from './documents/List'

export default function DocumentsModule () {
    return (
        <div className='grid grid-cols-1 gap-6 grow'>
            <DocumentList />
        </div>
    )
}