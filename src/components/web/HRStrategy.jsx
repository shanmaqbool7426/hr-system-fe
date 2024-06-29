
import { Button } from '@/components/elements'
import Image from 'next/legacy/image'

export default function HRStrategy () {
  return (
    <section className='zt-section zt-section--HrStrategy py-20 bg-themeGrayscale'>
      <div className='container'>
        <div className='gap-12 grid lg:gap-0 lg:grid-cols-2 items-center'>
          <div className='zt-bannerContent pr-[9%] text-white'>
            <h1 className='text-white'><span>Elevate your </span><span className={'block'}><span className='text-themeOrange'>HR Strategy</span> with Our </span>Innovative employee module.</h1>
            <p>Embark on an HR revolution with our advanced employee module. Integrating AI technology, we empower your organization to evaluate employees based on work, attendance, and task performance, enhancing efficiency and productivity.</p>
            <Button type={'button'} variant={'primary'} value={'Get Started'} />
          </div>
          <figure className='zt-image flex justify-center'>
            <Image
              src={'/assets/imagesWeb/image-01.svg'}
              width={'611'}
              height={'423'}
              quality={100}
              priority={true}
              placeholder="blur"
              alt={'HR Strategy'}
              blurDataURL={'/assets/imagesWeb/image-01.svg'}
            />
          </figure>
        </div>
      </div>
    </section>
  )
}

