
import { Button } from '@/components/elements'
import Image from 'next/legacy/image'

export default function HRSystems () {
  return (
    <section className='zt-section zt-section--HrSystems py-20'>
      <div className='container'>
        <div className='gap-12 grid lg:gap-0 lg:grid-cols-2 items-center'>
          <figure className='zt-image flex justify-center'>
            <Image
              src={'/assets/imagesWeb/image-02.svg'}
              width={'635'}
              height={'410'}
              quality={100}
              priority={true}
              placeholder="blur"
              alt={'HR Strategy'}
              blurDataURL={'/assets/imagesWeb/image-02.svg'}
            />
          </figure>
          <div className='zt-bannerContent pl-[9%]'>
            <h1 className=''>Consolidate all your <span className={'block'}><span className='text-themeOrange'>HR Needs </span>into one </span>unified platform.</h1>
            <p>Our intuitive dashboard empowers employees by providing easy access to attendance data, leave balances, and comprehensive work schedules. It enables seamless leave requests and attendance management, ensuring efficiency and transparency in workforce operations.</p>
            <Button type={'button'} variant={'primary'} value={'Get Started'} />
          </div>
        </div>
      </div>
    </section>
  )
}


