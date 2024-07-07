import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import { Button, MultiSelect, Table } from '@/components/elements';
import { useState } from 'react';
import { Plus, Trash } from '@/components/svg';

export default function AddPenaltyForm({onClose,object }) {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [leaveType, setLeaveType] = useState([]);
    const leaves = ['Full day', 'Half day']; // Example list
    const headings = [
        { title: t("Sequence"), col: 'Sequence' },
        { title: t("Leave Type"), col: 'LeaveType' },
        { title: t("Action"), col: "action" },
    ]
    const rows = [{
        Sequence: "1",
        LeaveType: <MultiSelect containerClass='w-[360px] mx-auto'
            list={leaves.map((leave) => ({ value: leave, display: leave }))}
            value={leaveType}
            onChange={(selected) => setLeaveType(selected)}
            placeholder= "Select One"
        />,
        action: <Button variant={"light-danger"} className={'!py-2 !px-2'}><Trash /></Button>,
    },
    {
        Sequence: "2",
        LeaveType: <MultiSelect containerClass='w-[360px] mx-auto'
            list={leaves.map((leave) => ({ value: leave, display: leave }))}
            value={leaveType}
            onChange={(selected) => setLeaveType(selected)}
            placeholder="Select One"
        />,
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
        label: t('Rule Name'),
        placeholder: t("Rule Name"),
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Employee Group'),
        list: ["Yes", "No"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Attendance Flag'),
        list: ["Yes", "No"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Action'),
        list: ["Delete", "Edit"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "text",
        name: "ShiftName",
        label: t('Flag Count'),
        placeholder: t("Flag Count"),
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Conditional Exemption'),
        list: ["None", "Yes"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Effect Quantity'),
        list: ["9", "7"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Effect Frequency'),
        list: ["once", "twice"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Employee Exempted'),
        list: ["Jhon Carry, Wick Jerry", "Jhon Carry, Wick Jerry"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Employee Status'),
        list: ["All", "No"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Gender'),
        list: ["Male", "Fmale"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "text",
        name: "ShiftName",
        label: t('Exempted Count'),
        placeholder: t("Exempted Count"),
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Exempted Penalty Duration'),
        list: ["Full day", "Half day"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Apply Penalty On Missing Attendance'),
        list: ["No", "Yes"],
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
                    className={'zt-employeeTable zt-addPaneltyRuleTable'}
                />
                <Button variant={'dark-outline'}><Plus /> Add New Line</Button>
            </div>

        </BaseForm>
    )
}

AddPenaltyForm.defaultProps = {
    additionFields: []
}