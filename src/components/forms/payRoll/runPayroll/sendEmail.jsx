import * as Yup from 'yup';
import { useFormik } from 'formik'; 
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { useDispatch, useSelector } from 'react-redux';
import { CreateProject, UpdateProject } from "@/store/actions/project.actions";
import { Button, Input, SearchSelect, TextEditor, ToggleCheck } from '@/components/elements';
import { useState } from 'react';
import Radio from '@/components/elements/Radio';
import { Employees, HamburgerMenu, LocationIcon, NotificationBell } from '@/components/svg';
import BaseForm from '../../BaseForm';

export default function SendEmailForm({ onClose, object, }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading } = useSelector(state => state.project)
    const [selectedDays, setSelectedDays] = useState([]);

    const daysOfWeek = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

    const handleDayChange = (day) => {
        setSelectedDays((prevSelectedDays) =>
            prevSelectedDays.includes(day)
                ? prevSelectedDays.filter((d) => d !== day)
                : [...prevSelectedDays, day]
        );
    };
    const formik = useFormik({
        initialValues: {
            fromDate: object?.fromDate || "",
            fromTime: object?.fromTime || "",
            toDate: object?.toDate || "",
            toTime: object?.toTime || "",
            repeatDay: object?.repeatDay || "",
            reapeatDuration: object?.reapeatDuration || "",
            repeatEvent: object?.repeatEvent || false,

        },
        validationSchema: Yup.object().shape({
            fromDate: Yup.string().required(t('From Date is required')),
            fromTime: Yup.string().required(t('From Time is required')),
            toDate: Yup.string().required(t('To Date is required')),
            toTime: Yup.string().required(t('To Time is required')),
            repeatDay: Yup.string().required(t('Repeat Day is required')),
            reapeatDuration: Yup.string().required(t('Reapeat Duration is required')),

        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateProject(object._id, values, onCompleted)) : dispatch(CreateProject(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t("Project updated successfully") : t("Project created successfully"))
        onClose()
    }
    const formElements=[
        {
            
        }
    ]
    return (
        <BaseForm title={'Send Payroll Email'} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading}>
            
        </BaseForm>
    )
}