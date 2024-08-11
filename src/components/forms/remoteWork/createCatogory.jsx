import * as Yup from "yup";
import { useFormik } from "formik";
import BaseForm from "../BaseForm";
import { useTranslation } from "react-i18next";
import Toast from "@/util/toast";
import { useDispatch, useSelector } from "react-redux";
import {
    CreateShiftFlag,
    UpdateShiftFlag,
} from "@/store/actions/shift-flag.actions";
import { SketchPicker } from "react-color";
import { useState } from "react";

export default function CreateCategoryForm({ onClose, object }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { is_loading } = useSelector((state) => state.shiftflag);
    const onCompleted = () => {
        Toast.success(
            object ? t("Flag updated successfully") : t("Flag created successfully")
        );
        onClose();
    };

    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            deduction: object?.deduction || 0,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t("Name is required")),
            deduction: Yup.number()
                .min(0, t("Minimum allowed value is 0"))
                .max(1, t("Maximum allowed value is 1"))
                .required(t("Deduction is required")),
        }),
        onSubmit: async (values) => {
            return object
                ? dispatch(UpdateShiftFlag(object._id, values, onCompleted))
                : dispatch(CreateShiftFlag(values, onCompleted));
        },
    });
    const [color, setColor] = useState('#fff');
    const [colorinput, setColorInput] = useState(true);

    const handleChangeComplete = (color) => {
        setColor(color.hex);
        setColorInput(false)
    };
    const formElements = [
        {
            type: "text",
            name: "name",
            label: t("Category Name"),
            placeholder: t("Category Name"),
            required: true,
            value: formik.values.name,
        },
    ];
    const assignedColor = [
        { text: "Email", bg: "bg-themePrimary" },
        { text: "Work Apps", bg: "bg-themeSuccess" },
        { text: "Communication", bg: "bg-RoyalHeath" },
        { text: "Socail Media", bg: "bg-BrinkPink" },
        { text: "Entertainment", bg: 'bg-deepSkyBlue', },
        { text: "News", bg: 'bg-themeDanger', },
        { text: "Undefined", bg: 'bg-themeGrayscale500',},
    ]
    return (
        <BaseForm
            title={t("Create Category")}
            formElements={formElements}
            formik={formik}
            onClose={onClose}
            is_loading={is_loading}
        >
            <div className="zt-formGroup relative ">
                <label htmlFor="color">{t("Flag Color")}</label>
                <div className="zt-themeInput h-" onClick={() => { setColorInput(!colorinput) }}>
                    <div style={{ backgroundColor: color }} className={`bg-${color} h-5 w-5 rounded`}></div>
                </div>
                {colorinput &&
                    <SketchPicker
                        color={color}
                        onChangeComplete={handleChangeComplete}
                        className="absolute top-20"
                    />
                }
            </div>
            <div className="flex flex-col gap-3">
                <span className="text-left font-bold">{t("Already Assigned Colours")}</span>
                {assignedColor.map((ele, i) => (
                    <div key={i} className='flex gap-2 items-center'> <span className={`h-5 w-5 rounded  ${ele.bg}`}></span>{ele.text}</div>
                ))}
            </div>
        </BaseForm>

    );
}
