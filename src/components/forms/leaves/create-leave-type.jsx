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
      type: "text",
      name: "maximumLeaves",
      label: t("Avail Maximum Leaves in a month"),
      value: formik.values.maximumLeaves,
      required: true,
    },
    {
      type: "select",
      multiple: true,
      name: "leaveQuotaAllocation",
      label: t("Leave quota allocation"),
      value: formik.values.leaveQuotaAllocation,
      list:  [{display:"Full leave quota will be assigned on date of joining",value:"Full leave quota will be assigned on date of joining"},{display:"Full leave quota will be assigned on date of confirmation",value:"Full leave quota will be assigned on date of confirmation"},{display:"Monthly leave quota allocate on Pro-Rata base",value:"Monthly leave quota allocate on Pro-Rata base"},{display:"Full leave quota will be assigned on date of joining but leaves can taken after confirmation",value:"Full leave quota will be assigned on date of joining but leaves can taken after confirmation"}],
      required: true,
    },
    {
      type: "text",
      name: "afterSpecificDays",
      label: t("After specific days"),
      placeholder: "1",
      value: formik.values.afterSpecificDays,
      required: true,
    },
    {
      type: "text",
      name: "leavesBeforeSpecificDays",
      label: t("Request Leaves before specific days"),
      value: formik.values.leavesBeforeSpecificDays,
      required: true,
    },
    {
      type: "text",
      name: "leavesAfterSpecificDays",
      label: t("Request Leaves after specific days"),
      value: formik.values.leavesAfterSpecificDays,
      required: true,
    },
    {
      type: "text",
      name: "leavesBeforeSpecificDays",
      label: t("Take leave(s) before confirmation date"),
      placeholder: "1",
      value: formik.values.leavesBeforeSpecificDays,
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
    {
      type: "switch",
      name: "basedLeavesQuotaAssignment",
      id: "basedLeavesQuotaAssignment",
      label: t("Pro-Rata Based Leaves Quota Assignment:"),
      checked: formik.values.basedLeavesQuotaAssignment,
    },
    {
      type: "switch",
      name: "deductClubSandwitchDays",
      id: "deductClubSandwitchDays",
      label: t("Deduct club sandwitch days"),
      checked: formik.values.deductClubSandwitchDays,
    },
   
    {
      type: "switch",
      name: "deductSandwitchDays",
      id: "deductSandwitchDays",
      label: t("Deduct sandwitch days"),
      checked: formik.values.deductSandwitchDays,
    },
  ];

  const formTitle = leave ? t("Update Leave Type") : t("Create Leave Type");

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
