import ProgressBar from '@/components/elements/ProgressBar'
import React from 'react'
import { useTranslation } from 'next-i18next'

export const Staticts = () => {
    const { t } = useTranslation()

    return (
        <div className='zt-card col-span-3 xl:col-span-1'>
            <h2 className='mb-4 font-bold text-xl'>{t("Statistics")}</h2>
            <div className='flex flex-col gap-2'>
                <ProgressBar
                    title={"Today"}
                    statics={"07:59 / 8 hrs"}
                    percentage={"40%"}
                    variant={'success'}
                    containerClasses={'flex flex-col gap-4 p-3 border rounded-lg'}
                    titleBarClasses={'mb-0 flex justify-between text-bmd'}
                    progressClasses={'flex flex-col'}
                    progressBarClasses={'grow rounded-full'}
                />
                <ProgressBar
                    title={"This Week"}
                    statics={"07:59 / 8 hrs"}
                    percentage={"40%"}
                    variant={'lightOrange'}
                    containerClasses={'flex flex-col gap-4 p-3 border rounded-lg'}
                    titleBarClasses={'mb-0 flex justify-between text-bmd'}
                    progressClasses={'flex flex-col'}
                    progressBarClasses={'grow rounded-full'}
                />
                <ProgressBar
                    title={"This Month"}
                    statics={"07:59 / 8 hrs"}
                    percentage={"80%"}
                    variant={'primary'}
                    containerClasses={'flex flex-col gap-4 p-3 border rounded-lg'}
                    titleBarClasses={'mb-0 flex justify-between text-bmd'}
                    progressClasses={'flex flex-col'}
                    progressBarClasses={'grow rounded-full'}
                />
                <ProgressBar
                    title={"Remaining"}
                    statics={"07:59 / 8 hrs"}
                    percentage={"80%"}
                    variant={'purple'}
                    containerClasses={'flex flex-col gap-4 p-3 border rounded-lg'}
                    titleBarClasses={'mb-0 flex justify-between text-bmd'}
                    progressClasses={'flex flex-col'}
                    progressBarClasses={'grow rounded-full'}
                />
                <ProgressBar
                    title={"Overtime"}
                    statics={"07:59 / 8 hrs"}
                    percentage={"50%"}
                    variant={'themeBlue'}
                    containerClasses={'flex flex-col gap-4 p-3 border rounded-lg'}
                    titleBarClasses={'mb-0 flex justify-between text-bmd'}
                    progressClasses={'flex flex-col'}
                    progressBarClasses={'grow rounded-full'}
                />
            </div>
        </div>
    )
}