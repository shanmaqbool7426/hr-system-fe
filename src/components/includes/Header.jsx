import React, { useState } from 'react'
import { Button } from '../elements'
import Link from 'next/link'
import Image from 'next/legacy/image'
import { CloseCross, HamburgerMenu } from '../svg';
import { useRouter } from 'next/router';

export default function Header () {
  const [toggle, setToggle] = useState(false);
  const router = useRouter();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLinkClick = () => {
    if (toggle) {
      setToggle(false);
    }
  };

  const isActive = (path) => {
    return router.pathname === path && '!text-themeOrange';
  };

  return (
    <header id={'zt-header'} className={'zt-header py-6 sticky top-0 left-0 z-10 backdrop-blur-sm bg-white/80 shadow'}>
      <div className='container flex justify-between'>
        <div className={'flex items-center gap-14'}>
          <strong className='zt-logo'>
            <Link href={'/'}>
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

          <nav id="zt-nav" className={`zt-nav ${toggle ? 'visible right-0 opacity-100' : '-right-full invisible opacity-0'}`}>
            <ul>
              <li><Link className={`zt-navLink ${isActive('/about-us')}`} href={'/about-us'} onClick={handleLinkClick}>About Us</Link></li>
              <li><Link className={`zt-navLink ${isActive('/why-zaffre')}`} href={'/why-zaffre'} onClick={handleLinkClick}>Why Zaffre</Link></li>
              <li><Link className={`zt-navLink ${isActive('/features')}`} href={'/features'} onClick={handleLinkClick}>Features</Link></li>
              <li><Link className={`zt-navLink ${isActive('/pricing')}`} href={'/pricing'} onClick={handleLinkClick}>Pricing</Link></li>
              <li><Link className={`zt-navLink ${isActive('/contact-us')}`} href={'/contact-us'} onClick={handleLinkClick}>Contact Us</Link></li>
              <li className='xl:!hidden'>
                <Link
                  className='block text-themeGrayscale hover:text-themeOrange font-semibold no-underline'href={'http://wa.me/+923134444265'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                >
                  +92-313-4444265
                </Link>
              </li>
              <li className='xl:!hidden'>
                <Link
                  href={'/sign-in'}
                  className={'btn btn-dark-outline no-underline'}
                  onClick={handleLinkClick}
                >Sign in</Link>
              </li>
              <li className='sm:!hidden'>
                <Button
                  type={'button'}
                  variant={'primary'}
                  value={'Get a Free Demo'}
                />
              </li>
            </ul>
          </nav>
        </div>

        <div className='flex items-center gap-4'>
          <span className="btn btn-dark-outline cursor-pointer xl:hidden w-[46px] h-[46px] !p-0 justify-start items-center" onClick={handleToggle}>{toggle ? <CloseCross width={28} height={28} /> : <HamburgerMenu />}</span>
          <Link className='mr-4 no-underline text-themeGrayscale font-semibold hidden xl:inline-block' href={'http://wa.me/+923134444265'} target="_blank" rel="noopener noreferrer">+92-313-4444265</Link>
          <Link  href={'/sign-in'} className={'btn btn-dark-outline no-underline !hidden xl:!inline-flex'}>Sign in</Link>
          <Button className={'!hidden sm:!inline-flex'} type={'button'} variant={'primary'} value={'Get a Free Demo'} />
        </div>
      </div>
    </header>
  )
}