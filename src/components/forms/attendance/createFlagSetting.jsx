import * as Yup from "yup";
import { useFormik } from "formik";
import BaseForm from "../BaseForm";
import { useTranslation } from "react-i18next";
import Toast from "@/util/toast";
import { useDispatch, useSelector } from "react-redux";
import {
  createShiftFlag,
  updateShiftFlag,
} from "@/store/actions/shift-flag.actions";

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
        ? dispatch(updateShiftFlag(object._id, values, onCompleted))
        : dispatch(createShiftFlag(values, onCompleted));
    },
  });

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
  ];

  return (
    <BaseForm
      title={object ? `Edit Shift Flag` : `Create Shift Flag`}
      formElements={formElements}
      formik={formik}
      onClose={onClose}
      is_loading={is_loading}
    />
  );
}
