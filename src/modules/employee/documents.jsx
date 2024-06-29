import React from 'react'
import AppointmentCard from './documents/AppointmentCard'
import DocumentList from './documents/List'

export default function DocumentsModule () {
    return (
        <div className='grid grid-cols-1 gap-6 grow'>
            <AppointmentCard />
            <DocumentList />
        </div>
    )
}