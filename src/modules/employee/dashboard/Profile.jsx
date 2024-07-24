
import Image from 'next/image';
import React from 'react'
import { useTranslation } from 'react-i18next';

export const Profile = () => {
    const { t } = useTranslation();

    return (
        <div className='rounded-lg py-12 px-8 flex gap-4 flex-col lg:flex-row justify-between items-center bg-darkestPurple bg-cover' style={{ backgroundImage: `url(/assets/images/asset/employee-bg.png)` }}>
            <div className='text-white'>
                <h2 className='text-xl font-bold mb-2 text-white'>{t("Employee of the month")}</h2>
                <p className='mb-8 text-sm lg:w-4/5'>{t("We are really proud of the difference you have made which gives everybody the reason to applaud & appreciate")}</p>
                <h3 className='mb-2 font-bold text-xl text-white'>{t("Congrats, Hanna")}</h3>
                <p className='text-sm mb-0'>{t("UI/UX Team Lead")}</p>
            </div>
            <div className='bg-white shrink-0 zt-employeeProfile p-3 relative'>
                <figure>
                    <Image className='z-20 relative' height={134} width={122} src={'/assets/images/users/profile.png'} alt='Profile'/>
                </figure>
            </div>
        </div>
    )
}
