import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import { Table, Textarea } from '@/components/elements';
import { useState } from 'react';

export default function ViewExemptionForm({ onClose,  object }) {
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
    const headings = [
        { title: t("Sch in Date"), col: 'schin' },
        { title: t("Sch Out Date"), col: 'schout' },
        { title: t("Act in Date"), col: "actIn" },
        { title: t("Act Out Date"), col: "actOut" },
        { title: t("Act in Time"), col: "actInTime" },
        { title: t("Act Out Time"), col: "actOutTime" },
        { title: t("Workig Hours"), col: "hours" },
        { title: t("Leaves"), col: "leaves" },
    ]
    const rows = [{
        schin: "22 May 2024",
        schout: "22 May 2024",
        actIn: "22 May 2024",
        actOut: "22 May 2024",
        actInTime: "22:59PM",
        actOutTime: "22:59PM",
        hours: "22 hours",
        leaves: "-"
    },
    {
        schin: "22 May 2024",
        schout: "22 May 2024",
        actIn: "22 May 2024",
        actOut: "22 May 2024",
        actInTime: "22:59PM",
        actOutTime: "22:59PM",
        hours: "22 hours",
        leaves: "-"
    },
    ] 
    return (
        <BaseForm title={'Exemption Request Details'} formik={formik} onClose={onClose} is_loading={false} >
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
                    className={'zt-employeeTable zt-viewExemptionTable'}
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

ViewExemptionForm.defaultProps = {
    additionFields: []
}