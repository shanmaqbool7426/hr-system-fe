import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'next-i18next'

export const TopEmployee = () => {
    const { t } = useTranslation()
    const employeeData = [
        { img: "/assets/images/users/user-01.jpg", name: "Marguerite Fadel", score: "90%" },
        { img: "/assets/images/users/user-02.jpg", name: "Terence Mante", score: "80%" },
        { img: "/assets/images/users/user-03.jpg", name: "Dr. Shelly Haley", score: "75%" },
        { img: "/assets/images/users/user-04.jpg", name: "Bernice Crist", score: "70%" },
        { img: "/assets/images/users/user-05.jpg", name: "Lynette Gerhold II", score: "70%" },
        { img: "/assets/images/users/user-06.jpg", name: "Lynette Gerhold II", score: "70%" },
        { img: "/assets/images/users/user-02.jpg", name: "Terence Mante", score: "80%" },
        { img: "/assets/images/users/user-04.jpg", name: "Bernice Crist", score: "70%" },
    ]
    return (
        <>
            <div className={`zt-card col-span-3 flex flex-col`}>
                <h2 className="mb-4 font-bold text-lg text-center text-themePurple">{t("Top Performance Employees")}</h2>
                <div className="flex justify-evenly flex-wrap gap-4">
                    {employeeData.map((ele, i) => (
                        <div key={i} className="flex flex-col items-center min-w-24">
                            <figure>
                                <Image src={ele.img} alt="Profile" height={100} width={100} className="rounded-full" />
                            </figure>
                            <h3 className="text-xs font-semibold mb-2">{ele.name}</h3>
                            <span className="text-xs font-semibold text-themePurple">{ele.score}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
