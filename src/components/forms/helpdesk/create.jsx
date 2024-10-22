import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import Storage from '@/util/storage';
import { useTranslation } from 'next-i18next';
import Toast from '@/util/toast';
import { useDispatch, useSelector } from 'react-redux';
import { CreateHelpdeskTicket, UpdateHelpdeskTicket } from '@/store/actions/helpdesk.actions';

export default function CreateTicketForm({ onClose, object, }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading } = useSelector(state => state.project)
    const { auth_user } = useSelector(state => state.auth);
    const { asset_list } = useSelector((state) => state.asset)

    const formik = useFormik({
        initialValues: {
            title: object?.title || "",
            description: object?.description || "",
            type: object?.type || "",
            hardwareType: object?.hardwareType || "",
            priority: object?.priority || "",
            asset: object?.assetId || "",
            attachment: null,
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required(t('Title is required')),
            description: Yup.string().required(t('Description is required')),
            type: Yup.string().required(t('Type is required')),
            hardwareType: Yup.string().when('type', {
                is: 'hardware',
                then: () => Yup.string().required(t('Hardware type is required')),
                otherwise: () => Yup.string().notRequired(),
            }),
            priority: Yup.string().required(t('Priority is required')),
            asset: Yup.string().when('hardwareType', {
                is: (hardwareType) => hardwareType !== "new",
                then: () => Yup.string().required(t('Asset is required')),
                otherwise: () => Yup.string().notRequired(),
            }),
        }),
        onSubmit: async (values) => {
            if (values.type !== "hardware") {
                delete values.asset
            }
            if (values.attachment) {
                const { url } = await Storage.upload(values.attachment, auth_user.company._id)
                values.attachment = url
            }
            return object ? dispatch(UpdateHelpdeskTicket(object._id, values, onCompleted)) : dispatch(CreateHelpdeskTicket(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t("Ticket updated successfully") : t("Ticket created successfully"))
        onClose()
    }

    const formElements = [
        {
            type: "text",
            name: "title",
            label: t('Issue'),
            placeholder: t("Issue"),
            required: true,
            containerClass: "col-span-2",
            value: formik.values.title,
        },
        {
            type: "select",
            name: "type",
            label: t("Type"),
            value: formik.values.type,
            required: true,
            list: [
                { value: "network", display: "Network" },
                { value: "software", display: "Software" },
                { value: "support", display: "Support" },
                { value: "hardware", display: "Hardware" },
            ]
        },
        {
            type: formik.values.type == "hardware" ? "select" : "hidden",
            name: "hardwareType",
            label: t("Hardware Type"),
            value: formik.values.hardwareType,
            required: true,
            list: [
                { value: "new", display: "New" },
                { value: "faulty", display: "Faulty" },
                { value: "replace", display: "Replace" },
            ]
        },
        {
            type: formik.values.type == "hardware" && formik.values.hardwareType !== "new" ? "select" : "hidden",
            name: "asset",
            label: t('Asset'),
            placeholder: t("Asset"),
            required: true,
            value: formik.values.asset,
            list: asset_list.filter((asset) => asset.user._id == auth_user._id && !asset.deletedAt).map((asset) => ({ value: asset._id, display: asset.assetId })),
        },
        {
            type: "select",
            name: "priority",
            label: t("Priority"),
            value: formik.values.priority,
            required: true,
            list: [
                { value: "low", display: "Low" },
                { value: "medium", display: "Medium" },
                { value: "high", display: "High" },
                { value: "critical", display: "Critical" },
            ]
        },
        {
            type: "textarea",
            containerClass: "col-span-2",
            required: true,
            name: "description",
            label: t('Description'),
        },
        {
            type: "file",
            name: "attachment",
            label: t('Attachment'),
            accept: `image/*,application/pdf,.doc,.docx`,
            className: "col-span-2"
        }
    ]
    return (
        <BaseForm title={object ? t("Update Ticket") : t("Create Ticket")} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} />
    )
}