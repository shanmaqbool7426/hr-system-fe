import Button from "../elements/Button"
import { Input, Datepicker, MultiSelect, SearchSelect, Textarea, ToggleCheck, CheckBox, SearchInput } from "../elements"
import { useTranslation } from "react-i18next"
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
            <div className="zt-sidePanel">
                {/* <button className="btn-backOrClose btn bg-white !border-white !rounded-full !py-5 absolute top-28 right-[calc(100%_+_2rem)]" onClick={close}><ChevronLeft /></button> */}

                <h3 className="mb-0 px-6">{title || ""}</h3>

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
                                            onBlur={() => {
                                                formik.setFieldTouched(element.name, true)
                                            }}
                                            onInput={formik.handleBlur}
                                            onChange={formik?.handleChange}
                                        />
                                    case 'switch':
                                        return <ToggleCheck key={index}
                                            onChange={(event) => {
                                                formik.setFieldValue(element.name, event.target.checked)
                                            }}
                                            {...element} />
                                    case "radio":
                                        return <Radio
                                            key={index}
                                            variant={'dark'}
                                            id={element.id}
                                            checked={formik.values.radioStatus === element.name}
                                            label={element.label}
                                            onChange={(event) => {
                                                formik.setFieldValue('radioStatus', element.name);
                                            }}
                                            {...element}
                                        />;
                                    case 'checkbox':
                                        return (
                                            <div key={index} className="zt-formGroup col-span-2">
                                                <CheckBox
                                                    variant={'dark'}
                                                    onChange={(event) => {
                                                        formik.setFieldValue(element.name, event.target.checked)
                                                    }}
                                                    {...element} />
                                            </div>);
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