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

export default function CreateFlagForm({ onClose, object }) {
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
      label: t("Flag Name"),
      placeholder: t("Flag Name"),
      required: true,
      value: formik.values.name,
    },
    {
      type: "number",
      min: 0,
      max: 1,
      step: "0.001",
      name: "deduction",
      label: t("Deduction"),
      placeholder: t("Deduction"),
      required: true,
      value: formik.values.deduction,
    },
    {
      type: "select",
      name: "flagColor",
      label: t("Flag Color"),
      placeholder: t("Flag Color"),
      list: [
        {
          display: <div className='flex gap-2'> <span className="h-5 w-5 rounded bg-themeSuccess"></span> Present</div>,
          value: "Present"
        },
        {
          display: <div className='flex gap-2'> <span className="h-5 w-5 rounded bg-themeDanger"></span> Absent</div>,
          value: "Absent"
        },
        {
          display: <div className='flex gap-2'> <span className="h-5 w-5 rounded bg-themeSecondary"></span> Late</div>,
          value: "Late"
        },
        {
          display: <div className='flex gap-2'> <span className="h-5 w-5 rounded bg-themePurple"></span> Leave</div>,
          value: "Leave"
        },
        {
          display: <div className='flex gap-2'> <span className="h-5 w-5 rounded bg-themeGrayscale"></span> Ghazzatted Holiday</div>,
          value: "Ghazzatted Holiday"
        },
        {
          display: <div className='flex gap-2'> <span className="h-5 w-5 rounded bg-themeGrayscale"></span> Holiday</div>,
          value: "Holiday"
        },
      ],
      required: true,
      value: formik.values.flagColor,
    },
  ];

  return (
    <BaseForm
      title={object ? `Edit Shift Flag` : `Create Shift Flag`}
      formElements={formElements}
      formik={formik}
      onClose={onClose}
      is_loading={is_loading}
    >
      <div className="zt-formGroup">
        <label htmlFor="color">{t("Flag Color")}</label>
        <div className="zt-themeInput h-full" onClick={() => { setColorInput(!colorinput) }}>
          <div style={{ backgroundColor: color }} className={`bg-${color} h-5 w-5 rounded`}></div>
        </div>
        {colorinput &&
          <SketchPicker
            color={color}
            onChangeComplete={handleChangeComplete}
          />
        }
      </div>
    </BaseForm>

  );
}
