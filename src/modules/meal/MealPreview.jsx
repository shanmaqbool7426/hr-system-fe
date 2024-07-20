import Image from 'next/image'
import React from 'react'

const MealPreview = () => {
  return (
    <div className='lg:w-1/4 flex flex-col'>
      <figure>
        <Image className='rounded-t-2xl w-full object-cover' src={'/assets/images/asset/meal-01.png'} alt='meal' height={406} width={318} />
      </figure>
      <figure>
        <Image className='rounded-b-2xl w-full object-cover' src={'/assets/images/asset/meal-02.png'} alt='meal' height={406} width={318} />
      </figure>
    </div>
  )
}

export default MealPreview
