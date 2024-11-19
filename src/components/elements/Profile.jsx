import Image from "next/legacy/image"
import { Edit } from "@/components/svg"
export default function Profil({ name, lastName, image, width = 100, height = 100, className, nameClass, edit = false, action = () => { } }) {
    return (<>
        <figure className={`flex items-center justify-center relative shrink-0 w-10 h-10 group bg-gray-300 transition-all dark:bg-dark-7 dark:text-white rounded-full overflow-hidden ${className}`}>
            {image ? <Image
                src={image}
                width={width}
                height={height}
                alt="user picture"
                className="object-cover"
            /> :
                <span className={`capitalize ${nameClass}`}>{name && name[0]}{lastName && lastName[0]}</span>}

            {edit && <span onClick={action} className="absolute inset-0 invisible group-hover:visible transition-all flex items-center justify-center bg-gray-400/85 text-white dark:bg-dark-6/85 cursor-pointer">
                <Edit width={'1.5rem'} height={'auto'} />
            </span>}
        </figure>

    </>)
}
