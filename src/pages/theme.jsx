import React, { useState } from "react";
import Link from "next/link";
import LandingPage from "@/layouts/LandingPage"
import { useTranslation } from "next-i18next";
import { Input, Button, Tabs, CheckBox, SearchSelect, MultiSelect, ToggleCheck, Datepicker } from "@/components/elements";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Radio from "@/components/elements/Radio";
import CreateEmployeeFrom from "@/components/forms/employees/create";
import { Filter, Edit, Trash, Calendar, SortEmpty, SortAsc, SortDesc, Check, Moon, Sun, InputErrorInfo, EyeOn, EyeOff, CloseCross, AlertRedDot, MessageRedDot, SearchIcon, Dashboard, Employees, Attendance, Leave, Connect, RemoteWork, Recruitment, Payroll, Report, Organization, HelpDesk, HelpLine, ChevronLeft, ChevronRight, ChevronDown, EclipseLoader, InterWindLoader, Spinner, ThreeDotsHorizontal, ThreeDotsVertical, NotificationBell, Gear, Users, Tick, Minus } from "@/components/svg";

export default function Home() {
    const { t } = useTranslation()
    const selectList = [
        { display: "Apple", value: "Apple" },
        { display: "Orange", value: "Orange" },
        { display: "Banana", value: "Banana" },
        { display: "Mango", value: "Mango" },
        { display: "Grape", value: "Grape" },
        { display: "Strawberry", value: "Strawberry" },
        { display: "Watermelon", value: "Watermelon" },
        { display: "Pineapple", value: "Pineapple" },
        { display: "Peach", value: "Peach" },
        { display: "Pear", value: "Pear" },
        { display: "Cherry", value: "Cherry" },
        { display: "Plum", value: "Plum" },
        { display: "Kiwifruit", value: "Kiwifruit" },
        { display: "Lemon", value: "Lemon" },
        { display: "Avocado", value: "Avocado" },
        { display: "Raspberry", value: "Raspberry" },
        { display: "Blueberry", value: "Blueberry" },
        { display: "Papaya", value: "Papaya" },
        { display: "Fig", value: "Fig" },
        { display: "Lychee", value: "Lychee" },
    ]
    const [open, setOpen] = useState(false)
    const formik = useFormik({
        initialValues: {
            name: "",
            fruit: "",
            multiFruit: ["apple"],
            checkbox1: false,
            checkbox2: false,
            checkbox3: true,
            checkboxStatus: true,
            toggleCheck1: false,
            toggleCheck2: true,
            toggleCheck3: false,
            toggleCheck4: true,
            radioStatus: true
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(),
            fruit: Yup.string().required(),
            multiFruit: Yup.array().required(),
        }),
        onSubmit: async (values) => { }
    })
    return (
        <div className="container">
            <div className="mb-12">
                <h1>Landing Page</h1>
                <Link href={'sign-in'}>Go to login page</Link>
            </div>

            <div className="flex flex-col  mb-16">
                <h1 className="text-h5 mb-3">Tabs</h1>
                <div className="flex flex-col">
                    <Tabs
                        tabs={["Employee Info", "Additional Information", "Company Information", "Employee Documents", "Salary"]}
                        panels={[
                            <>
                                <h2 className="text-h5">Employee Info</h2>
                                <p>Tab 1 paragraph</p>
                            </>,
                            <>
                                <h2 className="text-h5">Additional Information</h2>
                                <p>Tab 2 paragraph</p>
                            </>,
                            <>
                                <h2 className="text-h5">Company Information</h2>
                                <p>Tab 2 paragraph</p>
                            </>,
                            <>
                                <h2 className="text-h5">Employee Documents</h2>
                                <p>Tab 2 paragraph</p>
                            </>,
                            <>
                                <h2 className="text-h5">Salary</h2>
                                <p>Tab 2 paragraph</p>
                            </>
                        ]}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-3 lg:gap-4 mb-16">
                <div>
                    <h1 className="text-h5 mb-3">Checkbox</h1>
                    <CheckBox
                        size={'sm'}
                        variant={'dark'}
                        className={'mb-4'}
                        id="checkboxStatus-sm"
                        name={"checkboxStatus"}
                        checked={formik.values.checkbox1}
                        label={formik.values.checkbox1 ? "Checked" : "Unchecked"}
                        onChange={(event) => {
                            formik.setFieldValue("checkbox1", event.target.checked)
                        }}
                    />
                    <CheckBox
                        variant={'dark'}
                        className={'mb-4'}
                        id="checkboxStatus"
                        name={"checkboxStatus"}
                        checked={formik.values.checkbox2}
                        label={formik.values.checkbox2 ? "Checked" : "Unchecked"}
                        onChange={(event) => {
                            formik.setFieldValue("checkbox2", event.target.checked)
                        }}
                    />
                    <CheckBox
                        size={'lg'}
                        variant={'dark'}
                        className={'mb-4'}
                        id="checkboxStatus-lg"
                        name={"checkboxStatus"}
                        checked={formik.values.checkbox3}
                        label={formik.values.checkbox3 ? "Checked" : "Unchecked"}
                        onChange={(event) => {
                            formik.setFieldValue("checkbox3", event.target.checked)
                        }}
                    />

                    <CheckBox
                        size={'sm'}
                        variant={'dark'}
                        className={'mb-4'}
                        disabled={true}
                        id="checkboxDisabled-sm"
                        name={"checkboxDisabled"}
                        checked={formik.values.checkboxStatus}
                        label={formik.values.checkboxStatus ? "Checked" : "Unchecked"}
                        onChange={(event) => {
                            formik.setFieldValue("checkboxStatus", event.target.checked)
                        }}
                    />
                    <CheckBox
                        variant={'dark'}
                        className={'mb-4'}
                        id="checkboxDisabled"
                        disabled={true}
                        name={"checkboxDisabled"}
                        checked={formik.values.checkboxStatus}
                        label={formik.values.checkboxStatus ? "Checked" : "Unchecked"}
                        onChange={(event) => {
                            formik.setFieldValue("checkboxStatus", event.target.checked)
                        }}
                    />
                    <CheckBox
                        size={'lg'}
                        variant={'dark'}
                        disabled={true}
                        id="checkboxDisabled-lg"
                        name={"checkboxDisabled"}
                        checked={formik.values.checkboxStatus}
                        label={formik.values.checkboxStatus ? "Checked" : "Unchecked"}
                        onChange={(event) => {
                            formik.setFieldValue("checkboxStatus", event.target.checked)
                        }}
                    />
                </div>
                <div>
                    <h1 className="text-h5 mb-3">Radio</h1>
                    <Radio
                        size={'sm'}
                        variant={'dark'}
                        className={'mb-4'}
                        id="radioStatus-sm"
                        name={"radioStatus"}
                        checked={formik.values.radioStatus}
                        label={formik.values.radioStatus ? "Small Radio Checked" : "Small Radio Unchecked"}
                        onChange={(event) => {
                            formik.setFieldValue("radioStatus", event.target.checked)
                        }}
                    />
                    <Radio
                        variant={'dark'}
                        className={'mb-4'}
                        id="radioStatus"
                        name={"radioStatus"}
                        checked={formik.values.radioStatus}
                        label={formik.values.radioStatus ? "Default Radio Checked" : "Default Radio Unchecked"}
                        onChange={(event) => {
                            formik.setFieldValue("radioStatus", event.target.checked)
                        }}
                    />
                    <Radio
                        size={'lg'}
                        variant={'dark'}
                        className={'mb-4'}
                        id="radioStatus-lg"
                        name={"radioStatus"}
                        checked={formik.values.radioStatus}
                        label={formik.values.radioStatus ? "Large Radio Checked" : "Large Radio Unchecked"}
                        onChange={(event) => {
                            formik.setFieldValue("radioStatus", event.target.checked)
                        }}
                    />

                    <Radio
                        size={'sm'}
                        variant={'dark'}
                        className={'mb-4'}
                        disabled={true}
                        id="radioDisabled-sm"
                        name={"radioDisabled"}
                        checked={formik.values.radioStatus}
                        label={formik.values.radioStatus ? "Small Radio Disabled" : "Small Radio Disabled"}
                        onChange={(event) => {
                            formik.setFieldValue("radioStatus", event.target.checked)
                        }}
                    />
                    <Radio
                        variant={'dark'}
                        className={'mb-4'}
                        id="radioDisabled"
                        disabled={true}
                        name={"radioDisabled"}
                        checked={formik.values.radioStatus}
                        label={formik.values.radioStatus ? "Default Radio Disabled" : "Default Radio Disabled"}
                        onChange={(event) => {
                            formik.setFieldValue("radioStatus", event.target.checked)
                        }}
                    />
                    <Radio
                        size={'lg'}
                        variant={'dark'}
                        disabled={true}
                        id="radioDisabled-lg"
                        name={"radioDisabled"}
                        checked={formik.values.radioStatus}
                        label={formik.values.radioStatus ? "Large Radio Disabled" : "Large Radio Disabled"}
                        onChange={(event) => {
                            formik.setFieldValue("radioStatus", event.target.checked)
                        }}
                    />
                </div>
                <div>
                    <h1 className="text-h5 mb-3">ToggleCheck</h1>
                    <div className="zt-formGroup mb-4">
                        <ToggleCheck
                            id="toggleCheck1"
                            variant={'themePrimary'}
                            disabled={false}
                            className={''}
                            checked={formik.values.toggleCheck1}
                            label={formik.values.toggleCheck1 ? "Checked" : "Unchecked"}
                            onChange={(event) => {
                                formik.setFieldValue("toggleCheck1", event.target.checked)
                            }}
                        />
                    </div>
                    <div className="zt-formGroup mb-4">
                        <ToggleCheck
                            id="toggleCheck2"
                            variant={'themePurple'}
                            disabled={false}
                            className={''}
                            checked={formik.values.toggleCheck2}
                            label={formik.values.toggleCheck2 ? "Variant Checked" : "Variant Unchecked"}
                            onChange={(event) => {
                                formik.setFieldValue("toggleCheck2", event.target.checked)
                            }}
                        />
                    </div>
                    <div className="zt-formGroup mb-4">
                        <ToggleCheck
                            id="toggleCheck3"
                            variant={'themePrimary'}
                            disabled={true}
                            className={''}
                            checked={formik.values.toggleCheck3}
                            label={formik.values.toggleCheck3 ? "Checked" : "Unchecked"}
                            onChange={(event) => {
                                formik.setFieldValue("toggleCheck3", event.target.checked)
                            }}
                        />
                    </div>
                    <div className="zt-formGroup">
                        <ToggleCheck
                            id="toggleCheck4"
                            variant={'themePrimary'}
                            disabled={true}
                            className={''}
                            checked={formik.values.toggleCheck4}
                            label={formik.values.toggleCheck4 ? "Checked" : "Unchecked"}
                            onChange={(event) => {
                                formik.setFieldValue("toggleCheck4", event.target.checked)
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
                <div>
                    <h1 className="text-h6 mb-3">Search Select</h1>
                    <p>selecetd Value: {formik.values.fruit}</p>
                    <SearchSelect
                        label={"Fruit"}
                        onBlur={formik.handleBlur}
                        onInput={formik.handleBlur}
                        error={formik.errors.fruit}
                        list={selectList}
                        value={formik.values.fruit}
                        placeholder={"Select Fruit"}
                        onChange={(value) => formik.setFieldValue("fruit", value)}
                        required />
                </div>
                <div>
                    <h1 className="text-h6 mb-3">Multi Select</h1>
                    <p>selecetd Value: {formik.values.multiFruit?.join(", ")}</p>
                    <MultiSelect
                        label={"Select Multi Fruit"}
                        onBlur={formik.handleBlur}
                        onInput={formik.handleBlur}
                        error={formik.errors.multiFruit}
                        list={selectList}
                        value={formik.values.multiFruit}
                        placeholder={"Select Fruit"}
                        onChange={(value) => formik.setFieldValue("multiFruit", value)}
                        required />
                </div>
                <div>
                    <h1 className="text-h6 mb-3">Form Input</h1>
                    <p>Value typed: {formik.values.name}</p>
                    <Input
                        name="name"
                        formik={formik}
                        label={'Form Input'}
                        value={formik.values.name}
                        required
                    />
                </div>
                <div>
                    <h1 className="text-h6 mb-3">Date Picker</h1>
                    <p>Value typed:</p>
                    <Datepicker className={"dateTimePicker"} />
                </div>
            </div>

            <div className="flex flex-col gap-4 xl:grid xl:grid-cols-2 mb-8">
                <div>
                    <h1 className="text-h5 mb-2">Default Buttons</h1>
                    <div className="flex flex-wrap gap-4 items-baseline">
                        <Button type="submit" value={t('Dark')} variant={'dark'} />
                        <Button type="submit" value={t('Primary')} variant={'primary'} />
                        <Button type="submit" value={t('Secondary')} variant={'secondary'} />
                        <Button type="submit" value={t('Success')} variant={'success'} />
                        <Button type="submit" value={t('Danger')} variant={'danger'} />
                    </div>
                </div>
                <div>
                    <h1 className="text-h5 mb-2">Default Buttons Outline</h1>
                    <div className="flex flex-wrap gap-4 items-baseline">
                        <Button type="submit" value={t('Dark')} variant={'dark-outline'} />
                        <Button type="submit" value={t('Primary')} variant={'primary-outline'} />
                        <Button type="submit" value={t('Secondary')} variant={'secondary-outline'} />
                        <Button type="submit" value={t('Success')} variant={'success-outline'} />
                        <Button type="submit" value={t('Danger')} variant={'danger-outline'} />
                    </div>
                </div>
                <div>
                    <h1 className="text-h5 mb-2">Button Large Size</h1>
                    <div className="flex flex-wrap gap-4 items-baseline">
                        <Button type="submit" value={t('Dark')} size={'lg'} variant={'dark'} />
                        <Button type="submit" value={t('Primary')} size={'lg'} variant={'primary'} />
                        <Button type="submit" value={t('Secondary')} size={'lg'} variant={'secondary'} />
                        <Button type="submit" value={t('Success')} size={'lg'} variant={'success'} />
                        <Button type="submit" value={t('Danger')} size={'lg'} variant={'danger'} />
                    </div>
                </div>
                <div>
                    <h1 className="text-h5 mb-2">Button Large Size</h1>
                    <div className="flex flex-wrap gap-4 items-baseline">
                        <Button type="submit" value={t('Dark')} size={'lg'} variant={'dark-outline'} />
                        <Button type="submit" value={t('Primary')} size={'lg'} variant={'primary-outline'} />
                        <Button type="submit" value={t('Secondary')} size={'lg'} variant={'secondary-outline'} />
                        <Button type="submit" value={t('Success')} size={'lg'} variant={'success-outline'} />
                        <Button type="submit" value={t('Danger')} size={'lg'} variant={'danger-outline'} />
                    </div>
                </div>
                <div>
                    <h1 className="text-h5 mb-2">Button Small Size</h1>
                    <div className="flex flex-wrap gap-4 items-baseline">
                        <Button type="submit" value={t('Dark')} size={'sm'} variant={'dark'} />
                        <Button type="submit" value={t('Primary')} size={'sm'} variant={'primary'} />
                        <Button type="submit" value={t('Secondary')} size={'sm'} variant={'secondary'} />
                        <Button type="submit" value={t('Success')} size={'sm'} variant={'success'} />
                        <Button type="submit" value={t('Danger')} size={'sm'} variant={'danger'} />
                    </div>
                </div>
                <div>
                    <h1 className="text-h5 mb-2">Button Small Size</h1>
                    <div className="flex flex-wrap gap-4 items-baseline">
                        <Button type="submit" value={t('Dark')} size={'sm'} variant={'dark-outline'} />
                        <Button type="submit" value={t('Danger')} size={'sm'} variant={'primary-outline'} />
                        <Button type="submit" value={t('Primary')} size={'sm'} variant={'secondary-outline'} />
                        <Button type="submit" value={t('Secondary')} size={'sm'} variant={'success-outline'} />
                        <Button type="submit" value={t('Success')} size={'sm'} variant={'danger-outline'} />
                    </div>
                </div>
                <div>
                    <h1 className="text-h5 mb-2">Button disabled Style</h1>
                    <div className="flex flex-wrap gap-4 items-baseline">
                        <Button type="submit" value={t('Dark')} variant={'dark'} disabled />
                        <Button type="submit" value={t('Primary')} variant={'primary'} disabled />
                        <Button type="submit" value={t('Secondary')} variant={'secondary'} disabled />
                        <Button type="submit" value={t('Success')} variant={'success'} disabled />
                        <Button type="submit" value={t('Danger')} variant={'danger'} disabled />
                    </div>
                </div>
                <div>
                    <h1 className="text-h5 mb-2">Button disabled Style</h1>
                    <div className="flex flex-wrap gap-4 items-baseline">
                        <Button type="submit" value={t('Dark')} variant={'dark-outline'} disabled />
                        <Button type="submit" value={t('Primary')} variant={'primary-outline'} disabled />
                        <Button type="submit" value={t('Secondary')} variant={'secondary-outline'} disabled />
                        <Button type="submit" value={t('Success')} variant={'success-outline'} disabled />
                        <Button type="submit" value={t('Danger')} variant={'danger-outline'} disabled />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 xl:grid xl:grid-cols-2 mb-8">
                <h3 className="text-h5 mb-2">Side Panel</h3>
                <Button className={'mb-8'} type="button" value={"Open side panel"} variant={'primary'} onClick={() => setOpen(true)} />
                {open && <CreateEmployeeFrom onClose={() => setOpen(false)} />}
            </div>

            <div className="flex flex-col gap-4 xl:grid xl:grid-cols-2 mb-8">
                <ul className="iconList grid grid-cols-12 gap-4">
                    <li><Filter className={''} width={''} height={''} /></li>
                    <li><Edit className={''} width={''} height={''} /></li>
                    <li><Trash className={''} width={''} height={''} /></li>
                    <li><Calendar className={''} width={''} height={''} /></li>
                    <li><SortEmpty className={''} width={''} height={''} /></li>
                    <li><SortAsc className={''} width={''} height={''} /></li>
                    <li><SortDesc className={''} width={''} height={''} /></li>
                    <li><Check className={''} width={''} height={''} /></li>
                    <li><Moon className={''} width={''} height={''} /></li>
                    <li><Sun className={''} width={''} height={''} /></li>
                    <li><InputErrorInfo className={''} width={''} height={''} /></li>
                    <li><EyeOn className={''} width={''} height={''} /></li>
                    <li><EyeOff className={''} width={''} height={''} /></li>
                    <li><CloseCross className={''} width={''} height={''} /></li>
                    <li><AlertRedDot className={''} width={''} height={''} /></li>
                    <li><MessageRedDot className={''} width={''} height={''} /></li>
                    <li><SearchIcon className={''} width={''} height={''} /></li>
                    <li><Dashboard className={''} width={''} height={''} /></li>
                    <li><Employees className={''} width={''} height={''} /></li>
                    <li><Attendance className={''} width={''} height={''} /></li>
                    <li><Leave className={''} width={''} height={''} /></li>
                    <li><Connect className={''} width={''} height={''} /></li>
                    <li><RemoteWork className={''} width={''} height={''} /></li>
                    <li><Recruitment className={''} width={''} height={''} /></li>
                    <li><Payroll className={''} width={''} height={''} /></li>
                    <li><Report className={''} width={''} height={''} /></li>
                    <li><Organization className={''} width={''} height={''} /></li>
                    <li><HelpDesk className={''} width={''} height={''} /></li>
                    <li><HelpLine className={''} width={''} height={''} /></li>
                    <li><ChevronLeft className={''} width={''} height={''} /></li>
                    <li><ChevronRight className={''} width={''} height={''} /></li>
                    <li><ChevronDown className={''} width={''} height={''} /></li>
                    <li><EclipseLoader className={''} width={''} height={''} /></li>
                    <li><InterWindLoader className={''} width={''} height={''} /></li>
                    <li><Spinner className={''} width={''} height={''} /></li>
                    <li><ThreeDotsHorizontal className={''} width={''} height={''} /></li>
                    <li><ThreeDotsVertical className={''} width={''} height={''} /></li>
                    <li><NotificationBell className={''} width={''} height={''} /></li>
                    <li><Gear className={''} width={''} height={''} /></li>
                    <li><Users className={''} width={''} height={''} /></li>
                    <li><Tick className={''} width={''} height={''} /></li>
                    <li><Minus className={''} width={''} height={''} /></li>
                </ul>
            </div>

            <div className="flex gap-4 xl:grid xl:grid-cols-12 mb-8">
                <span className='zt-tag zt-tag-primary'>PROBATION</span>
                <span className='zt-tag zt-tag-dark'>PROBATION</span>
                <span className='zt-tag zt-tag-secondary'>PROBATION</span>
                <span className='zt-tag zt-tag-success'>PROBATION</span>
                <span className='zt-tag zt-tag-danger'>PROBATION</span>
                <span className='zt-tag zt-tag-purple'>PROBATION</span>
            </div>
        </div>
    );
}

Home.layout = LandingPage;