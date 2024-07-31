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

export default function PenaltyLeaveDeductionForm({onClose,object }) {
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
            icon: object?.icon || "",
            prefix: object?.prefix || "",
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
    return (
        <BaseForm title={object ? `Panelty Leave Deduction` : `Panelty Leave Deduction`}  formik={formik} onClose={onClose} is_loading={false} >
            <div className='py-6 flex flex-col items-start col-span-2'>
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