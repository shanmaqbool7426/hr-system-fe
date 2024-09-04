import { GridIcon, ListIcon } from '@/components/svg'
export default function GridToggle({ name, value, setter }) {
    const toggleHandler = () => {
        let _value = value === "list" ? "grid" : "list"
        localStorage.setItem(name, _value)
        setter(_value)
    }

    return <div className='rounded-full p-1 flex bg-themeGrayscale200 dark:bg-dark-5' onClick={toggleHandler}>
        <button className={`${value === "list" ? "bg-themePurple" : ""} rounded-full p-2`}><ListIcon className={`${value === "list" ? "text-white" : "text-themeGrayscale500"}`} /></button>
        <button className={`${value === "grid" ? "bg-themePurple" : ""} rounded-full p-2`}><GridIcon className={`${value === "grid" ? "text-white" : "text-themeGrayscale500"}`} /></button>
    </div>
}