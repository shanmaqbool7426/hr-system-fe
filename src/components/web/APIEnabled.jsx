import { Button } from '@/components/elements'
import Image from 'next/legacy/image'

export default function APIEnabled () {
  return (
    <section className='zt-section zt-section--apiEnabled py-20'>
      <div className='container'>
        <div className='gap-12 grid lg:gap-0 lg:grid-cols-2 items-center'>
          <figure className='zt-image flex justify-center'>
            <Image
              src={'/assets/imagesWeb/image-04.svg'}
              width={'540'}
              height={'468'}
              quality={100}
              priority={true}
              placeholder="blur"
              alt={'HR Strategy'}
              blurDataURL={'/assets/imagesWeb/image-04.svg'}
            />
          </figure>
          <div className='zt-bannerContent pl-[9%]'>
            <h1 className=''><span className='text-themeOrange'>Integrate seamlessly</span><span className={'block'}> with any API Enabled </span>platform</h1>
            <p>Achieve seamless integration with our platform, designed to effortlessly connect with any API-enabled system. Whether enhancing existing workflows or expanding capabilities, our solution ensures smooth interoperability to meet your business needs effectively.</p>
            <Button type={'button'} variant={'primary'} value={'Get Started'} />
          </div>
        </div>
      </div>
    </section>
  )
}


