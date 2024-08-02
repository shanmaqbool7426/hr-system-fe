import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployee, UpdateEmployee } from "@/store/actions/employee.actions"
import Toast from "@/util/toast"; 
import BaseForm from '../../BaseForm'; 
import { Input, SearchSelect, Select } from '@/components/elements';

export default function CreatePurchaseForm({ onClose, object }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading } = useSelector((state) => state.employee)
    const formik = useFormik({
        initialValues: {
            vendor : object?.vendor  || "",
            items : object?.items  || "",
            description: object?.description || ""
        },
        validationSchema: Yup.object().shape({
            vendor : Yup.string().required(t('vendor Required')),
            items : Yup.string().required(t('items Required')),
            description: Yup.string().required(t('formik.nameRequired')),
        }),
        onSubmit: async (values) => {
            return employee ? dispatch(UpdateEmployee(employee._id, values, onCompleted)) : dispatch(CreateEmployee(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(employee ? t("Employee updated successfully") : t("Employee created successfully"))
        onClose()
    }
    const formElements = [
        {
            type: "select",
            name: "vendor",
            label: t('Vendor'),
            placeholder: t('Vendor'),
            list:[{display:"John",value:"John"}],
            value: formik.values.vendor,
            required:true,
        },
        {
            type: "text",
            name: "items",
            label: t('Items'),
            placeholder: t('Items'),
            required:true,
            value: formik.values.items,
        },
        {
            type: "text",
            name: "quantity",
            label: t('Quantity'),
            placeholder: t('Quantity'),
            required:true,
            value: formik.values.quantity,
        },
        {
            type: "text",
            name: "unitPrice",
            label: t('Unit Price'),
            placeholder: t('Unit Price'),
            required:true,
            value: formik.values.unitPrice,
        },
        {
            type: "text",
            name: "totalPrice",
            label: t('Total Price'),
            placeholder: t('Total Price'),
            required:true,
            value: formik.values.totalPrice,
        }, 
    ]
 
    return (
        <BaseForm title={object?'Edit Purchase Order':"Purchase Order"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} >
            <div className='grid sm:grid-cols-2 gap-x-6 gap-y-4 col-span-2'>
                <span className='text-left'>{t("Vendor Details")}</span>
                <span className='text-left'>{t("Shipping Address")}</span>
                <Input label={'Vendor Id'} placeholder='Vendor Id' required={true} name={'vendorId'}/>
                <SearchSelect  placeholder={'Sites'} label={'Sites'} required={true} list={[{display:"Dev",value:"Dev"}]}/>
                <Input label={'Contact No'} placeholder='Contact No' required={true} name={'contactNo'}/>
                <Input label={'Address'} placeholder='Address' required={true} name={'address'}/>
            </div>
        </BaseForm>
    )
}