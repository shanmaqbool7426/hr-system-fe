import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import RemoteProfile from '@/modules/employee/remoteWorkCards';

export default function CreateRemoteTeamForm({ onClose, object }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: object?.employee?._id || "",
            email: object?.employee?._id || "",
            team: object?.employee?._id || "",
            role: object?.employee?._id || "",
            attendanceDate: object?.attendanceDate || "",
            flagType: object?.flagType || "",
            exemptionType: object?.exemptionType || "",
            reason: object?.exemptionType || "",
        },
        validationSchema: Yup.object().shape({
            employee: Yup.string().required(t('Employee is required')),
            attendanceDate: Yup.string().required(t('Atendance date is required')),
            flagType: Yup.string().required(t('Flag type is required')),
            exemptionType: Yup.string().required(t('Exemption type is required')),
            reason: Yup.string().required(t('Reason is required')),
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
        <BaseForm title={object ? t(`Edit Team`) : t(`Add Team`)} formik={formik} onClose={onClose} is_loading={false} >
            <div className='col-span-2 my-3'>
                <RemoteProfile parentClass='parentClass' gridCols='grid-cols-2' colSpan='col-span-2' />
            </div>

        </BaseForm>
    )
}

