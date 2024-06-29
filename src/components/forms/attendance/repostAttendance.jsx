import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import { Tab } from '@headlessui/react'
import { RepostModule } from '@/modules/attendance/Repost';
import RepostHistoryModule from '@/modules/attendance/RepostHistory';
import { Tabs } from '@/components/elements';

export default function AttendanceRepostForm({ title, onClose, type, object, additionFields }) {
    const { t } = useTranslation()
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
    return (
        <BaseForm title={title} formik={formik} onClose={onClose} is_loading={false} >
            <Tabs
                containerClasses={'zt-themeTabsV2 grow'}
                tabNavClasses={'zt-themeTabNav mt-4'}
                tabs={["Repost", "Repost History"]}
            >
                <Tab.Panels className={`zt-themeTabPanels zt-employeeTabsPanel !bg-transparent !p-0`}>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <RepostModule />
                    </Tab.Panel> 
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <RepostHistoryModule />
                    </Tab.Panel>
                </Tab.Panels>

            </Tabs>
        </BaseForm>
    )
}

AttendanceRepostForm.defaultProps = {
    additionFields: []
}