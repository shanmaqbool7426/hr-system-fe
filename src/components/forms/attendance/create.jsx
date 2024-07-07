import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import { Button, SearchSelect, Select, Table, ToggleCheck } from '@/components/elements';
import { useState } from 'react';
import { Plus, Trash } from '@/components/svg';

export default function CreateAttendanceForm({ onClose, object }) {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            icon: object?.icon || "",
            prefix: object?.prefix || "",
            break: true,
            durationMon: '',
            durationTue: '',
            durationWed: '',
            durationThr: '',
            durationFri: '',
            durationSat: '',
            durationSun: '',
            radioStatus: object?.radioStatus || "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('formik.nameRequired')),
        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateCustomfield(object._id, values, onCompleted)) : dispatch(CreateCustomfield(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`${type} updated successfully`) : t(`${type} created successfully`))
        onClose()
    }
    const selectList = [
        { display: "9:00:00 PM", value: "9:00:00 PM" },
        { display: "8:00:00 PM", value: "8:00:00 PM" },
        { display: "6:00:00 PM", value: "6:00:00 PM" },
    ]
    const flexibleselectList = [
        { display: "9:00:00", value: "9:00:00" },
        { display: "8:00:00", value: "8:00:00" },
        { display: "6:00:00", value: "6:00:00" },
    ]
    const headings = [
        { title: t("Working Day"), col: 'workingDay' },
        { title: t("From"), col: 'From' },
        { title: t("To"), col: "To" },
    ]
    const rows = [
        {
            workingDay: <div className='flex items-center gap-4 font-semibold'>
                <ToggleCheck
                    id="Monday"
                    variant={'themePrimary'}
                    disabled={false}
                />
                <span>{t("Monday")}</span>
            </div>,
            From: <SearchSelect
                list={selectList}
                value={formik.values.durationMon}
                placeholder={"9:00:00 PM"}
                onChange={(value) => formik.setFieldValue("durationMon", value)}
                required />,
            To: <SearchSelect
                list={selectList}
                value={formik.values.durationMon}
                placeholder={"9:00:00 PM"}
                onChange={(value) => formik.setFieldValue("durationMon", value)}
                required />,
        },
        {
            workingDay: <div className='flex items-center gap-4 font-semibold'>
                <ToggleCheck
                    id="tuesday"
                    variant={'themePrimary'}
                    disabled={false}
                />
                <span>{t("Tuesday")}</span>
            </div>,
            From: <SearchSelect
                list={selectList}
                value={formik.values.durationMon}
                placeholder={"9:00:00 PM"}
                onChange={(value) => formik.setFieldValue("durationMon", value)}
                required />,
            To: <SearchSelect
                list={selectList}
                value={formik.values.durationMon}
                placeholder={"9:00:00 PM"}
                onChange={(value) => formik.setFieldValue("durationMon", value)}
                required />,
        },
        {
            workingDay: <div className='flex items-center gap-4 font-semibold'>
                <ToggleCheck
                    id="Wednesday"
                    variant={'themePrimary'}
                    disabled={false}
                />
                <span>{t("Wednesday")}</span>
            </div>,
            From: <SearchSelect
                list={selectList}
                value={formik.values.durationMon}
                placeholder={"9:00:00 PM"}
                onChange={(value) => formik.setFieldValue("durationMon", value)}
                required />,
            To: <SearchSelect
                list={selectList}
                value={formik.values.durationMon}
                placeholder={"9:00:00 PM"}
                onChange={(value) => formik.setFieldValue("durationMon", value)}
                required />,
        },
        {
            workingDay: <div className='flex items-center gap-4 font-semibold'>
                <ToggleCheck
                    id="Thrusday"
                    variant={'themePrimary'}
                    disabled={false}
                />
                <span>{t("Thrusday")}</span>
            </div>,
            From: <SearchSelect
                list={selectList}
                value={formik.values.durationMon}
                placeholder={"9:00:00 PM"}
                onChange={(value) => formik.setFieldValue("durationMon", value)}
                required />,
            To: <SearchSelect
                list={selectList}
                value={formik.values.durationMon}
                placeholder={"9:00:00 PM"}
                onChange={(value) => formik.setFieldValue("durationMon", value)}
                required />,
        },
        {
            workingDay: <div className='flex items-center gap-4 font-semibold'>
                <ToggleCheck
                    id="Friday"
                    variant={'themePrimary'}
                    disabled={false}
                />
                <span>{t("Friday")}</span>
            </div>,
            From: <SearchSelect
                list={selectList}
                value={formik.values.durationMon}
                placeholder={"9:00:00 PM"}
                onChange={(value) => formik.setFieldValue("durationMon", value)}
                required />,
            To: <SearchSelect
                list={selectList}
                value={formik.values.durationMon}
                placeholder={"9:00:00 PM"}
                onChange={(value) => formik.setFieldValue("durationMon", value)}
                required />,
        },
        {
            workingDay: <div className='flex items-center gap-4 font-semibold'>
                <ToggleCheck
                    id="Satuarday"
                    variant={'themePrimary'}
                    disabled={false}
                />
                <span>{t("Satuarday")}</span>
            </div>,
            From: <SearchSelect
                list={selectList}
                value={formik.values.durationMon}
                placeholder={"9:00:00 PM"}
                onChange={(value) => formik.setFieldValue("durationMon", value)}
                required />,
            To: <SearchSelect
                list={selectList}
                value={formik.values.durationMon}
                placeholder={"9:00:00 PM"}
                onChange={(value) => formik.setFieldValue("durationMon", value)}
                required />,
        },
        {
            workingDay: <div className='flex items-center gap-4 font-semibold'>
                <ToggleCheck
                    id="Sunday"
                    variant={'themePrimary'}
                    disabled={false}
                />
                <span>{t("Sunday")}</span>
            </div>,
            From: <SearchSelect
                list={selectList}
                value={formik.values.durationMon}
                placeholder={"9:00:00 PM"}
                onChange={(value) => formik.setFieldValue("durationMon", value)}
                required />,
            To: <SearchSelect
                list={selectList}
                value={formik.values.durationMon}
                placeholder={"9:00:00 PM"}
                onChange={(value) => formik.setFieldValue("durationMon", value)}
                required />,
        },
    ]

    const flexibleHeadings = [
        { title: t("Working Day"), col: 'workingDay' },
        { title: t("Working Hours"), col: 'workingHours' },
    ]
    const flexibleRows = [
        {
            workingDay: <div className='flex items-center gap-4 font-semibold'>
                <ToggleCheck
                    id="Monday"
                    variant={'themePrimary'}
                    disabled={false}
                />
                <span>{t("Monday")}</span>
            </div>,
            workingHours: <SearchSelect
                list={flexibleselectList}
                value={formik.values.durationMon}
                placeholder={"9:00:00"}
                onChange={(value) => formik.setFieldValue("durationMon", value)}
                required />,
        },
        {
            workingDay: <div className='flex items-center gap-4 font-semibold'>
                <ToggleCheck
                    id="tuesday"
                    variant={'themePrimary'}
                    disabled={false}
                />
                <span>{t("Tuesday")}</span>
            </div>,
            workingHours: <SearchSelect
                list={flexibleselectList}
                value={formik.values.durationTue}
                placeholder={"9:00:00"}
                onChange={(value) => formik.setFieldValue("durationTue", value)}
                required />,
        },
        {
            workingDay: <div className='flex items-center gap-4 font-semibold'>
                <ToggleCheck
                    id="Wednesday"
                    variant={'themePrimary'}
                    disabled={false}
                />
                <span>{t("Wednesday")}</span>
            </div>,
            workingHours: <SearchSelect
                list={flexibleselectList}
                value={formik.values.durationWed}
                placeholder={"9:00:00"}
                onChange={(value) => formik.setFieldValue("durationWed", value)}
                required />,
        },
        {
            workingDay: <div className='flex items-center gap-4 font-semibold'>
                <ToggleCheck
                    id="Thrusday"
                    variant={'themePrimary'}
                    disabled={false}
                />
                <span>{t("Thrusday")}</span>
            </div>,
            workingHours: <SearchSelect
                list={flexibleselectList}
                value={formik.values.durationThr}
                placeholder={"9:00:00"}
                onChange={(value) => formik.setFieldValue("durationThr", value)}
                required />,
        },
        {
            workingDay: <div className='flex items-center gap-4 font-semibold'>
                <ToggleCheck
                    id="Friday"
                    variant={'themePrimary'}
                    disabled={false}
                />
                <span>{t("Friday")}</span>
            </div>,
            workingHours: <SearchSelect
                list={flexibleselectList}
                value={formik.values.durationFri}
                placeholder={"9:00:00"}
                onChange={(value) => formik.setFieldValue("durationFri", value)}
                required />,
        },
        {
            workingDay: <div className='flex items-center gap-4 font-semibold'>
                <ToggleCheck
                    id="Satuarday"
                    variant={'themePrimary'}
                    disabled={false}
                />
                <span>{t("Satuarday")}</span>
            </div>,
            workingHours: <SearchSelect
                list={flexibleselectList}
                value={formik.values.durationSat}
                placeholder={"9:00:00"}
                onChange={(value) => formik.setFieldValue("durationSat", value)}
                required />,
        },
        {
            workingDay: <div className='flex items-center gap-4 font-semibold'>
                <ToggleCheck
                    id="Sunday"
                    variant={'themePrimary'}
                    disabled={false}
                />
                <span>{t("Sunday")}</span>
            </div>,
            workingHours: <SearchSelect
                list={flexibleselectList}
                value={formik.values.durationSun}
                placeholder={"9:00:00"}
                onChange={(value) => formik.setFieldValue("durationSun", value)}
                required />,
        },
    ]
    const flagHeadings = [
        { title: t("Attendance Flag"), col: 'AttendanceFlag' },
        { title: t("From Time"), col: 'FromTime' },
        { title: t("To Time"), col: "ToTime" }, 
        { title: t("Action"), col: "action" },
    ]
    const flagRows = [{
        AttendanceFlag: "Half Day",
        FromTime: "9:00:00 AM",
        ToTime: "6:00:00 PM",
        BtwShiftTime: "Yes",
        action: <Button variant={"light-danger"} className={'!py-2 !px-2'}><Trash /></Button>,
    },
    {
        AttendanceFlag: "Sing Out",
        FromTime: "9:00:00 AM",
        ToTime: "6:00:00 PM",
        BtwShiftTime: "No",
        action: <Button variant={"light-danger"} className={'!py-2 !px-2'}><Trash /></Button>,
    },
    {
        AttendanceFlag:
            <div className='w-[144px]'>
                <Select
                    placeholder={"Select One"}
                    options={[
                        "Sing Out",
                        "Half Day",
                    ]} /> </div>,
        FromTime: <div className='w-[144px]'>
            <Select
                placeholder={"Select One"}
                options={[
                    "9:00:00 AM",
                    "9:00:00 AM",
                ]} /> </div>,
        ToTime: <div className='w-[144px]'>
            <Select
                placeholder={"Select One"}
                options={[
                    "9:00:00 AM",
                    "9:00:00 AM",
                ]} /> </div>,
        BtwShiftTime: <div className='w-[85px]'>
            <Select
                placeholder={"Select One"}
                options={[
                    "No",
                    "Yes",
                ]} /> </div>,
        action: <Button variant={"light-danger"} className={'!py-2 !px-2'}><Trash /></Button>,
    },
    ]
    const formElements = [{
        type: "text",
        name: "ShiftName",
        label: t('Shift Name'),
        placeholder: t("Shift Name"),
        required: true,
        value: formik.values.name,
    },
    {
        type: "text",
        name: "ShiftName",
        label: t('Shift Code'),
        placeholder: t("Shift Code"),
        required: true,
        value: formik.values.name,
    },
    {
        type: "text",
        name: "Effectivefrom",
        label: t('Effective from'),
        placeholder: t("Effective from"),
        required: true,
        value: formik.values.name,
    },
    {
        type: "text",
        name: "reqiuredHours",
        label: t('Required working hours/ Day'),
        placeholder: t("Required working hours/ Day"),
        required: true,
        value: formik.values.name,
    },
    {
        type: "radio",
        name: "flexibleSchedule",
        label: t('Flexible Schedule'),
        required: true,
        id: "flexibleSchedule",
        value: formik.values.radioStatus,
    },
    {
        type: "radio",
        name: "clockBased",
        label: t('Clock Based'),
        id: "clockBased",
        required: true,
        value: formik.values.radioStatus,
    },
    {
        type: formik.values.radioStatus === "clockBased" ? "text" : "hidden",
        name: "ShiftName",
        label: t('Start Time'),
        placeholder: t("Start Time"),
        required: true,
        value: formik.values.name,
    },
    {
        type: formik.values.radioStatus === "clockBased" ? "text" : "hidden",
        name: "ShiftName",
        label: t('End Time'),
        placeholder: t("End Time"),
        required: true,
        value: formik.values.name,
    },
    {
        type: "text",
        name: "ShiftName",
        label: t('Min Start Time'),
        placeholder: t("Min Start Time"),
        required: true,
        value: formik.values.name,
    },
    {
        type: "text",
        name: "ShiftName",
        label: formik.values.radioStatus === 'clockBased' ? t('Max End Time') : t('Max Start Time'),
        placeholder: formik.values.radioStatus === 'clockBased' ? t('Max End Time') : t('Max Start Time'),
        required: true,
        value: formik.values.name,
    },
    {
        type: "switch",
        name: "shiftEnd",
        id: "shiftEnd",
        label: t('Shift end on the next day'),
        checked: formik.values.shiftEnd,
    },
    {
        type: "switch",
        name: "break",
        id: "break",
        label: t('Break'),
        checked: formik.values.break,
    },
    {
        type: formik.values.break ? "text" : "hidden",

        name: "ShiftName",
        label: t('Break Start Time'),
        placeholder: t("Break Start Time"),
        required: true,
        value: formik.values.name,
    },
    {
        type: formik.values.break ? "text" : "hidden",
        name: "ShiftName",
        label: t('Break End Time'),
        placeholder: t("Break End Time"),
        required: true,
        value: formik.values.name,
    },
    ]
    return (
        <BaseForm title={object ? `Edit Shift Plan` : `Add Shift Plan`} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} >
            {formik.values.radioStatus === "clockBased" ?
                <div className='py-6 col-span-2'>
                    <Table
                        headings={headings}
                        rows={rows}
                        sortCol={sortCol}
                        setSortCol={setSortCol}
                        sortDir={sortDir}
                        setSortDir={setSortDir}
                        perPage={perPage}
                        setPerPage={setPerPage}
                        page={page}
                        setPage={setPage}
                        className={'zt-employeeTable zt-attendanceAddclockTable'}
                    />
                    <div className='py-6 flex flex-col items-start'>
                        <Table
                            headings={flagHeadings}
                            rows={flagRows}
                            sortCol={sortCol}
                            setSortCol={setSortCol}
                            sortDir={sortDir}
                            setSortDir={setSortDir}
                            perPage={perPage}
                            setPerPage={setPerPage}
                            page={page}
                            setPage={setPage}
                            className={'zt-employeeTable zt-addAttendanceTable'}
                        />
                        <Button variant={'dark-outline'}><Plus /> Add New Line</Button>
                    </div>
                </div>
                : <div className='py-6 col-span-2'>
                    <h3 className='text-xl text-start'>{t("Working Time")}</h3>
                    <Table
                        headings={flexibleHeadings}
                        rows={flexibleRows}
                        sortCol={sortCol}
                        setSortCol={setSortCol}
                        sortDir={sortDir}
                        setSortDir={setSortDir}
                        perPage={perPage}
                        setPerPage={setPerPage}
                        page={page}
                        setPage={setPage}
                        className={'zt-employeeTable zt-attendanceAddTable'}
                    />
                </div>}

        </BaseForm>
    )
}