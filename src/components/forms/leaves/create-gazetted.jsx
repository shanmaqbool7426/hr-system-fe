import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "next-i18next";
import { FetchEmployees } from "@/store/actions/employee.actions";
import Toast from "@/util/toast";
import {
  CreateGazetteHoliday,
  UpdateGazetteHoliday,
} from "@/store/actions/gazetteholiday.actions";
import BaseForm from "../BaseForm";

export default function CreateGazetedLeaveForm({ onClose, object }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { customfield_list } = useSelector((state) => state.customfield);
  const { employees_list } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(FetchEmployees());
  }, [dispatch]);
  const formik = useFormik({
    initialValues: {
      title: object?.title || "",
      date: object?.date || "",
      country: object?.country || "",
      province: object?.province || "",
      city: object?.city || "",
      area: object?.area || "",
      station: object?.station || "",
      grade: object?.grade || "",
      exemptedEmployees:
        object?.exemptedEmployees?.reduce((acc, item) => {
          acc.push(item._id);
          return acc;
        }, []) || [],
      description: object?.description || "",
      sendEmail: object?.sendEmail || false,
      recursive: object?.recursive || false,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required(t("Title is required")),
      date: Yup.date().required(t("Date is required")),
      country: Yup.string().required(t("Country is required")),
      province: Yup.string().required(t("Province is required")),
      city: Yup.string().required(t("City is required")),
      area: Yup.string().required(t("Area is required")),
      station: Yup.string().required(t("Station is required")),
      grade: Yup.string().required(t("Grade is required")),
      exemptedEmployees: Yup.array().required(
        t("Exempted Employee is required")
      ),
      description: Yup.string().required(t("Description is required")),
    }),
    onSubmit: async (values) => {
      return object
        ? dispatch(UpdateGazetteHoliday(object._id, values, onCompleted))
        : dispatch(CreateGazetteHoliday(values, onCompleted));
    },
  });

  const onCompleted = () => {
    Toast.success(
      object
        ? t("Gazette Holiday updated successfully")
        : t("Gazette Holiday created successfully")
    );
    onClose();
  };

  const formElements = [
    {
      type: "text",
      name: "title",
      label: t("Title"),
      placeholder: t("Title"),
      required: true,
      value: formik.values.title,
    },
    {
      type: "date",
      name: "date",
      label: t("Date"),
      required: true,
      value: formik.values.date,
    },
    {
      type: "select",
      name: "country",
      label: t("Country"),
      placeholder: t("Select One"),
      required: true,
      value: formik.values.country,
      list: customfield_list
        .filter((item) => item.type === "country")
        .map((item) => {
          return { value: item._id, display: item.name };
        }),
    },
    {
      type: "select",
      name: "province",
      label: t("Province"),
      required: true,
      value: formik.values.province,
      list: customfield_list
        .filter((item) => item.type === "province")
        .map((item) => {
          return { value: item._id, display: item.name };
        }),
    },
    {
      type: "select",
      name: "city",
      label: t("City"),
      required: true,
      value: formik.values.city,
      list: customfield_list
        .filter((item) => item.type === "city")
        .map((item) => {
          return { value: item._id, display: item.name };
        }),
    },
    {
      type: "select",
      name: "area",
      label: t("Area"),
      required: true,
      value: formik.values.area,
      list: customfield_list
        .filter((item) => item.type === "area")
        .map((item) => {
          return { value: item._id, display: item.name };
        }),
    },
    {
      type: "select",
      name: "station",
      label: t("Station"),
      required: true,
      value: formik.values.station,
      list: customfield_list
        .filter((item) => item.type === "station")
        .map((item) => {
          return { value: item._id, display: item.name };
        }),
    },
    {
      type: "select",
      name: "grade",
      label: t("Employee Grade"),
      required: true,
      value: formik.values.grade,
      list: customfield_list
        .filter((item) => item.type === "employee_status")
        .map((item) => {
          return { value: item._id, display: item.name };
        }),
    },
    {
      type: "select",
      name: "exemptedEmployees",
      label: t("Exempted Employees"),
      required: true,
      value: formik.values.exemptedEmployees,
      list: employees_list?.map((item) => ({
        value: item?._id,
        display: item.firstName + " " + item.lastName,
      })),
      multiple: true,
    },
    {
      type: "textarea",
      name: "description",
      containerClass: "col-span-2",
      label: t("Description"),
      required: true,
      value: formik.values.description,
    },
    {
      type: "switch",
      name: "sendEmail",
      id: "sendEmail",
      label: t("Send Email"),
      checked: formik.values.sendEmail,
    },
    {
      type: "switch",
      name: "recursive",
      id: "recursive",
      label: t("Recursive"),
      checked: formik.values.recursive,
    },
  ];

  return (
    <BaseForm
      title={object ? t("Edit Gazetted Holidays") : t("Add Gazetted Holidays")}
      formElements={formElements}
      formik={formik}
      onClose={onClose}
      is_loading={false}
    />
  );
}
