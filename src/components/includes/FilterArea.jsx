import { useTranslation } from "react-i18next";
import { Button, SearchInput, Datepicker, SearchSelect, MultiSelect, Input, CheckBox } from "../elements";
import { Filter } from "../svg";
import { useState } from "react";
import { capitalize } from "@/util/helpers";

export default function FilterArea({ children, elements, title, filters, setFilters, filterHandler }) {
    const { t } = useTranslation()
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const submitHandler = (event) => {
        event.preventDefault()
        // filterHandler()
    }
    const clearFilters = () => {
        for (let key in filters) {
            filters[key] = ""
            setFilters(filters)
        }
        // filterHandler()
    }

    const toggleOpen = () => {
        setOpen(!open)
        if (!open && edit) {
            setEdit(false)
        }
    }

    const toggleEdit = () => {
        setEdit(!edit)
        if (!edit && open) {
            setOpen(false)
        }
    }

    return (
        <form className="flex flex-col gap-4 mb-6 pb-6 border-b border-themeGrayscale300 dark:border-gray-700" onSubmit={submitHandler}>
            <div className="flex justify-between items-center">
                <h2 className="mb-0 text-h5">{title}</h2>
                <div className="flex gap-2">
                    <Button onClick={toggleOpen} type="button"
                        className={`btn ${open ? "btn-dark" : "btn-dark-outline"} items-center`}>
                        <Filter /> {t("Filter")}</Button>
                    {/* <Button
                        onClick={toggleEdit} type="button"
                        className={`btn ${edit ? "btn-dark" : "btn-dark-outline"} items-center`}>
                        <Edit /> {t('Edit Filter')}</Button> */}
                </div>
            </div>

            {open && <>
                <hr className="border-themeGrayscale300 dark:border-gray-700"/>
                <div className="grid xl:grid-cols-6 grid-cols-4 gap-4">
                    {elements?.map((element, index) => {
                        switch (element.type) {
                            case 'search':
                                return <SearchInput key={index} {...element} />
                            case 'customIcon':
                                return <SearchInput customIcon={true} key={index} {...element} />
                            case 'date':
                                return <Datepicker key={index} {...element} />
                            case 'select':
                                if (element.multiple) {
                                    return <MultiSelect key={index} {...element} />
                                } else {
                                    return <SearchSelect key={index} {...element} />
                                }
                            default:
                                return <Input {...element} key={index} />
                        }
                    })}
                </div>
                <div className="flex justify-end gap-2 ">
                    <Button type="button" onClick={clearFilters} className={"btn"}>{t('Clear Filters')}</Button>
                    {/* <Button type="submit" className={"btn btn-dark"}>{t('Apply Filters')}</Button> */}
                </div>
            </>}
            {edit && <>
                <div className="grid xl:grid-cols-6 grid-cols-4 gap-4">
                    {elements?.map((element, index) => (
                        <>{element.type !== 'search' && <div className="flex" key={index}>
                            <CheckBox label={capitalize(element.name)} />
                        </div>}</>
                    ))}
                </div>
                <div className="flex justify-end gap-2 ">
                    <Button type="button" className={"btn btn-dark"}>{t('Save')}</Button>
                </div>
            </>}
        </form>
    )
}