import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { ChevronDown, Check, InputErrorInfo, CloseCross } from "@/components/svg"


export default function MultiSelect({ id, containerClass, type, list, value, onChange, label, placeholder, error, ...props }) {

    const [selectedItem, setSelectedItem] = useState(value)
    const [query, setQuery] = useState('')
    const filtered =
        query === ''
            ? list
            : list.filter((item) =>
                item.value
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    const getDisplayValue = () => {
        return list.filter((item) => selectedItem.some((p) =>
            item.value.toLowerCase().replace(/\s+/g, '') === p.toLowerCase().replace(/\s+/g, '')))
            .reduce((acc, item) => {
                acc.push(item.display)
                return acc
            }, [])
    }

    const changeHandler = (item) => {
        onChange(item)
        setSelectedItem(item)
    }
    const clearInput = () => {
        onChange([])
        setSelectedItem([])
    }
    return (
        <div className={`zt-formGroup ${containerClass}`}>
            <Combobox value={selectedItem} onChange={changeHandler} multiple >
                <>
                    {label && <Combobox.Label htmlFor={props?.id}>
                        {label} {props?.required && <sup className="text-[1.25rem] text-themeDanger">*</sup>}
                    </Combobox.Label>}

                    <div className='relative'>
                        <Combobox.Input
                            {...props}
                            className={`zt-themeInput${error ? " zt-error" : ""}`}
                            placeholder={placeholder || "Select"}
                            displayValue={""}
                            readOnly={true}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        {selectedItem.length > 0 && (
                            <ul className='zt-multiSelectedList'>
                                {getDisplayValue().map((item, index) => (
                                    <li key={index} className='zt-tag'>{item}</li>
                                ))}
                            </ul>
                        )}

                        <div className='zt-actions'>
                            {value?.length > 0 && <button className="zt-btnClearAll" onClick={clearInput}><CloseCross aria-hidden="true" /></button>}
                            <Combobox.Button className="zt-btnDownArrow"><ChevronDown aria-hidden="true" /></Combobox.Button>
                        </div>

                        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setQuery('')}>
                            <Combobox.Options className="zt-multiSelectList">
                                {filtered.length === 0 && query !== '' ? (
                                    <p className="zt-notFound">Nothing found.</p>
                                ) : (
                                    filtered.map((item, index) => (
                                        <Combobox.Option key={index} value={item.value}>
                                            {({ selected, active }) => (<>
                                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{item.display}</span>
                                                {selected && <span className={`flex items-center pl-3 ${active ? 'text-white' : 'text-themePrimary'}`}>
                                                    <Check className="h-5 w-5" aria-hidden="true" />
                                                </span>}
                                            </>)}
                                        </Combobox.Option>
                                    ))
                                )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </>
            </Combobox>

            {error &&
                <span className="zt-errorMessage">
                    <InputErrorInfo />
                    {error}
                </span>
            }
        </div>
    )
}
