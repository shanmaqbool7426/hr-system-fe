import * as Yup from "yup";
import { useFormik } from "formik";
import BaseForm from "../BaseForm";
import { useTranslation } from "react-i18next";
import Toast from "@/util/toast";
import { useDispatch, useSelector } from "react-redux";
import { CreateRemoteCategory, UpdateRemoteCategory } from "@/store/actions/remote-category.actions";

export default function CreateRemoteCategoryForm({ onClose, object }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { is_loading, category_list } = useSelector((state) => state.remotecategory);
    const onCompleted = () => {
        Toast.success(
            object ? t("Category updated successfully") : t("Category created successfully")
        );
        onClose();
    };

    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            color: object?.color || "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t("Name is required")),
            color: Yup.string().required(t("Color is required")),
        }),
        onSubmit: async (values) => {
            return object
                ? dispatch(UpdateRemoteCategory(object._id, values, onCompleted))
                : dispatch(CreateRemoteCategory(values, onCompleted));
        },
    });

    const formElements = [
        {
            type: "text",
            name: "name",
            label: t("Category Name"),
            placeholder: t("Category Name"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "color",
            name: "color",
            label: t("Color"),
            required: true,
            value: formik.values.color,
        },
    ];

    return (
        <BaseForm
            title={object ? t("Edit Category") : t("Create Category")}
            formElements={formElements}
            formik={formik}
            onClose={onClose}
            is_loading={is_loading}
        >
            <div className="flex flex-col gap-3">
                <span className="text-left font-bold">{t("Already Assigned Colours")}</span>
                {category_list.map((item, i) => (
                    <div key={i} className='flex gap-2 items-center'>
                        <span className={`h-5 w-5 rounded`} style={{ backgroundColor: item.color }}></span>
                        {item.name}
                    </div>
                ))}
            </div>
        </BaseForm>

    );
}
