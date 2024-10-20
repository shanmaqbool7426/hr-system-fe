import { clearAuth } from "@/store/slices/auth.slice"
import Image from "next/legacy/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { AlertRedDot, SearchIcon, NotificationBell, Gear, Users, Moon, Sun } from "../svg"
import { useTranslation } from "next-i18next"
import DropDown from "../elements/DropDown"
import { Menu } from '@headlessui/react'
import { IoMdPower } from "react-icons/io";
import { Profile } from "../elements"
import { useEffect, useState } from "react"
import ls from "localstorage-slim"

const Topbar = () => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()
  const { auth_user } = useSelector((state) => state.auth)
  const theme = ls.get('theme') ? ls.get('theme') : (window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light")
  const [darkMode, setDarkMode] = useState(theme === "dark");
  const [locale, setLocale] = useState(ls.get('locale') || 'en')
  const signoutHandler = (event) => {
    ls.remove('auth_user')
    ls.remove('access_token')
    ls.remove('refresh_token')
    dispatch(clearAuth())
    router.push('/sign-in')
  }

  useEffect(() => {
    if (!!darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode])
  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  const toggleDarkMode = () => {
    if (!darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    ls.set('theme', !darkMode ? "dark" : "light");
    setDarkMode(!darkMode);
  };

  const localeChangeHandler = (lang) => {
    setLocale(lang)
    ls.set('locale', lang)
  }
  return (
    <div className="zt-topBar">
      <div className="flex items-center gap-8">
        <strong className="zt-topBarLogo">
          <Link href={'/'} className="block">
            <Image
              src={'/favicon.png'}
              width={32}
              height={34}
              quality={100}
              priority={true}
              placeholder="blur"
              blurDataURL={'/favicon.png'}
              alt="logo icon"
            />
          </Link>
        </strong>

        <form className="zt-form zt-formSearch max-w-96 shrink-0 w-full">
          <div className="zt-formGroup relative !mb-0">
            <input name='search' placeholder={t('Search anything...')} type='search' className="zt-themeInput !text-base !pl-11 !py-2 !rounded-full" />
            <span className="absolute w-11 h-full flex justify-center items-center top-0 left-0 dark:text-themeGrayscale300"><SearchIcon /></span>
          </div>
        </form>
      </div>


      <nav className="zt-topNavigation">
        <ul>
          {/* Notification */}
          {/* <li>
            <DropDown size={'zt-dropDownLG'} icon={<AlertRedDot />}>
              <div className="zt-themeDropDownList zt-dropDownLG">
                <div className='flex justify-between items-center'>
                  <strong className='text-h6'>{t('Notification')}</strong>
                  <ThreeDotsHorizontal />
                </div>
                <Menu.Items as='ul'>
                  <Menu.Item as='li' className='w-full' >
                    <span className="text-themeDanger bg-themeDangerLight"><NotificationBell /></span>
                    <div className="zt-notificationContent">
                      <div className="zt-notificationHead">
                        <strong>{t('Training session reminder')}</strong>
                        <time dateTime="">{t('Now')}</time>
                      </div>
                      <div className="zt-notificationDescription">
                        <p>{t('Don&#39;t forget to join our upcoming training session on the HR Management Dashboard. Learn best practices and get the most out of our system.')}</p>
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item as='li' className='w-full' >
                    <span className="text-themeGrayscale bg-themeGrayscale100"><Gear /></span>
                    <div className="zt-notificationContent">
                      <div className="zt-notificationHead">
                        <strong>{t('New  Announcement')}</strong>
                        <time dateTime="">9:00 {t('AM')}</time>
                      </div>
                      <div className="zt-notificationDescription">
                        <p>{t('Our HR Management Dashboard now integrates with [integration name]. Enjoy even more functionality and ease with our new integration.')}</p>
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item as='li' className='w-full' >
                    <span className="text-themePrimary bg-themePrimary100"><Users /></span>
                    <div className="zt-notificationContent">
                      <div className="zt-notificationHead">
                        <strong>{t('User feedback survey')}</strong>
                        <time dateTime="">1 Oct 2022</time>
                      </div>
                      <div className="zt-notificationDescription">
                        <p>{t('We want to hear from you! Take our quick user feedback survey on the HR Management Dashboard and help us improve our system.')}</p>
                      </div>
                    </div>
                  </Menu.Item>
                </Menu.Items>
                <Button type="submit" value={t('Show All Notification')} variant={'primary'} />
              </div>
            </DropDown>
          </li> */}
          {/* Dark Mode */}
          <li><span onClick={toggleDarkMode} className="cursor-pointer select-none">{!!darkMode ? <Moon /> : <Sun />}</span></li>
          {/* Locale */}
          <li>
            <DropDown title={locale}>
              <ul className="zt-themeDropDownList !py-2 !px-6">
                <li className="cursor-pointer !py-1" onClick={() => localeChangeHandler('en')}>English</li>
                <li className="cursor-pointer !py-1" onClick={() => localeChangeHandler('ar')}>Arabic</li>
              </ul>
            </DropDown>
          </li>
          {/* Profile */}
          <li>
            <DropDown size={'zt-lg'} icon={<Profile name={auth_user?.firstName} image={auth_user?.avatar} />}>
              <div className="z-50 absolute bg-white dark:bg-dark-4 p-4 right-0 top-12 border rounded-lg zt-dropDownSM dark:border-dark-3">
                <Menu.Items as='ul' className={"flex flex-col gap-3"}>
                  <Menu.Item as='li' className='w-full cursor-pointer flex items-center gap-2'>
                    <Users />
                    <span onClick={() => router.push('/profile')}>{t("Profile")}</span>
                  </Menu.Item>
                  <Menu.Item as='li' className='w-full cursor-pointer flex items-center gap-2'>
                    <IoMdPower />
                    <span onClick={signoutHandler}>{t("Sign Out")}</span>
                  </Menu.Item>
                </Menu.Items>
              </div>
            </DropDown>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Topbar