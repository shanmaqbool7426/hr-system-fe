import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import { Button, Select, Table } from '@/components/elements';
import { useState } from 'react';
import { Plus, Trash } from '@/components/svg';

export default function CreateAttendanceForm({ title, onClose, type, object, additionFields }) {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)

    const headings = [
        { title: t("Attendance Flag"), col: 'AttendanceFlag' },
        { title: t("From Time"), col: 'FromTime' },
        { title: t("To Time"), col: "ToTime" },
        { title: t("Btw Shift Time"), col: "BtwShiftTime" },
        { title: t("Action"), col: "action" },
    ]
    const rows = [{
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
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            type,
            icon: object?.icon || "",
            prefix: object?.prefix || "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('formik.nameRequired')),
            icon: additionFields.length > 0 ? Yup.string().required(t('formik.nameRequired')) : Yup.string().optional(),
            prefix: additionFields.length > 0 ? Yup.string().required(t('formik.nameRequired')) : Yup.string().optional(),
        }),
        onSubmit: async (values) => {

            return object ? dispatch(UpdateCustomfield(object._id, values, onCompleted)) : dispatch(CreateCustomfield(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`${type} updated successfully`) : t(`${type} created successfully`))
        onClose()
    }
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
        name: "ShiftName",
        label: t('Start Time'),
        placeholder: t("Start Time"),
        required: true,
        value: formik.values.name,
    },
    {
        type: "text",
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
        label: t('Max Start Time'),
        placeholder: t("Max Start Time"),
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Shift End On Next  Day '),
        list: ["Yes", "No"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Shift Break'),
        list: ["Yes", "No"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "text",
        name: "ShiftName",
        label: t('Break Start Time'),
        placeholder: t("Break Start Time"),
        required: true,
        value: formik.values.name,
    },
    {
        type: "text",
        name: "ShiftName",
        label: t('Break End Time'),
        placeholder: t("Break End Time"),
        required: true,
        value: formik.values.name,
    },
    ]
    return (
        <BaseForm title={object ? `Edit ${title}` : `Add ${title}`} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} >
            <div className='py-6 flex flex-col items-start'>
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
                    className={'zt-employeeTable zt-addAttendanceTable'}
                />
                <Button variant={'dark-outline'}><Plus/> Add New Line</Button>                
            </div>

        </BaseForm>
    )
}

CreateAttendanceForm.defaultProps = {
    additionFields: []
}