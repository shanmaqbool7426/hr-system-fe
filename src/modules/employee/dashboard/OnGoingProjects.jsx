// import UserListView from '@/components/elements/UserListView';
// import { ChevronLeft } from '@/components/svg';
// import React, { useRef } from 'react'
// import { useTranslation } from 'next-i18next';
// import { Navigation, Pagination } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// export const OnGoingProjects = () => {
//   const { t } = useTranslation();

//   const swiperRef = useRef();
//   const handlePrevSlide = () => {
//     if (swiperRef.current) {
//       swiperRef.current.slidePrev();
//     }
//   };
//   const handleNextSlide = () => {
//     if (swiperRef.current) {
//       swiperRef.current.slideNext();
//     }
//   };
//   const Projects = [
//     {
//       "leaders": [
//         { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg" },
//         { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-02.jpg" },
//         { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-03.jpg" },
//       ],
//       "team": [
//         { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg" },
//         { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-02.jpg" },
//         { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-03.jpg" },
//         { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-04.jpg" },
//         { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-05.jpg" },
//         { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-06.jpg" },
//         { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-07.jpg" },
//         { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-08.jpg" },
//         { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-09.jpg" }
//       ],
//     },
//   ]
//   return (
//     <div className='bg-white rounded-lg p-6 '>
//       <div className='flex justify-between mb-4'>
//         <h2 className='text-xl font-bold mb-0'>{t("On Going Projects")}</h2>
//         <div className='flex gap-4'>
//           <button onClick={handlePrevSlide} className='rounded-full bg-themeGrayscale50 h-10 w-10 flex justify-center items-center'><ChevronLeft /></button>
//           <button onClick={handleNextSlide} className='rounded-full bg-themeGrayscale50 h-10 w-10 flex justify-center items-center rotate-180'><ChevronLeft /></button>
//         </div>
//       </div>
//         <Swiper
//           spaceBetween={24}
//           breakpoints={{
//             320: {
//                 slidesPerView: 1,
//             },
//             768: {
//                 slidesPerView: 2,
//             },
//             1024: {
//                 slidesPerView: 3,
//             }, 
//         }}
//           loop={true}
//           onSwiper={(swiper) => (swiperRef.current = swiper)}
//           modules={[Pagination, Navigation]}
//           className='w-[1024px] xl:max-w-[1571px]'
//         >
//           {[0, 1, 2, 3, 4].map((ele, i) => (
//             <SwiperSlide key={i}>
//               <div className='border bg-white border-themeGrayscale200 rounded-lg p-6'>
//                 <div className='flex justify-between pb-4'>
//                   <h3 className='text-lg font-bold mb-0'>{t("Office Management")}</h3>
//                   <span className='zt-tag-danger zt-tag '>{t("Deadline: 10 May 2024")}</span>
//                 </div>
//                 <hr className='text-themeGrayscale200 mb-4' />
//                 <p className='mb-4 text-sm text-themeGrayscale600'>{t("Lorem Ipsum is simply dummy text of the printing and typesetting industry. When an unknown printer took a galley of type and scrambled it...")}</p>
//                 <div className='bg-themeGrayscale50 text-sm p-4 grid grid-cols-2 rounded-lg mb-4'>
//                   <div className='flex flex-col gap-1'>
//                     <span className='text-themeGrayscale600'>{t("Total Task")}</span>
//                     <span className='font-semibold'>{t("20")}</span>
//                   </div>
//                   <div className='flex flex-col gap-1'>
//                     <span className='text-themeGrayscale600'>{t("Total Completed")}</span>
//                     <span className='font-semibold'>{t("20")}</span>
//                   </div>
//                 </div>
//                 {Projects.map((ele, i) => (
//                   <div className='flex flex-col gap-3 mb-4' key={i}>
//                     <strong className='text-sm font-semibold'>Project Leader</strong>
//                     <UserListView list={ele.leaders} limit={2} />
//                   </div>
//                 ))}
//                 {Projects.map((ele, i) => (
//                   <div className='flex flex-col gap-3' key={i}>
//                     <strong className='text-sm font-semibold'>Team</strong>
//                     <UserListView list={ele.team} limit={5} />
//                   </div>
//                 ))}
//               </div>
//             </SwiperSlide>
//           ))}

//         </Swiper>
//     </div>
//   )
// }
import UserListView from '@/components/elements/UserListView';
import { ChevronLeft } from '@/components/svg';
import React, { useRef } from 'react'
import { useTranslation } from 'next-i18next';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const OnGoingProjects = () => {
  const { t } = useTranslation();

  const swiperRef = useRef();
  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };
  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const Projects = [
    {
      "leaders": [
        { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg" },
        { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-02.jpg" },
        { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-03.jpg" },
      ],
      "team": [
        { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg" },
        { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-02.jpg" },
        { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-03.jpg" },
        { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-04.jpg" },
        { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-05.jpg" },
        { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-06.jpg" },
        { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-07.jpg" },
        { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-08.jpg" },
        { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-09.jpg" }
      ],
    },
  ];

  return (
    <div className='zt-card'>
      <div className='flex justify-between mb-4'>
        <h2 className='text-xl font-bold mb-0'>{t("On Going Projects")}</h2>
        <div className='flex gap-4'>
          <button onClick={handlePrevSlide} className='rounded-full dark:bg-gray-700 bg-themeGrayscale50 h-10 w-10 flex justify-center items-center'><ChevronLeft /></button>
          <button onClick={handleNextSlide} className='rounded-full dark:bg-gray-700 bg-themeGrayscale50 h-10 w-10 flex justify-center items-center rotate-180'><ChevronLeft /></button>
        </div>
      </div>
      <div className='max-w-[300px] md:max-w-[500px] xl:max-w-[1024px] xl:min-w-[1024px]'>
        <Swiper
          spaceBetween={24}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            }, 
          }}
          loop={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Pagination, Navigation]}
          className='w-full'  
        >
          {[0, 1, 2, 3, 4].map((ele, i) => (
            <SwiperSlide key={i}>
              <div className='border dark:border-gray-700 border-themeGrayscale200 zt-card'>
                <div className='flex justify-between pb-4'>
                  <h3 className='text-lg font-bold mb-0'>{t("Office Management")}</h3>
                  <span className='zt-tag-danger zt-tag'>{t("Deadline: 10 May 2024")}</span>
                </div>
                <hr className='text-themeGrayscale200 dark:border-gray-700 mb-4' />
                <p className='mb-4 text-sm text-themeGrayscale600 dark:text-white'>{t("Lorem Ipsum is simply dummy text of the printing and typesetting industry. When an unknown printer took a galley of type and scrambled it...")}</p>
                <div className='bg-themeGrayscale50 dark:bg-gray-700 text-sm p-4 grid grid-cols-2 rounded-lg mb-4'>
                  <div className='flex flex-col gap-1'>
                    <span className='text-themeGrayscale600 dark:text-white'>{t("Total Task")}</span>
                    <span className='font-semibold'>{t("20")}</span>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <span className='text-themeGrayscale600 dark:text-white'>{t("Total Completed")}</span>
                    <span className='font-semibold'>{t("20")}</span>
                  </div>
                </div>
                {Projects.map((ele, i) => (
                  <div className='flex flex-col gap-3 mb-4' key={i}>
                    <strong className='text-sm font-semibold'>{t("Project Leader")}</strong>
                    <UserListView list={ele.leaders} limit={2} />
                  </div>
                ))}
                {Projects.map((ele, i) => (
                  <div className='flex flex-col gap-3' key={i}>
                    <strong className='text-sm font-semibold'>{t("Team")}</strong>
                    <UserListView list={ele.team} limit={5} />
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
