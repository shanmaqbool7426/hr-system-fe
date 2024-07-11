import BaseForm from "../BaseForm";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateLeavePolicy,
  UpdateLeavePolicy,
} from "@/store/actions/leave-policy.actions";
import Toast from "@/util/toast";

export default function CreateLeaveForm({ onClose, leave }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { customfield_list } = useSelector((state) => state.customfield);
  const { auth_user } = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      name: leave?.name || "",
      entitled: leave?.entitled || false,
      encashable: leave?.encashable || false,
      carryForward: leave?.carryForward || false,
      entitledToStatus:
        leave?.entitledToStatus.reduce((acc, item) => {
          acc.push(item._id);
          return acc;
        }, []) || [],
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(t("formik.nameRequired")),
      entitled: Yup.string().required(t("formik.entitledRequired")),
      encashable: Yup.string().required(t("formik.encashableRequired")),
      carryForward: Yup.string().required(t("formik.carryForwardRequired")),
      entitledToStatus: Yup.array()
        .required(t("formik.entitledToStatusRequired"))
        .min(1, t("formik.entitledToStatusRequired")),
    }),
    onSubmit: async (values) => {
      onCompleted();
      return leave
        ? dispatch(UpdateLeavePolicy(leave._id, values, onCompleted))
        : dispatch(CreateLeavePolicy(values, onCompleted));
    },
  });
  const onCompleted = () => {
    Toast.success(
      leave
        ? t("Leave policy updated successfully")
        : t("Leave policy created successfully")
    );
    onClose();
  };
  const formElements = [
    {
      type: "text",
      name: "name",
      label: t("Title"),
      placeholder: t("Enter title"),
      required: true,
      value: formik.values.name,
    },
    {
      type: "number",
      name: "entitled",
      label: t("Entitled days"),
      placeholder: t("Enter entitled days"),
      required: true,
      value: formik.values.entitled,
    },
    {
      type: "select",
      multiple: true,
      name: "entitledToStatus",
      containerClass: "col-span-2",
      label: t("Entitled To"),
      value: formik.values.entitledToStatus,
      list: customfield_list
        .filter((item) => item.type === "employee_status")
        .map((item) => {
          return { value: item._id, display: item.name };
        }),
      required: true,
    },
    {
      type: "switch",
      name: "encashable",
      id: "encashable",
      label: t("Encashable"),
      checked: formik.values.encashable,
    },
    {
      type: "switch",
      name: "carryForward",
      id: "carryForward",
      label: t("Carry Forward"),
      checked: formik.values.carryForward,
    },
  ];

  const formTitle = leave ? t("Update Leave Policy") : t("Create Leave Policy");

  return (
    <BaseForm
      title={formTitle}
      formElements={formElements}
      formik={formik}
      onClose={onClose}
      is_loading={false}
    />
  );
}
