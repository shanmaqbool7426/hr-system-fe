import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import ls from 'localstorage-slim';
import Image from "next/legacy/image";
import { useTranslation } from "next-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/pagination';
import { FaceBookIcon, InstaIcon, LinkdInIcon, LockIcon, TwitterIcon } from "@/components/svg";
import Link from "next/link";

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
        <>
            <main id="zt-main" className={`zt-main zt-authLayout zt-page zt-page-${pageName} flex grow`}>
                <div className={`zt-authContent !bg-cover !bg-center bg-[url('/assets/images/auth.png')]`}>
                    <div className="zt-authContentHolder">
                        <div className="flex flex-col text-white relative grow">
                            <figure>
                                <Image
                                    src={'/assets/images/logo-full.svg'}
                                    width={117 * 2}
                                    height={37 * 2}
                                    quality={100}
                                    priority={true}
                                    placeholder="blur"
                                    blurDataURL={'/assets/images/logo-full.svg'}
                                    alt={'Zaffre'}
                                />
                            </figure>
                            <Swiper className="zt-authSlider w-full !static !pb-12 grow"
                                spaceBetween={30}
                                centeredSlides={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                pagination={{ clickable: true, modifierClass: "zt-pagination" }}
                                navigation={true}
                                modules={[Autoplay, Pagination, Navigation]}
                            >
                                {[...Array(3)].map((ele, i) => (
                                    <SwiperSlide key={i} className="!flex flex-col justify-between">
                                        <div>
                                            <h1 className="mb-5 text-h2 text-white">{t("Let's start building a culture of empowerment for our employees today!")}</h1>
                                            <p className="mb-0">{t('We help to complete all your conveyancing needs easily')}</p>
                                        </div>
                                        <div className="flex justify-center">
                                            <span className="flex self-end justify-center items-center rounded-full bg-white dark:bg-dark-3 h-32 w-32">
                                                <LockIcon />
                                            </span>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
                {children}

            </main>
            <footer className="bg-white dark:bg-dark-4 px-10 py-4 flex justify-between items-center">
                <figure>
                    <Image
                        src={'/assets/images/logo-full.svg'}
                        width={117}
                        height={37}
                        quality={100}
                        priority={true}
                        placeholder="blur"
                        blurDataURL={'/assets/images/logo-full.svg'}
                        alt={'Zaffre'}
                    />
                </figure>
                <p className="mb-0"> {t("Copyright ©")} {new Date().getFullYear()} {t("Zaffre Tech, Inc. - All Rights Reserved")}</p>
                <div className="flex gap-5">
                    <Link href={'https://www.facebook.com/zaffretech1/'} target="_blank"><FaceBookIcon /></Link>
                    <Link href={'https://www.linkedin.com/company/zaffretech/'} target="_blank"><LinkdInIcon /></Link>
                    <Link href={'#'} target="_blank"><InstaIcon /></Link>
                    <Link href={'#'} target="_blank"><TwitterIcon /></Link>
                </div>
            </footer>
        </>

    );
}