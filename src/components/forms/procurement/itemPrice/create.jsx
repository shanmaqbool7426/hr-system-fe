import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployee, UpdateEmployee } from "@/store/actions/employee.actions"
import Toast from "@/util/toast"; 
import BaseForm from '../../BaseForm'; 

export default function CreateItemPriceForm({ onClose, object }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading } = useSelector((state) => state.employee)
    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            description: object?.description || ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('formik.nameRequired')),
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
            type: "text",
            name: "name",
            label: t('Item Name'),
            placeholder: t('Item Name'),
            value: formik.values.name,
        }, 
        {
            type: "select",
            name: "quotationReference",
            label: t('Quotation Reference'),
            placeholder: t('Quotation Reference'),
            list:[{display:"001",value:"001"},{display:"002",value:"002"}],
            value: formik.values.quotationReference,
        },
        {
            type: "select",
            name: "Vendor",
            label: t('Vendor'),
            placeholder: t('Vendor'),
            list:[{display:"John",value:"John"},{display:"Mink",value:"Mink"}],
            value: formik.values.Vendor,
        }, 
        {
            type: "text",
            name: "Price",
            label: t('Price'),
            placeholder: t('Price'), 
            value: formik.values.Price,
        },
        {
            type: "date",
            name: "PriceDate",
            label: t('Price Date'),
            placeholder: t('Price Date'), 
            value: formik.values.PriceDate,
        },
        {
            type: "date",
            name: "PriceExpiryDate",
            label: t('Price Expiry Date'),
            placeholder: t('Price Expiry Date'), 
            value: formik.values.PriceExpiryDate,
        },
    ]
 
    return (
        <BaseForm title={object?'Edit Items Price':"Add Items Price"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} >
            
        </BaseForm>
    )
}