import { Button, Input } from '@/components/elements'
import Link from 'next/link'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'

const PaymentContact = () => {
    const { t } = useTranslation()
    const [code, setCode] = useState(false)
    return (
        <div className="zt-card w-1/4">
            <h2 className='text-h5'>{t("Billing contact")}</h2>
            <p className='mb-0'> {t("Having trouble? Please feel free to")}</p>
            <Link className='font-extrabold no-underline mb-6 text-themeSuccess block' href={'#'}>{t("contact us.")}</Link>
            <div className='!bg-themeGrayscale100 zt-card'>
                <span onClick={() => { setCode(!code) }} className='text-center mb-4 text-themeSuccess font-extrabold cursor-pointer block'>{t("Have a promo code?")}</span>
                {code &&
                    <div className='flex gap-3'>
                        <Input placeholder='Enter code' containerClass={'grow'}/>
                        <Button className={'btn btn-success'}>{t("Apply")}</Button>
                    </div>}
            </div>
        </div>
    )
}

export default PaymentContact
