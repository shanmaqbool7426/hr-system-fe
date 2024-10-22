import { FaRegStar, FaStar } from "react-icons/fa6";


export default function Rating({ value = 0 }) {
    return <div className="flex">
        {Array.from({ length: 5 }).map((_, index) => (
            <span key={index}>{index < value ? <FaStar className="text-yellow-500 w-6 h-6" /> : <FaRegStar className="w-6 h-6 text-yellow-500" />}</span>
        ))}
    </div>
}