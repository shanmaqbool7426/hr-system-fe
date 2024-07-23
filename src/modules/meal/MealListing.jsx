import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Edit, FilledClockIcon, MealMenuIcon } from '@/components/svg'
import CreateMealMenuForm from "@/components/forms/meal/create-meal-menu";
import { Button, CheckBox, SearchSelect, Table, ToggleCheck } from '@/components/elements'

const MealListing = () => {
  const { t } = useTranslation()
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)
  const meal = [
    {
      meal: "Lunch",
      menu: "Chicken Biryani"
    },
    {
      meal: "Dinner",
      menu: "Chaines Rice"
    },
  ]
  const mealTiming = [
    {
      meal: "Lunch",
      time: "1:00PM - 2:00PM"
    },
    {
      meal: "Dinner",
      time: "7:00PM - 8:00PM"
    },
  ]
  const employees = [
    {
      display: <div className='flex gap-2'>
        <figure><Image src={'/assets/images/users/user-01.jpg'} alt='employee' height={24} width={24} className='rounded-full' /></figure>
        <span className='font-semibold'>{t("John")}</span>
      </div>,
      value: "John"
    },
    {
      display: <div className='flex gap-2'>
        <figure><Image src={'/assets/images/users/user-02.jpg'} alt='employee' height={24} width={24} className='rounded-full' /></figure>
        <span className='font-semibold'>{t("Alicia Berge")}</span>
      </div>,
      value: "Alicia Berge"
    },
  ]
  const months = [
    { display: 'January 2024', value: "January 2024" },
    { display: 'February 2024', value: "February 2024" },
    { display: 'March 2024', value: "March 2024" },
    { display: 'April 2024', value: "April 2024" },
    { display: 'May 2024', value: "May 2024" },
    { display: 'June 2024', value: "June 2024" },
    { display: 'July 2024', value: "July 2024" },
    { display: 'August 2024', value: "August 2024" },
    { display: 'September 2024', value: "September 2024" },
    { display: 'October 2024', value: "October 2024" },
    { display: 'November 2024', value: "November 2024" },
    { display: 'December 2024', value: "December 2024" },
  ]
  const headings = [
   
    { title: t("Date"), col: 'Date' },
    { title: t("Day"), col: 'Day' },
    { title: t("Lunch Menu"), col: "LunchMenu" },
    { title: t("Dinner Menu"), col: "DinnerMenu" },
    { title: t("Avail"), col: "Avail" },
    { title: t("Lock"), col: "Lock" },
  ]
  const rows = [{
 
    Date: "01 April 2024",
    Day: "Monday",
    LunchMenu: "Chicken Biryani",
    DinnerMenu: "Chicken Biryani",
    Avail: <div className='flex justify-center'><ToggleCheck id={'Mon'} /></div>,
    Lock: <div className='flex justify-end'><ToggleCheck id={'LockMon'} /></div>,
  },
  {
   
    Date: "02 April 2024",
    Day: "Tuesday",
    LunchMenu: "Chicken Biryani",
    DinnerMenu: "Chicken Biryani",
    Avail: <div className='flex justify-center'><ToggleCheck id={'tue'} /></div>,
    Lock: <div className='flex justify-end'><ToggleCheck id={'LockTue'} /></div>,
  },
  {
   
    Date: "03 April 2024",
    Day: "Wednesday",
    LunchMenu: "Chicken Biryani",
    DinnerMenu: "Chicken Biryani",
    Avail: <div className='flex justify-center'><ToggleCheck id={'Wedneday'} /></div>,
    Lock: <div className='flex justify-end'><ToggleCheck id={'LockWed'} /></div>,
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
    Avail: <div className='flex justify-center'><ToggleCheck id={'Thrusday'} /></div>,
    Lock: <div className='flex justify-end'><ToggleCheck id={'LockThr'} /></div>,
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
    Avail: <div className='flex justify-center'><ToggleCheck id={'Friday'} /></div>,
    Lock: <div className='flex justify-end'><ToggleCheck id={'LockFri'} /></div>,
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
    Avail: <div className='flex justify-center'><ToggleCheck id={'Satuarday'} /></div>,
    Lock: <div className='flex justify-end'><ToggleCheck id={'LockSat'} /></div>,
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
    Avail: <div className='flex justify-center'><ToggleCheck id={'Sunday'} /></div>,
    Lock: <div className='flex justify-end'><ToggleCheck id={'LockSun'} /></div>,
  },
  ]
  return (
    <div className='lg:w-3/4 flex flex-col gap-6'>
      <div className='rounded-2xl text-white p-8 flex flex-col gap-8 md:flex-row bg-primary bg-cover' style={{ backgroundImage: `url(/assets/images/asset/meal-bg.png)` }}>
        <div className='lg:w-2/5 flex flex-col gap-8'>
          {meal.map((ele, i) => (
            <div key={i} className='flex gap-4'>
              <span>
                <MealMenuIcon />
              </span>
              <div className='flex flex-col'>
                <span className='text-xs'>{t("Today")} {ele.meal}</span>
                <span className='font-bold'>{ele.menu}</span>
              </div>
            </div>
          ))}
        </div>
        <div className='lg:w-2/5 flex flex-col gap-8'>
          {mealTiming.map((ele, i) => (
            <div key={i} className='flex gap-4'>
              <span>
                <FilledClockIcon />
              </span>
              <div className='flex flex-col'>
                <span className='text-xs'>{ele.meal} {t("Time")}</span>
                <span className='font-bold'>{ele.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='zt-card flex flex-col gap-4 grow'>
        <div className='flex gap-4 justify-between'>
          <div className='flex gap-4'>
            <SearchSelect placeholder={'Select Employee'} list={employees} />
            <SearchSelect placeholder={'Select Month'} list={months} />
          </div>
          <div className='flex gap-4'>
            <Button onClick={() => setEdit(true)} className={'btn btn-dark-outline'}>{t("Edit Full Menu")}</Button>
            <Button onClick={() => setCreate(true)} className={'btn btn-primary'}>{t("Add New Menu")}</Button>
          </div>
        </div>
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
      {create && <CreateMealMenuForm onClose={() => { setCreate(false) }} />}
      {edit && <CreateMealMenuForm object={true} onClose={() => { setEdit(false) }} />}
    </div>
  )
}

export default MealListing
