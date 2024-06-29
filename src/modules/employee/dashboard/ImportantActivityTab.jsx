import Image from 'next/image'
import React from 'react'

export const ImportantActivityTab = () => {
    const data = [
        {
            msg: "Your leave request has been",
            time: "02:10 PM    |   21 Apr 2024"
        },
        {
            msg: "You’re enrolled in upcomming",
            time: "02:10 PM    |   21 Apr 2024"
        },
        {
            msg: "Your annual compliance trail",
            time: "02:10 PM    |   21 Apr 2024"
        },
        {
            avatar: "/assets/images/users/user-01.jpg",
            msg: "Jessica has requested feedback",
            time: "02:10 PM    |   21 Apr 2024"
        },
        {
            msg: "Your annual compliance trail",
            time: "02:10 PM    |   21 Apr 2024"
        },
        {
            msg: "Your leave request has been",
            time: "02:10 PM    |   21 Apr 2024"
        },
        {
            msg: "You’re enrolled in upcomming",
            time: "02:10 PM    |   21 Apr 2024"
        },
        {
            msg: "Your annual compliance trail",
            time: "02:10 PM    |   21 Apr 2024"
        },
    ]
    return (
        <div className='flex flex-col gap-2 2xl:h-[calc(100dvh_-_294px)] zt-hideScrollbar 2xl:overflow-y-scroll'>
            {data.map((ele, i) => (
                <div key={i} className='p-4 rounded-lg bg-themeGrayscale50 flex gap-2 items-center'>
                    {ele.avatar ?
                        <figure className='shrink-0'>
                            <Image src={ele.avatar} height={48} width={48} alt='Avarat' className='rounded-full' />
                        </figure> :
                        <span className='h-12 w-12 rounded-full flex justify-center items-center font-semibold text-lg bg-themeLightBlue text-themeBlue uppercase'>
                            hr
                        </span>
                    }
                    <div className='flex flex-col text-sm gap-2'>
                        <span className='font-semibold w-4/5 truncate'>{ele.msg}</span>
                        <span className='text-themeGrayscale600'>{ele.time}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
