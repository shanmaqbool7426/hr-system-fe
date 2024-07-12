import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "next-i18next";
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
  const { is_loading } = useSelector((state) => state.gazetteholiday);

  const formik = useFormik({
    initialValues: {
      title: object?.title || "",
      fromDate: object?.fromDate || new Date,
      toDate: object?.toDate || new Date,
      countries: object?.countries || [],
      provinces: object?.provinces || [],
      cities: object?.cities || [],
      areas: object?.areas || [],
      stations: object?.stations || [],
      grades: object?.grades || [],
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
      fromDate: Yup.date().required(t("From date is required")),
      toDate: Yup.date().required(t("To date is required")),
      countries: Yup.array().required(t("Country is required")).min(1, t("Country is required")),
      provinces: Yup.array().required(t("Province is required")).min(1, t("Province is required")),
      cities: Yup.array().required(t("City is required")).min(1, t("City is required")),
      areas: Yup.array().required(t("Area is required")).min(1, t("Area is required")),
      stations: Yup.array().required(t("Station is required")).min(1, t("Station is required")),
      grades: Yup.array().required(t("Grade is required")).min(1, t("Grade is required")),
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
        ? t("Gazetted Holiday updated successfully")
        : t("Gazetted Holiday created successfully")
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
      type: "select",
      name: "exemptedEmployees",
      label: t("Exempted Employees"),
      value: formik.values.exemptedEmployees,
      list: employees_list?.map((item) => ({
        value: item?._id,
        display: item.firstName + " " + item.lastName,
      })),
      multiple: true,
    },
    {
      type: "date",
      name: "fromDate",
      label: t("From Date"),
      required: true,
      value: formik.values.fromDate,
    },
    {
      type: "date",
      name: "toDate",
      label: t("To Date"),
      required: true,
      value: formik.values.toDate,
      minDate: formik.values.fromDate
    },
    {
      type: "select",
      name: "countries",
      label: t("Country"),
      placeholder: t("Select One"),
      required: true,
      multiple: true,
      value: formik.values.countries,
      list: customfield_list
        .filter((item) => item.type === "country")
        .map((item) => {
          return { value: item._id, display: item.name };
        }),
    },
    {
      type: "select",
      name: "provinces",
      label: t("Province"),
      required: true,
      multiple: true,
      value: formik.values.provinces,
      list: customfield_list
        .filter((item) => item.type === "province")
        .map((item) => {
          return { value: item._id, display: item.name };
        }),
    },
    {
      type: "select",
      name: "cities",
      label: t("City"),
      required: true,
      multiple: true,
      value: formik.values.cities,
      list: customfield_list
        .filter((item) => item.type === "city")
        .map((item) => {
          return { value: item._id, display: item.name };
        }),
    },
    {
      type: "select",
      name: "areas",
      label: t("Area"),
      required: true,
      multiple: true,
      value: formik.values.areas,
      list: customfield_list
        .filter((item) => item.type === "area")
        .map((item) => {
          return { value: item._id, display: item.name };
        }),
    },
    {
      type: "select",
      name: "stations",
      label: t("Station"),
      required: true,
      multiple: true,
      value: formik.values.stations,
      list: customfield_list
        .filter((item) => item.type === "station")
        .map((item) => {
          return { value: item._id, display: item.name };
        }),
    },
    {
      type: "select",
      name: "grades",
      label: t("Employee Grade"),
      required: true,
      multiple: true,
      value: formik.values.grades,
      list: customfield_list
        .filter((item) => item.type === "grade")
        .map((item) => {
          return { value: item._id, display: item.name };
        }),
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
      is_loading={is_loading}
    />
  );
}
