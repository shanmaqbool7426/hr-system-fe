import Button from "../elements/Button"
import { Input, Datepicker, TextEditor, MultiSelect, SearchSelect, Textarea, ToggleCheck, CheckBox, SearchInput, Timepicker, FileUpload, ColorPicker, RatingInput } from "../elements"
import { useTranslation } from "next-i18next"
import Radio from "../elements/Radio"


export default function BaseForm({ children, formElements, onClose, title, formik, is_loading, className }) {
    const { t } = useTranslation()
    const close = () => onClose()
    const submitHamdler = (event) => {
        event.preventDefault()
        formik.submitForm()
    }
    return (
        <div className="zt-backDropSidePanel">
            <div className="zt-sidePanel relative">
                {title && <h3 className="mb-0 px-6 capitalize">{title || ""}</h3>}
                <form className="zt-themeForm zt-baseForm" onSubmit={submitHamdler}>
                    <fieldset className="zt-customScrollbar overflow-y-auto px-6 h-[calc(100dvh_-_185px)]">
                        <div className={`grid sm:grid-cols-2 gap-x-6 gap-y-4 ${className}`}>
                            {formElements?.map((element, index) => {
                                switch (element.type) {
                                    case 'date':
                                        return <Datepicker key={index} {...element}
                                            error={formik.touched[element.name] && formik.errors[element.name]}
                                            onBlur={() => {
                                                formik.setFieldTouched(element.name, true)
                                            }}
                                            onChange={(value) => {
                                                formik.setFieldValue(element.name, value)
                                            }}
                                        />
                                    // case 'time':
                                    //     return <Timepicker key={index} {...element}
                                    //         error={formik.touched[element.name] && formik.errors[element.name]}
                                    //         onBlur={() => {
                                    //             formik.setFieldTouched(element.name, true)
                                    //         }}
                                    //         onChange={(value) => {
                                    //             formik.setFieldValue(element.name, value)
                                    //         }}
                                    //     />
                                    case 'button':
                                        return <Button className={element.btn} key={index} {...element} />
                                    case 'search':
                                        return <SearchInput label={element.label} key={index} {...element} />
                                    case 'select':
                                        if (element.multiple) {
                                            return <MultiSelect key={index} {...element}
                                                error={formik.touched[element.name] && formik.errors[element.name]}
                                                onBlur={() => {
                                                    formik.setFieldTouched(element.name, true)
                                                }}
                                                onInput={formik.handleBlur}
                                                onChange={(value) => {
                                                    formik.setFieldValue(element.name, value)
                                                }}
                                            />
                                        } else {
                                            return <SearchSelect key={index}
                                                error={formik?.touched[element.name] && formik?.errors[element.name]}
                                                onBlur={() => {
                                                    formik.setFieldTouched(element.name, true)
                                                }}
                                                onInput={formik?.handleBlur}
                                                onChange={(value) => {
                                                    formik.setFieldValue(element.name, value)
                                                }}
                                                {...element}
                                            />
                                        }
                                    case 'textarea':
                                        return <Textarea key={index} {...element}
                                            error={formik.touched[element.name] && formik.errors[element.name]}
                                            onBlur={async () => {
                                                await formik.setFieldTouched(element.name, true)
                                            }}
                                            onInput={formik.handleBlur}
                                            onChange={formik?.handleChange}
                                        />
                                    case 'editor':
                                        return <TextEditor key={index} {...element} id={element.name}
                                            error={formik.touched[element.name] && formik.errors[element.name]}
                                            onBlur={() => {
                                                formik.setFieldTouched(element.name, true)
                                            }}
                                            onChange={async (value) => {
                                                await formik.setFieldValue(element.name, value)
                                                await formik.setFieldTouched(element.name, true)
                                            }}
                                        />
                                    case 'switch':
                                        return <ToggleCheck key={index}
                                            onChange={async (event) => {
                                                await formik.setFieldValue(element.name, event.target.checked)
                                                await formik.setFieldTouched(element.name, true)
                                            }}
                                            {...element} />
                                    case "radio":
                                        return <Radio
                                            key={index}
                                            variant={'dark'}
                                            id={element.id}
                                            label={element.label}
                                            onChange={async (event) => {
                                                await formik.setFieldValue(element.name, element.value);
                                                await formik.setFieldTouched(element.name, true)
                                            }}
                                            {...element}
                                        />;
                                    case 'checkbox':
                                        return (
                                            <div key={index} className="zt-formGroup col-span-2">
                                                <CheckBox
                                                    variant={'dark'}
                                                    onChange={async (event) => {
                                                        await formik.setFieldValue(element.name, event.target.checked)
                                                        await formik.setFieldTouched(element.name, true)
                                                    }}
                                                    {...element} />
                                            </div>);
                                    case 'rating':
                                        return <RatingInput value={formik.values[element.name]} onChange={(value) => formik.setFieldValue(element.name, value)} {...element} />
                                    case 'file':
                                        return <FileUpload
                                            onChange={(file) => {
                                                formik.setFieldValue(element.name, file)
                                            }}
                                            {...element}
                                        />
                                    case 'color':
                                        return <ColorPicker
                                            key={index}
                                            onChange={async (color) => {
                                                await formik.setFieldValue(element.name, color)
                                                await formik.setFieldTouched(element.name, true)
                                            }}
                                            {...element}
                                        />
                                    case 'hidden':
                                        return null;
                                    default:
                                        return <Input formik={formik} {...element} key={index} />
                                }
                            })}
                            {children && children}
                        </div>
                    </fieldset>
                    <div className="zt-btns">
                        <Button type="button" value={t("Cancel")} className={"btn w-full btn-primary-outline"} onClick={close} />
                        <Button type="button" onClick={submitHamdler} value={t("Save")} className={"btn w-full btn-success"} is_loading={is_loading} disabled={!formik?.isValid} />
                    </div>
                </form>
            </div>
        </div>
    )
}
