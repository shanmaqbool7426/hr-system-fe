import { CheckBox, Table, ToggleCheck } from "@/components/elements";
import { useTranslation } from "next-i18next";
import { useState } from "react";

export default function EmployeeAvailingPage() {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const headings = [
        { title: t("Date"), col: 'Date' },
        { title: t("Day"), col: 'Day' },
        { title: t("Lunch Menu"), col: "LunchMenu" },
        { title: t("Dinner Menu"), col: "DinnerMenu" },
        { title: t("Avail"), col: "Avail" },
    ]
    const rows = [{

        Date: "01 April 2024",
        Day: "Monday",
        LunchMenu: "Chicken Biryani",
        DinnerMenu: "Chicken Biryani",
        Avail: <div className='flex justify-end'><ToggleCheck id={'Mon'} /></div>,
    },
    {

        Date: "02 April 2024",
        Day: "Tuesday",
        LunchMenu: "Chicken Biryani",
        DinnerMenu: "Chicken Biryani",
        Avail: <div className='flex justify-end'><ToggleCheck id={'tue'} /></div>,
    },
    {

        Date: "03 April 2024",
        Day: "Wednesday",
        LunchMenu: "Chicken Biryani",
        DinnerMenu: "Chicken Biryani",
        Avail: <div className='flex justify-end'><ToggleCheck id={'Wedneday'} /></div>,
    },
    {
        sr: <div className="flex items-center">
            <CheckBox
                id={`4`}
                size={'sm'}
                variant={'dark'}
            />
        </div>,
        SerailNo: '4',
        Date: "04 April 2024",
        Day: "Thrusday",
        LunchMenu: "Chicken Biryani",
        DinnerMenu: "Chicken Biryani",
        Avail: <div className='flex justify-end'><ToggleCheck id={'Thrusday'} /></div>,
    },
    {
        sr: <div className="flex items-center">
            <CheckBox
                id={`5`}
                size={'sm'}
                variant={'dark'}
            />
        </div>,
        SerailNo: '5',
        Date: "05 April 2024",
        Day: "Friday",
        LunchMenu: "Chicken Biryani",
        DinnerMenu: "Chicken Biryani",
        Avail: <div className='flex justify-end'><ToggleCheck id={'Friday'} /></div>,
    },
    {
        sr: <div className="flex items-center">
            <CheckBox
                id={`6`}
                size={'sm'}
                variant={'dark'}
            />
        </div>,
        SerailNo: '6',
        Date: "06 April 2024",
        Day: "Satuarday",
        LunchMenu: "Chicken Biryani",
        DinnerMenu: "Chicken Biryani",
        Avail: <div className='flex justify-end'><ToggleCheck id={'Satuarday'} /></div>,
    },
    {
        sr: <div className="flex items-center">
            <CheckBox
                id={`7`}
                size={'sm'}
                variant={'dark'}
            />
        </div>,
        SerailNo: '7',
        Date: "07 April 2024",
        Day: "Sunday",
        LunchMenu: "Chicken Biryani",
        DinnerMenu: "Chicken Biryani",
        Avail: <div className='flex justify-end'><ToggleCheck id={'Sunday'} /></div>,
    },
    ]
    return (
        <section className="flex flex-col grow">
            <div className="flex justify-between items-center pb-6">
                <div className="">
                    <h1 className="text-h4 mb-0">{t("Employee Availing")}</h1>
                </div>
            </div>
            <div className=" zt-card grow">
                <Table
                    headings={headings}
                    rows={rows}
                    sortCol={sortCol}
                    setSortCol={setSortCol}
                    sortDir={sortDir}
                    setSortDir={setSortDir}
                    perPage={perPage}
                    setPerPage={setPerPage}
                    page={page}
                    setPage={setPage}
                    className={'zt-employeeTable zt-viewExemptionTable'}
                />
            </div>
        </section>
    )
}