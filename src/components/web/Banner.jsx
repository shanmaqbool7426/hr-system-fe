import { Button } from '@/components/elements'
import Image from 'next/legacy/image'
import React from 'react'

export default function Banner () {
  return (
    <section className='zt-banner pt-20 pb-10 bg-banner bg-no-repeat bg-center bg-cover'>
      <div className='container'>
        <div className='grid md:grid-cols-2 items-center'>
          <div className='zt-bannerContent pr-[9%]'>
            <h1><span className='text-themeOrange bg-gradient-to-l'>Innovative AI HR Solutions </span><span className={'block'}>That Grow Alongside </span> Your Business</h1>
            <p>Streamline your HR operations with powerful tools for attendance, leave management, and workforce analytics.</p>
            <Button type={'button'} variant={'primary'} value={'Get Started'} />
          </div>
          <figure className='zt-image flex justify-center'>
            <Image
              src={'/assets/imagesWeb/heroImage.png'}
              width={'585'}
              height={'567'}
              quality={100}
              priority={true}
              placeholder="blur"
              alt={'Banner Image'}
              blurDataURL={'/assets/imagesWeb/heroImage.png'}
            />
          </figure>
        </div>
      </div>
    </section>
  )
}

