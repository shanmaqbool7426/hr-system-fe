import React, { Fragment } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/legacy/image'
import Link from 'next/link'
import * as Yup from 'yup';
import { useFormik } from 'formik';


import LandingPage from '@/layouts/LandingPage'
import { Button, Input, Textarea } from '@/components/elements'
// import InnerBanner from '@/components/web/InnerBanner'

export default function ContactUsPage () {
  const router = useRouter()
  const pageName = router.pathname.substring(1);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      subject: Yup.string().required(),
      message: Yup.string().required(),
    }),
    onSubmit: async (values) => { }
  })

    return (
        <Fragment>
          {/* <InnerBanner pageTitle={'Contact Us'} /> */}
          <main id="main" className={`main page landingPageLayout grow flex flex-col py-12 md:py-20 page-${pageName}`}>
            <div className={'container grid grid-cols-2 gap-8 items-center'}>

              <div className={'flex flex-col'}>
                <h1 className={'text-h3'}>Contact Us</h1>
                <p className={'mb-16'}><span className="block">Zaffre is a Cloud based Social HR Software for SMEs.</span>Free for 05 Employees and as low as $ 2.0 per employee per month. <Link href={'/about-us'}>Learn More</Link></p>
                <figure className={'block mb-0'}>
                  <Image
                    src={'/assets/imagesWeb/contactUs.svg'}
                    width={894}
                    height={448}
                    quality={100}
                    priority={true}
                    placeholder="blur"
                    blurDataURL={'/assets/imagesWeb/contactUs.svg'}
                    alt={'Zaffre'}
                  />
                </figure>
              </div>

              <form className='p-8 rounded-2xl shadow-lg bg-slate-50'>
                <fieldset className="flex flex-col gap-6">
                  <Input
                    name="name"
                    type={'text'}
                    formik={formik}
                    label={'Name'}
                    value={formik.values.name}
                    required
                  />
                  <Input
                    name="email"
                    type={'email'}
                    formik={formik}
                    label={'Email'}
                    value={formik.values.email}
                    required
                  />
                  <Input
                    name="subject"
                    type={'text'}
                    formik={formik}
                    label={'Subject'}
                    // containerClass={'col-span-2'}
                    value={formik.values.subject}
                    required
                  />
                  <Textarea
                    name="message"
                    formik={formik}
                    label={'Message'}
                    // containerClass={'col-span-2'}
                    value={formik.values.message}
                    required
                  />
                  <Button
                    type={'button'}
                    variant={'primary'}
                    value={'Send Message'}
                    // className={'col-span-2'}
                  />
                </fieldset>
              </form>
            </div>
          </main>
        </Fragment>
    );
}

ContactUsPage.layout = LandingPage;