
import { Button } from '@/components/elements'
import React from 'react'

export default function HRProcess () {
  return (
    <section className='zt-section zt-section--hrProcess pt-10'>
      <div className='container'>
        <div className='bg-hrProcess bg-no-repeat bg-center bg-cover text-center rounded-3xl overflow-hidden min-h-[444px] max-w-[1130px] mx-auto flex flex-col justify-center items-center'>
            <h2 className='text-white mb-6'>Learn How <span className='bg-white pt-1 pb-2 rounded-xl leading-none inline-block px-4 text-[#7239ea]'>Zaffre</span> Can <span className='block'>Improve Your HR Process</span></h2>
            <Button type={'button'} variant={'primary-outline'} value={'Schedule A Demo'} className={'!text-white !bg-white/10 !border-white/30'} />
        </div>
      </div>
    </section>
  )
}


