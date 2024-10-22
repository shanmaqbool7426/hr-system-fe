import { FaRegStar, FaStar } from "react-icons/fa6";
import { InputErrorInfo } from "../svg";
import { useState } from "react";


export default function RatingInput({ name, label = "", value = 0, required = false, onChange, error }) {
    const [hoveredValue, setHoveredValue] = useState(null);

    return <div className="zt-formGroup">
        {label && <label className="dark:text-themeGrayscale300" htmlFor={name}>
            {label} {required && <sup className="text-[1.25rem] text-themeDanger">*</sup>}
        </label>}
        <div className="flex">
            {Array.from({ length: 5 }).map((_, index) => {
                const filled = (hoveredValue !== null ? index < hoveredValue : index < value);

                return (
                    <span
                        key={index}
                        className="relative cursor-pointer"
                        onClick={() => onChange(index + 1)}
                        onMouseEnter={() => setHoveredValue(index + 1)}
                        onMouseLeave={() => setHoveredValue(null)}
                    >
                        {/* Unfilled star outline */}
                        <FaRegStar className="w-6 h-6 text-yellow-500 absolute" />
                        {/* Filled star based on hover or value */}
                        <FaStar
                            className={`w-6 h-6 text-yellow-500 transition-all ${filled ? 'opacity-100' : 'opacity-0'}`}
                        />
                    </span>
                );
            })}
        </div>
        {error && <span className="zt-errorMessage">
            <InputErrorInfo />
            {error}
        </span>}
    </div>
}