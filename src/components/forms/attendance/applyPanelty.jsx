import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'next-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import { Tab } from '@headlessui/react' 
import { Tabs } from '@/components/elements';
import { LeavePaneltyModule } from '@/modules/attendance/LeavePanelty';
import LeavePaneltyHistoryModule from '@/modules/attendance/LeavePaneltyHistory';

export default function ApplyPaneltyForm({ onClose, object }) {
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
        Toast.success(object ? t(` updated successfully`) : t(` created successfully`))
        onClose()
    }
    return (
        <BaseForm title={'Apply Plenty'} formik={formik} onClose={onClose} is_loading={false} >
            <Tabs
                containerClasses={'zt-themeTabsV2 grow col-span-2'}
                tabNavClasses={'zt-themeTabNav mt-4'}
                tabs={["Leave Plenty", "Leave Plenty History"]}
            >
                <Tab.Panels className={`zt-themeTabPanels zt-employeeTabsPanel !bg-transparent !p-0`}>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <LeavePaneltyModule />
                    </Tab.Panel> 
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <LeavePaneltyHistoryModule />
                    </Tab.Panel>
                </Tab.Panels>
            </Tabs>
        </BaseForm>
    )
} 