import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Radio from '@/components/elements/Radio';
import { SearchSelect } from '@/components/elements';

export default function ChangeAppStatusForm({ onClose, object }) {
    const { t } = useTranslation()


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
        Toast.success(object ? t(`updated successfully`) : t(`created successfully`))
        onClose()
    }
    return (
        <BaseForm title={object ? "Is this application productive?" : "Is this application productive?"} formik={formik} onClose={onClose} is_loading={false} >
            <div className='col-span-2 grid grid-cols-3 gap-4'>
                <span className='col-span-3 text-start'>{t("All employees")}</span>
                <Radio
                    variant={'success'}
                    id="Productive"
                    name={"radioStatus"}
                    label={'Productive'}
                />
                <Radio
                    variant={'danger'}
                    id="Unproductive"
                    name={"radioStatus"}
                    label={'Unproductive'}
                />
                <Radio
                    variant={'danger'}
                    id="Neutral"
                    name={"radioStatus"}
                    label={'Neutral'}
                />
                <span className='col-span-3 text-start'>{t("Without team")}</span>
                <Radio
                    variant={'success'}
                    id="Productive"
                    name={"radioStatus"}
                    label={'Productive'}
                />
                <Radio
                    variant={'danger'}
                    id="Unproductive"
                    name={"radioStatus"}
                    label={'Unproductive'}
                />
                <Radio
                    variant={'danger'}
                    id="Neutral"
                    name={"radioStatus"}
                    label={'Neutral'}
                />
                <SearchSelect containerClass='col-span-3'
                    list={[{ display: 'Email', value: 'Email' }, { display: 'Socail Medai', value: 'Socail Medai' }, { display: 'Office Apps', value: 'Office Apps' }, { display: 'Entertainment', value: 'Entertainment' }, { display: 'News', value: 'News' }, { display: 'Undefined', value: 'Undefined' },]}
                />
            </div>
        </BaseForm>
    )
}
