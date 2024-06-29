import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import ls from 'localstorage-slim';
import Image from "next/legacy/image";
import { useTranslation } from "next-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/pagination';

export default function Auth({ children, description, title }) {
    const { t } = useTranslation()
    const router = useRouter()
    const pageName = router.pathname.substring(1);

    useEffect(() => {
        if (ls.get('auth_user')) {
            router.push('/dashboard')
        }
    }, [router])


    return (
        <main id="zt-main" className={`zt-main zt-authLayout zt-page zt-page-${pageName} flex grow`}>
            <div className="zt-authContent">
                <div className="zt-authContentHolder">
                    <div className="flex flex-col text-white relative grow">
                        <figure>
                            <Image
                                src={'/zaffre.png'}
                                width={117*2}
                                height={37*2}
                                quality={100}
                                priority={true}
                                placeholder="blur"
                                blurDataURL={'/zaffre.png'}
                                alt={'Zaffre'}
                            />
                        </figure>
                        <Swiper className="zt-authSlider w-full !static !pb-12"
                            // spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            pagination={{ clickable: true, modifierClass: "zt-pagination" }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                        >
                            <SwiperSlide>
                                <h1 className="mb-5 text-h2 text-white">{t("Let's start building a culture of empowerment for our employees today!")}</h1>
                                <p className="mb-0">{t('We help to complete all your conveyancing needs easily')}</p>
                            </SwiperSlide>
                            <SwiperSlide>
                                <h1 className="mb-5 text-h2 text-white">{t("Let's start building a culture of empowerment for our employees today!")}</h1>
                                <p className="mb-0">{t('We help to complete all your conveyancing needs easily')}</p>
                            </SwiperSlide>
                            <SwiperSlide>
                                <h1 className="mb-5 text-h2 text-white">{t("Let's start building a culture of empowerment for our employees today!")}</h1>
                                <p className="mb-0">{t('We help to complete all your conveyancing needs easily')}</p>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
            {children}
        </main>
    );
}