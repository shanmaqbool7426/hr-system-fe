import { Button, CheckBox, Select } from '@/components/elements';
import { ChevronLeft } from '@/components/svg';
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

const CategoryTypes = () => {
    const { t } = useTranslation();
    const [checkedApps, setCheckedApps] = useState({});
    const [selectedTabIdx, setSelectedTabIdx] = useState(0);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const EmailApps = [
        { name: "mail.google.com", time: "55m" },
        { name: "Messenger", time: "55m" },
    ];
    const SocialMediaApps = [
        { name: "Slack", time: "55m" },
        { name: "youtube.com", time: "55m" },
        { name: "facebook.com", time: "55m" },
        { name: "netflix.com", time: "55m" },
    ];
    const OfficeApps = [
        { name: "Microsoft Excel", time: "55m" },
        { name: "image.prntscr.com", time: "55m" },
        { name: "Google Chrome", time: "85m" },
        { name: "Putty", time: "55m" },
        { name: "Teams", time: "55m" },
        { name: "drive.google.com", time: "55m" },
    ];
    const EntertainmentApps = [
        { name: "Code", time: "55m" },
        { name: "netflix.com", time: "55m" },
        { name: "play.google.com", time: "85m" },
    ];
    const NewsApps = [
        { name: "Studio64", time: "55m" },
        { name: "Skype", time: "55m" },
        { name: "DeskTime", time: "85m" },
    ];
    const UndefinedApps = [
        { name: "Meeting with John", time: "55m" },
        { name: "mail.google.com", time: "55m" },
        { name: "Lightshot", time: "85m" },
        { name: "docs.google.com", time: "55m" }, 
        { name: "wikipedia.org", time: "55m" },
        { name: "image.prntscr.com", time: "55m" },
        { name: "flickr.com", time: "55m" },
        { name: "flickr.com", time: "55m" },
        { name: "Slack", time: "55m" },
        { name: "Calculator", time: "55m" },
        { name: "maps.google.com", time: "55m" },
        { name: "similarweb.com", time: "55m" },
        { name: "Preview", time: "55m" },
        { name: "Putty", time: "55m" },
        { name: "Microsoft Outlook", time: "55m" },
        { name: "Microsoft.Notes", time: "55m" },
        { name: "Windows Explorer", time: "55m" },
        { name: "mapon.com", time: "55m" },
        { name: "Terminal", time: "55m" },
    ];

    const AppCategoryData = [
        { name: "E-MAIL", bg: "bg-themePrimary", apps: EmailApps },
        { name: "WORK APPS", bg: 'bg-themeSuccess', apps: OfficeApps },
        { name: "COMMUNICATION", bg: 'bg-RoyalHeath', apps: UndefinedApps },
        { name: "SOCIAL MEDIA", bg: "bg-BrinkPink", apps: SocialMediaApps },
        { name: "ENTERTAINMENT", bg: 'bg-deepSkyBlue', apps: EntertainmentApps },
        { name: "NEWS", bg: 'bg-themeDanger', apps: NewsApps },
        { name: "UNDEFINED", bg: 'bg-themeGrayscale500', apps: UndefinedApps },
    ];

    const handleSelectAll = (categoryName) => {
        setCheckedApps(prevState => {
            const updatedState = { ...prevState };
            AppCategoryData.forEach(category => {
                if (category.name === categoryName) {
                    category.apps.forEach(app => {
                        updatedState[app.name] = true;
                    });
                }
            });
            return updatedState;
        });
    };

    const handleCheckboxChange = (appName) => {
        setCheckedApps(prevState => ({
            ...prevState,
            [appName]: !prevState[appName]
        }));
    };

    const isAnyCheckboxChecked = (apps) => {
        return apps.some(app => checkedApps[app.name]);
    };

    const swiperRef = useRef();

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(selectedTabIdx);
        }
    }, [selectedTabIdx]);

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

    const onSlideChange = (swiper) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    return (
        <div className='flex flex-col gap-6 zt-card'>
            <div className="overflow-x-auto">
                <nav
                    className="flex items-center space-x-4 lg:w-full"
                    aria-label="Tabs"
                >
                    {AppCategoryData.map((tab, i) => (
                        <span
                            key={tab.name}
                            className={`${tab.bg} text-white rounded-lg whitespace-nowrap ps-6 font-bold pe-14 p-3 no-underline cursor-pointer text-lg`}
                            onClick={() => setSelectedTabIdx(i)}
                        >
                            {tab.name}
                        </span>
                    ))}
                </nav>
            </div>
            <div className='flex justify-end gap-4'>
                {!isBeginning && (
                    <button onClick={handlePrevSlide} className='rounded-full bg-themeGrayscale50 h-10 w-10 flex justify-center items-center'>
                        <ChevronLeft />
                    </button>
                )}
                {!isEnd && (
                    <button onClick={handleNextSlide} className='rounded-full bg-themeGrayscale50 h-10 w-10 flex justify-center items-center rotate-180'>
                        <ChevronLeft />
                    </button>
                )}
            </div>
            <div className='max-w-[50vw] md:max-w-[80vw]'>
                <Swiper
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                    initialSlide={selectedTabIdx}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={onSlideChange}
                    spaceBetween={30}
                    modules={[Pagination, Navigation]}
                >
                    {AppCategoryData.map((ele, i) => (
                        <SwiperSlide key={i}>
                            <div className='rounded-lg bg-themeGrayscale50 shadow'>
                                <div className={`${ele.bg} px-6 py-4 text-white font-bold rounded-t-lg flex justify-between items-center`}>
                                    <span>{ele.name}</span>
                                    <button className='uppercase' onClick={() => handleSelectAll(ele.name)}>{t("Select All")}</button>
                                </div>
                                <div className='overflow-y-scroll h-96'>
                                    {isAnyCheckboxChecked(ele.apps) && (
                                        <div className='flex items-end gap-4 p-6'>
                                            <Select label='Change status' options={['Email', 'Social Media', 'WORK Apps', 'Entertainment', 'News', 'Undefined']} />
                                            <Button className={'btn btn-success'}>{t("Confirm")}</Button>
                                        </div>
                                    )}
                                    <div className='pt-4'>
                                        {ele.apps.map((app, j) => (
                                            <div key={j} className='flex px-6 py-1 justify-between'>
                                                <CheckBox
                                                    name={app.name}
                                                    id={app.name}
                                                    label={app.name}
                                                    checked={checkedApps[app.name] || false}
                                                    onChange={() => handleCheckboxChange(app.name)}
                                                />
                                                <time dateTime={app.time}>{app.time}</time>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default CategoryTypes;
