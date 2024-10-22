import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'next-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import { Table, Textarea } from '@/components/elements';
import { useState } from 'react';

export default function ViewAttendanceForm({ onClose,object }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
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
        Toast.success(object ? t(`updated successfully`) : t(`created successfully`))
        onClose()
    }
    const formElements = [
        {
            type: "text",
            name: "RequestedBy",
            label: t('Requested By'),
            placeholder: t("John"),
            required: true,
            value: formik.values.requestedBy,
        },
        {
            type: "text",
            name: "RequestedFor",
            label: t('Requested For'),
            placeholder: t("John"),
            required: true,
            value: formik.values.requestedFor,
        },
    ]
    const headings = [
        { title: t("Employee Name"), col: 'name' },
        { title: t("Status"), col: 'status' },
        { title: t("Action"), col: "action" },
        { title: t("Remarks"), col: "Remarks" }, 
    ]
    const rows = [{
        name: <div className="flex items-center justify-start gap-4 grow">
            <figure className={'w-6 h-6 overflow-hidden rounded-full bg-themePrimary200 shrink-0'}></figure>
            <div className={'flex flex-col gap-1 text-left'}>
                <strong className={'text-themeGrayscale text-sm'}>{t('Kelli Lebsack')}</strong>
                <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
            </div>
        </div>,
        status: "Requested",
        action: "-",
        Remarks: "-"
    },
    {
        name: <div className="flex items-center justify-start gap-4 grow">
            <figure className={'w-6 h-6 overflow-hidden rounded-full bg-themePrimary200 shrink-0'}></figure>
            <div className={'flex flex-col gap-1 text-left'}>
                <strong className={'text-themeGrayscale text-sm'}>{t('Kelli Lebsack')}</strong>
                <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
            </div>
        </div>,
        status: "Pending",
        action: "-",
        Remarks: "-"
    },
    ]
    const previousHeadings = [
        { title: t("Status"), col: 'status' },
        { title: t("Date"), col: "date" },
        { title: t("Time"), col: "time" },
    ]
    const previousRows = [{
        status: "Sign In",
        date: "22 May 2024",
        time: "-"
    },
    {
        status: "Sign Out",
        date: "22 May 2024",
        time: "-"
    },
    ]
    return (
        <BaseForm title={'Attendance Approval Routing'} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} >
            <div className='py-6 flex flex-col items-start gap-6 col-span-2'>
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
                    className={'zt-employeeTable zt-attendanceTableTable w-full'}
                />
                <h3>{t('Attendance Request Comparison')}</h3>
                <div className='grid grid-cols-2 gap-6 w-full'>
                    <div className='flex flex-col items-start gap-4 p-4 border border-themeGrayscale300 rounded-2xl'>
                        <h4 className='text-sm mb-0'>{t('Previous Data')}</h4>
                        <Table
                            headings={previousHeadings}
                            rows={previousRows}
                            sortCol={sortCol}
                            setSortCol={setSortCol}
                            sortDir={sortDir}
                            setSortDir={setSortDir}
                            perPage={perPage}
                            setPerPage={setPerPage}
                            page={page}
                            setPage={setPage}
                            className={'zt-employeeTable zt-recruitmentTable'}
                        />
                    </div>
                    <div className='flex flex-col items-start gap-4 p-4 border border-themeGrayscale300 rounded-2xl'>
                        <h4 className='text-sm mb-0'>{t('Previous Data')}</h4>
                        <Table
                            headings={previousHeadings}
                            rows={previousRows}
                            sortCol={sortCol}
                            setSortCol={setSortCol}
                            sortDir={sortDir}
                            setSortDir={setSortDir}
                            perPage={perPage}
                            setPerPage={setPerPage}
                            page={page}
                            setPage={setPage}
                            className={'zt-employeeTable zt-recruitmentTable'}
                        />
                    </div>
                </div>
                <Textarea
                    type={'textarea'}
                    name={'reason'}
                    label={t('Reason')}
                    containerClass={'w-full'}
                    value={formik.values.detail}
                    formik={formik}
                    onChange={(event) => { formik.setFieldValue('detail', event.target.value) }}
                    rows={5}
                />
            </div>
        </BaseForm>
    )
}

ViewAttendanceForm.defaultProps = {
    additionFields: []
}