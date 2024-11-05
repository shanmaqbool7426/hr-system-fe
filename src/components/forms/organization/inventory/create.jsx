import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateAsset, UpdateAsset } from "@/store/actions/asset.actions"
import Toast from "@/util/toast";
import BaseForm from '../../BaseForm';
import { Input } from '@/components/elements';

export default function CreateAssetForm({ onClose, asset }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { customfield_list } = useSelector(state => state.customfield)
    const formik = useFormik({
        initialValues: {
            assetType: asset?.assetType?._id || "",
            warrantyExpiry: asset?.warrantyExpiry || null,
            purchaseDate: asset?.purchaseDate || null,
            vendor: asset?.vendor || "",
            cost: asset?.cost || 0,
            fields: asset?.fields || {},
            condition: asset?.condition || 1,
        },
        validationSchema: Yup.object().shape({
            assetType: Yup.string().required(t('formik.assetTypeRequired')),
            warrantyExpiry: Yup.date().required(t('formik.warrantyExpiryRequired')),
            purchaseDate: Yup.date().required(t('formik.purchaseDateRequired')),
            vendor: Yup.string().required(t('formik.vendorRequired')),
            cost: Yup.number().required(t('formik.costRequired')),
            condition: Yup.number().required(t('formik.conditionRequired')),
        }),
        onSubmit: async (values) => {
            return asset ? dispatch(UpdateAsset(asset._id, values, onCompleted)) : dispatch(CreateAsset(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(asset ? t("Assets updated successfully") : t("Asset created successfully"))
        onClose()
    }
    const formElements = [
        {
            type: "select",
            name: "assetType",
            label: t('Asset Type'),
            value: formik.values.assetType,
            required: true,
            readOnly: !!asset,
            list: customfield_list.filter(item => item.type === 'asset_type').map(item => {
                return { value: item._id, display: item.name }
            }),
            onChange: (value) => {
                formik.setFieldValue("assetType", value)
                const fields = customfield_list.find(item => item._id === value)?.fields?.reduce((acc, item) => {
                    acc[item] = null
                    return acc
                }, {})
                formik.setFieldValue("fields", fields)
            }
        },
        {
            type: "date",
            name: "purchaseDate",
            label: t('Purchase Date'),
            required: true,
            value: formik.values.purchaseDate,
        },
        {
            type: "date",
            name: "warrantyExpiry",
            label: t('Warranty Expiry Date'),
            required: true,
            value: formik.values.warrantyExpiry,
        },
        {
            id: "cost",
            type: "number",
            name: "cost",
            label: t('Purchase Amount'),
            placeholder: t("Enter purchase amount"),
            required: true,
            min: 0,
            value: formik.values.cost,
        },
        {
            type: "text",
            name: "vendor",
            label: t('Supplier'),
            placeholder: t("Enter supplier"),
            required: true,
            value: formik.values.vendor,
        },
        {
            type: "rating",
            name: "condition",
            label: t('Condition'),
            placeholder: t("Enter condition"),
            required: true,
            value: formik.values.condition,
            onChange: (value) => {
                formik.setFieldValue("condition", value)
            }
        }
    ]

    const formTitle = asset ? t("Edit Asset") : t("Add Asset")
    return (
        <BaseForm
            title={formTitle}
            formElements={formElements}
            formik={formik}
            onClose={onClose}
        // is_loading={is_loading}
        >
            {formik.values.assetType && Object.keys(formik.values.fields)?.map((item, index) => (
                <Input formik={formik} label={item} key={index}
                    value={formik.values.fields[index]} onChange={(event) => {
                        let field_values = formik.values.fields
                        field_values[item] = event.target.value
                        formik.setFieldValue('fields', field_values)
                    }} />
            ))}
        </BaseForm>
    )
}