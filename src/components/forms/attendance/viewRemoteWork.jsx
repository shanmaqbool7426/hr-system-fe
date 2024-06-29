import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import { Table, Textarea } from '@/components/elements';
import { useState } from 'react';

export default function ViewRemoteWorkForm({ title, onClose, type, object, additionFields }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
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
    const formElements = [
        {
            type: "text",
            name: "RequestedBy",
            label: t('Requested By'),
            placeholder: t("John"),
            required: true,
            value: formik.values.requestedBy,
            containerClass:"col-span-2"
        },
        // {
        //     type: "text",
        //     name: "RequestedFor",
        //     label: t('Requested For'),
        //     placeholder: t("John"),
        //     required: true,
        //     value: formik.values.requestedFor,
        // },
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
        { title: t("In Date"), col: 'inDate' },
        { title: t("In Time"), col: "inTime" },
        { title: t("Out Date"), col: 'OutDate' },
        { title: t("Out Time"), col: "OutTime" },
    ]
    const previousRows = [{
        inDate: "22 May 2024",
        inTime: "08:44 PM",
        OutDate: "22 May 2024",
        OutTime: "08:44 PM",
    }, 
    ]
    return (
        <BaseForm title={title} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} >
            <div className='py-6 flex flex-col items-start gap-6'>
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
                    className={'zt-employeeTable zt-viewRemoteWorkTable'}
                />
                <h4 className='text-sm mb-0'>{t('Remote Work Request Detail')}</h4>
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
                            className={'zt-employeeTable zt-viewRemoteWorkTable'}
                        /> 
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

ViewRemoteWorkForm.defaultProps = {
    additionFields: []
}