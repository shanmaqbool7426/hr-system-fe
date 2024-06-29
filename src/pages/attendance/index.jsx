import LandingPage from "@/layouts/LandingPage"
import DefaultLayout from "@/layouts/DefaultLayout"
import { useTranslation } from "next-i18next";
import ls from 'localstorage-slim';

const user = ls?.get('auth_user', { decrypt: true })
const Layout = user ? DefaultLayout : LandingPage

export default function Attendance() {
  return (
    <div>Attendance</div>
  )
}

Attendance.layout = Layout