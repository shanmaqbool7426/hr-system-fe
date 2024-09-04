import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { UploadAttachment } from '@/store/actions/project.actions';
import { setLoading, } from '@/store/slices/project.slice';
import Toast from "@/util/toast";
import BaseForm from '../BaseForm';
import Storage from '@/util/storage';


export default function UploadAttachmentForm({ onClose, projectId }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { auth_user } = useSelector(state => state.auth)
    const { is_loading } = useSelector(state => state.project)

    const formik = useFormik({
        initialValues: {
            name: "",
            size: "",
            project_id: projectId,
            attachment: null,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('Name is required')),
            attachment: Yup.string().required(t('Attachment is required')),
        }),
        onSubmit: async (values) => {
            dispatch(setLoading(true))
            if (values.attachment) {
                const { url, size } = await Storage.upload(values.attachment, auth_user.company._id)
                values.attachment = url
                values.size = size
            }
            dispatch(UploadAttachment(values, () => {
                Toast.success(t("Attachment uploaded successfully"));
                onClose();
            }))
        }
    });

    const formElements = [
        {
            type: "text",
            label: t('Name'),
            placeholder: t("Name"),
            name: "name",
            value: formik.values.name,
        },
        {
            type: "file",
            name: "attachment",
            label: t('Attachment'),
            accept: `image/*,application/pdf,.doc,.docx`,
            className: "col-span-2"
        }
    ];

    return (
        <BaseForm title={t("Upload attachment")} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} />
    );
}
