import Image from 'next/legacy/image'
import Link from 'next/link'
import React from 'react'
import { EmailIcon, Facebook, Instagram, LinkedIn, PhoneIcon, XIcon, YouTube } from '../svg'

export default function Footer() {
  return (
    <footer id={'zt-footer'} className={'zt-footer bg-themeGrayscale50'}>
      <div className='container pt-12'>
        <div className='grid grid-cols-12 justify-between pb-8'>
          <div className='col-span-12 lg:col-span-3 flex flex-col'>
            <strong className='zt-logo w-[115px] h-[36px] block'>
              <Link className='block leading-none' href={'/'}>
                <Image
                  src={'/zaffre.png'}
                  width={117}
                  height={37}
                  quality={100}
                  priority={true}
                  placeholder="blur"
                  blurDataURL={'/zaffre.png'}
                  alt={'Zaffre'}
                />
              </Link>
            </strong>
            <span className='block mb-4'>Your HR Transformation Partner</span>
            <p>Explore Zaffre, your partner in innovative ERP solutions specializing in HR management and beyond.</p>
          </div>

          <div className='col-span-12 lg:col-span-9 xl:col-span-8 xl:col-start-5 grid grid-cols-6 gap-y-8 gap-x-4 md:gap-4'>
            <nav className='col-span-3 md:col-span-1'>
              <strong className={'block text-h6 mb-4'}>Company</strong>
              <ul className='zt-navAdditional flex flex-col gap-2'>
                <li><Link className={'block text-themeGrayscale no-underline text-sm'} href={'/about-us'}>About Us</Link></li>
                <li><Link className={'block text-themeGrayscale no-underline text-sm'} href={'/careers'}>Careers</Link></li>
                <li><Link className={'block text-themeGrayscale no-underline text-sm'} href={'/blog'}>Blog</Link></li>
                <li><Link className={'block text-themeGrayscale no-underline text-sm'} href={'/contact-us'}>Contact Us</Link></li>
                <li><Link className={'block text-themeGrayscale no-underline text-sm'} href={'/data-security'}>Data Security</Link></li>
              </ul>
            </nav>
            <nav className='col-span-3 md:col-span-1'>
              <strong className={'block text-h6 mb-4'}>Support</strong>
              <ul className='zt-navAdditional flex flex-col gap-2'>
                <li><Link className={'block text-themeGrayscale no-underline text-sm'} href={'/faqs'}>FAQ’s</Link></li>
                <li><Link className={'block text-themeGrayscale no-underline text-sm'} href={'/dedicated-support'}>Dedicated Support</Link></li>
                <li><Link className={'block text-themeGrayscale no-underline text-sm'} href={'/services'}>Services</Link></li>
                <li><Link className={'block text-themeGrayscale no-underline text-sm'} href={'/partner-with-us'}>Partner With Us</Link></li>
              </ul>
            </nav>
            <nav className='col-span-6 sm:col-span-3 md:col-span-2'>
              <strong className={'block text-h6 mb-4'}>Contact</strong>
              <ul className='zt-navAdditional flex flex-col gap-2 text-bmd'>
                <li className='flex gap-4 items-center'>
                  <PhoneIcon />
                  <Link className='no-underline text-themeGrayscale' href={'http://wa.me/+923134444265'} target="_blank" rel="noopener noreferrer">+92-313-4444265</Link>
                </li>
                <li className='flex gap-4 items-center'>
                  <EmailIcon />
                  <span>info@zaffretech.co</span>
                </li>
                <li>
                  <ul className='zt-socialIcons flex gap-2 pt-4'>
                    <li><Link target={'_blank'} href={'https://www.linkedin.com/'}><LinkedIn /></Link></li>
                    <li><Link target={'_blank'} href={'https://www.facebook.com/'}><Facebook /></Link></li>
                    <li><Link target={'_blank'} href={'https://twitter.com/'}><XIcon className={'rounded-lg overflow-hidden'} /></Link></li>
                    <li><Link target={'_blank'} href={'https://youtube.com/'}><YouTube /></Link></li>
                    <li><Link target={'_blank'} href={'https://instagram.com/'}><Instagram /></Link></li>
                  </ul>
                </li>
              </ul>
            </nav>
            <div className='col-span-6 sm:col-span-3 md:col-span-2 flex flex-col gap-4'>
              <strong className={'block text-h6 mb-0'}>Locations</strong>
              <address className={'text-bmd not-italic'}><strong>United State:</strong> 9243 Aspen Ln. Des Plaines. Illinois- 60016</address>
              <address className={'text-bmd not-italic'}><strong>Pakistan:</strong> 92 - E2 Block, Beas Ave, Wapda Town, Phase 1, Lahore</address>
            </div>
          </div>
        </div>
        <div className='zt-copyRight gap-3 flex flex-col sm:flex-row justify-between items-center py-6 border-t'>
          <p className='mb-0'>&copy; 2024 Zaffre Tech. All rights reserved.</p>
          <nav>
            <ul className='zt-navAdditional flex'>
              <li><Link className={'block text-themeGrayscale no-underline text-sm'} href={'/privacy-policy'}>Privacy Policy</Link></li>
              <li><Link className={'block text-themeGrayscale no-underline text-sm'} href={'/terms-&-condition'}>Terms & Condition</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}