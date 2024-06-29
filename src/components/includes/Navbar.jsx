import { useRouter } from "next/router"
import ls from 'localstorage-slim';

export default function Navbar() {
    const router = useRouter()
    const logoutHandler = (event) => {
        ls.clear()
        router.push('/sign-in')
    }
    return (
        <nav className="h-16 w-full flex px-4 py-2 bg-primary text-white">
            {/* <div className="w-full flex gap-3 items-center">
                <span className="text-4xl pl-4">Zaffre</span>
            </div> */}
            <div className="w-full flex flex-row-reverse items-center text-xl">
                <span className="cursor-pointer" onClick={logoutHandler}>Logout</span>
            </div>
        </nav>
    )
}