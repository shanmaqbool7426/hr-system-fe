
import { Button } from '@/components/elements'
import Image from 'next/legacy/image'

export default function JobManagement () {
  return (
    <section className='zt-section zt-section--jobManagement py-20 bg-themeGrayscale text-white'>
      <div className='container'>
        <div className='gap-12 grid lg:gap-0 lg:grid-cols-2 items-center'>
          <div className='zt-bannerContent pr-[9%]'>
            <h1 className='text-white'>Revolutionize <span className={'block'}>recruitment with <span className='text-themeOrange'>AI-driven</span> </span>Jobs Management.</h1>
            <p>Revolutionize your recruitment process with our AI-driven jobs management solution. Streamline job postings, applicant tracking, and candidate evaluation with advanced AI algorithms that enhance efficiency and accuracy. Experience seamless integration and intuitive interface that simplifies hiring and empowers your HR team to make data-driven decisions.</p>
            <Button type={'button'} variant={'primary'} value={'Get Started'} />
          </div>
          <figure className='zt-image flex justify-center'>
            <Image
              src={'/assets/imagesWeb/image-03.svg'}
              width={'626'}
              height={'448'}
              quality={100}
              priority={true}
              placeholder="blur"
              alt={'HR Strategy'}
              blurDataURL={'/assets/imagesWeb/image-03.svg'}
            />
          </figure>
        </div>
      </div>
    </section>
  )
}