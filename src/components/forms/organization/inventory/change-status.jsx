import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ChangeAssetStatus } from "@/store/actions/asset.actions"
import Toast from "@/util/toast";
import BaseForm from '../../BaseForm';


export default function ChangeStatusForm({ onClose, asset, status }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading } = useSelector(state => state.asset)
    const formik = useFormik({
        initialValues: {
            remarks: "",
        },
        validationSchema: Yup.object().shape({
            remarks: Yup.string().required(t('Remarks are required')),
        }),
        onSubmit: async (values) => {
            return dispatch(ChangeAssetStatus(asset._id, { ...values, status }, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(t("Status changed successfully"))
        onClose()
    }
    const formElements = [
        {
            containerClass: "col-span-2",
            type: "textarea",
            name: "remarks",
            label: t('Remarks'),
            placeholder: t("Enter remarks"),
            required: true,
            value: formik.values.remarks,
        },
    ]


    return (
        <BaseForm
            title={`${status}  ${asset.assetId}`}
            formElements={formElements}
            formik={formik}
            onClose={onClose}
            is_loading={is_loading}
        />
    )
}