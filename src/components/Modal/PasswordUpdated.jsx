import React from 'react'
import Button from '../elements/Button'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { CloseCross } from '../svg'
import Modal from "./Modal"
import Link from 'next/link'

const PasswordUpdated = ({ open, setOpen }) => {
  const { t } = useTranslation()
  return (
    <Modal show={open} hide={() => { }} >
      <div className={`zt-modalContent zt-modalContentSuccess relative zt-sm`}>
        <button type="button" className=" text-primary text-xl absolute top-8 right-8" onClick={() => { setOpen(false) }}>
          <CloseCross />
        </button>
        <div className='zt-modalBody flex flex-col items-center text-center'>
          <figure className='mb-8'><Image src={'assets/images/success.svg'} alt={'success image'} width={265} height={140} /></figure>
          <h2 className='text-h3'>{t('passwordUpdated.title')}</h2>
          <p className='mb-8 text-lg'>{t('passwordUpdated.subTitle')}</p>
          <Link className='no-underline' href={"/sign-in"}><Button value={t('Back to sign in')} variant={'primary'} className={'w-full'} /></Link>
        </div>
      </div>
    </Modal>
  )
}

export default PasswordUpdated