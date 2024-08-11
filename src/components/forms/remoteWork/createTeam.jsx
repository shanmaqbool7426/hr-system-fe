import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import { CheckBox, SearchSelect } from '@/components/elements';
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
            <div className='col-span-2'>

                {/* <div className='zt-card !bg-themeGrayscale100 grid grid-cols-2 col-span-2 gap-4'>
                <h2 className='text-h4 mb-0 col-span-2 text-left'>{t("Screenshots")}</h2>
                <CheckBox id={'product'} label={'Enable screen capture'} />
                <CheckBox id={'blur'} label={'Blur screen capture'} />
                <SearchSelect label={'Screen capture interval'} list={[{ display: "5 min", value: "5 min" }, { display: "10 min", value: "10 min" }, { display: "15 min", value: "15 min" }, { display: "30 min", value: "30 min" }]} />
                <SearchSelect label={'Screen capture quality'} list={[{ display: "640x640", value: "640x640" }, { display: "1024x1024", value: "1024x1024" }]} />
            </div>
            <div className='zt-card !bg-themeGrayscale100 grid grid-cols-2 col-span-2 gap-4'>
                <h2 className='text-h4 mb-0 col-span-2 text-left'>{t("Tracking")}</h2>
                <CheckBox id={'product'} label={'Enable Meeting time tracking (BETA)'} />
                <SearchSelect label={'Idle time tracking'} list={[{ display: "5 min", value: "5 min" }, { display: "10 min", value: "10 min" }, { display: "15 min", value: "15 min" }, { display: "30 min", value: "30 min" }]} />
                <SearchSelect label={'Offline time'} list={[{ display: "Enable", value: "Enable" }, { display: "Disable", value: "Disable" }]} />
                <SearchSelect label={'Default application productivity'} list={[{ display: "Unproductive", value: "Unproductive" }, { display: "Neutral", value: "Neutral" }, { display: "Productive", value: "Productive" }]} />
           </div>
           <div className='zt-card !bg-themeGrayscale100 grid grid-cols-2 col-span-2 gap-4'>
                <h2 className='text-h4 mb-0 col-span-2 text-left'>{t("Other")}</h2>
                <CheckBox id={'product'} label={'Hide Offline Times section'} />
                <CheckBox id={'product'} label={'Hide Screenshots'} />
                <CheckBox id={'product'} label={'Disable Log Out / Quit'} />
           </div> */}
                <RemoteProfile parentClass='parentClass' gridCols='grid-cols-2' colSpan='col-span-2'/>
            </div>

        </BaseForm>
    )
}

