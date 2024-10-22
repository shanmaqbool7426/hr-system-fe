import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'next-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import { ToggleCheck, Input } from '@/components/elements'

export default function CreateMealMenuForm({ onClose, object }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: object?.employee?._id || "",
        },
        validationSchema: Yup.object().shape({
            employee: Yup.string().required(t('Employee is required')),
        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateCustomfield(object._id, values, onCompleted)) : dispatch(CreateCustomfield(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`Exemption request updated successfully`) : t(`Exemption request created successfully`))
        onClose()
    }
    return (
        <BaseForm title={object ? t(`Edit Meal Menu`) : t(`Add Menu`)} formik={formik} onClose={onClose} is_loading={false}>
            <div className='col-span-2 grid gap-x-2 gap-y-4 grid-cols-7 items-center'>
                <div className='flex gap-4 col-span-4'>
                    <p className='mb-0'>{t("Can employee avail meal for specific day?")}</p>
                    <ToggleCheck id='emloyee' />
                </div>
                <Input containerClass='col-span-3' label={'Company Subsidy'} />

                <div className='flex gap-4 items-center col-span-7'>
                    <ToggleCheck id='week' />
                    <p className='mb-0'>{t("Employee could not change choice before")}</p>
                    <Input containerClass='col-span-1 w-20' placeholder='02' />
                    <p className='mb-0'>{t("days of starting week.")}</p>
                </div>
                <div className='flex gap-4 items-center col-span-7'>
                    <ToggleCheck id='month' />
                    <p className='mb-0'>{t("Employee could not change choice before")}</p>
                    <Input containerClass='col-span-1 w-20' placeholder='05' />
                    <p className='mb-0'>{t("days of starting month.")}</p>
                </div>
                <Input label="Date" placeholder="01 April 2024" />
                <Input label="Lunch Menu" placeholder="Biryani" containerClass='col-span-2' />
                <Input label="Price (USD)" placeholder="10" />
                <Input label="Dinner Menu" placeholder="Chains Rice" containerClass='col-span-2' />
                <Input label="Price (USD)" placeholder="10" />
                <Input label="Date" placeholder="02 April 2024" />
                <Input label="Lunch Menu" placeholder="Biryani" containerClass='col-span-2' />
                <Input label="Price (USD)" placeholder="10" />
                <Input label="Dinner Menu" placeholder="Chains Rice" containerClass='col-span-2' />
                <Input label="Price (USD)" placeholder="10" />
                <Input label="Date" placeholder="03 April 2024" />
                <Input label="Lunch Menu" placeholder="Biryani" containerClass='col-span-2' />
                <Input label="Price (USD)" placeholder="10" />
                <Input label="Dinner Menu" placeholder="Chains Rice" containerClass='col-span-2' />
                <Input label="Price (USD)" placeholder="10" />
            </div>
        </BaseForm>
    )
}

