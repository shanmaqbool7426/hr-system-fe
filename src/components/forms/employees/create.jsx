import BaseForm from "../BaseForm";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployee, UpdateEmployee } from "@/store/actions/employee.actions";
import Toast from "@/util/toast";
import { fetchShiftplan } from "@/store/actions/shiftplan.action";
import { useEffect } from "react";

export default function CreateEmployeeForm({ onClose, employee }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { is_loading, employees_list } = useSelector((state) => state.employee);
  const { customfield_list } = useSelector((state) => state.customfield);
  const { auth_user } = useSelector((state) => state.auth);
  const { shiftplandata } = useSelector((state) => state.shiftplan);

  useEffect(() => {
    dispatch(fetchShiftplan())
  }, [0])

  const formik = useFormik({
    initialValues: {
      firstName: employee?.firstName || "",
      lastName: employee?.lastName || "",
      fatherName: employee?.fatherName || "",
      fatherCnic: employee?.fatherCnic || "",
      employeeCode: auth_user?.company?.currentEmployeeCode,
      cnic: employee?.cnic || "",
      dateOfBirth: employee?.dateOfBirth || "",
      email: employee?.email || "",
      contact: employee?.contact || "",
      joiningDate: employee?.joiningDate || new Date(),
      password: "",
      canLogin: true,
      status: employee?.status._id || "",
      designation: employee?.designation._id || "",
      lineManager: employee?.lineManager._id || "",
      mobileAttendance: employee?.mobileAttendance || false,
      webAttendance: employee?.webAttendance || false,
      shiftplan: employee?.shiftplan || ""
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required(t("First name is required")),
      lastName: Yup.string().required(t("Last name is required")),
      fatherName: Yup.string().required(t("Father name is required")),
      fatherCnic: Yup.string().required(t("Father CNIC is required")),
      employeeCode: Yup.string().required(t("Employee code is required")),
      contact: Yup.string().required(t("Contact number is required")),
      cnic: Yup.string().required(t("CNIC is required")),
      designation: Yup.string().required(t("Designation is required")),
      dateOfBirth: Yup.string().required(t("Date of birth is required")),
      joiningDate: Yup.date().required(t("Joining date is required")),
      email: Yup.string().email("formik.invalidEmail").required(t("Email is required")),
      status: Yup.string().required(t("Status is required")),
      // shiftplan: Yup.string().required(t("Shift plan is required")),
    }),
    onSubmit: async (values) => {
      return employee
        ? dispatch(UpdateEmployee(employee._id, values, onCompleted))
        : dispatch(CreateEmployee(values, onCompleted));
    },
  });
  console.log(formik.values, "values")
  const onCompleted = () => {
    Toast.success(employee ? t("Employee updated successfully") : t("Employee created successfully"));
    onClose();
  };

  const formElements = [
    {
      type: "text",
      name: "firstName",
      label: t("First Name"),
      placeholder: t("Enter first name"),
      required: true,
      value: formik.values.firstName,
    },
    {
      type: "text",
      name: "lastName",
      label: t("Last Name"),
      placeholder: t("Enter last name"),
      required: true,
      value: formik.values.lastName,
    },
    {
      type: "text",
      name: "employeeCode",
      label: t("Employee ID"),
      placeholder: t("Enter employee id"),
      readOnly: true,
      required: true,
      value: formik.values.employeeCode,
    },
    {
      type: "email",
      name: "email",
      label: t("Email"),
      readOnly: employee ? "readonly" : false,
      placeholder: t("Enter email"),
      required: true,
      value: formik.values.email,
    },
    {
      type: "text",
      name: "cnic",
      label: t("Employee CNIC"),
      placeholder: t("Enter employee cnic"),
      required: true,
      value: formik.values.cnic,
    },
    {
      type: "date",
      name: "dateOfBirth",
      label: t("Date of birth"),
      maxDate: new Date(),
      required: true,
      value: formik.values.dateOfBirth,
    },
    {
      type: "text",
      name: "fatherName",
      label: t("Father Name"),
      placeholder: t("Enter father name"),
      required: true,
      value: formik.values.fatherName,
    },
    {
      type: "text",
      name: "fatherCnic",
      label: t("Father CNIC"),
      placeholder: t("Enter father cnic"),
      required: true,
      value: formik.values.fatherCnic,
    },
    {
      type: "date",
      name: "joiningDate",
      label: t("Joining Date"),
      maxDate: new Date(),
      required: true,
      value: formik.values.joiningDate,
    },
    {
      type: "select",
      name: "status",
      label: t("Employee Status"),
      value: formik.values.status,
      required: true,
      list: customfield_list
        .filter((item) => item.type === "employee_status")
        .map((item) => ({
          value: item._id,
          display: item.name,
        })),
    },
    {
      type: "tel",
      name: "contact",
      label: t("Contact Number"),
      placeholder: t("Enter contact number"),
      required: true,
      value: formik.values.contact,
    },
    {
      type: "select",
      name: "role",
      label: t("Role"),
      value: formik.values.role,
      list: [],
    },

    {
      type: "select",
      name: "designation",
      label: t("Designation"),
      value: formik.values.designation,
      required: true,
      list: customfield_list
        .filter((item) => item.type === "designation")
        .map((item) => ({
          value: item._id,
          display: item.name,
        })),
    },
    {
      type: "select",
      name: "lineManager",
      label: t("Line Manager"),
      value: formik.values.lineManager,
      list: employees_list
        .filter((item) => item._id !== employee?._id)
        .map((item) => ({
          value: item._id,
          display: item.firstName + " " + item.lastName,
        })),
    },
    {
      type: "select",
      name: "shiftPlan",
      label: t("Shift Plan"),
      value: formik.values.shiftPlan,
      required: true,
      list: shiftplandata.list?.map((item) => ({
        value: item?._id,
        display: item?.shiftName,
      })),
    },
    {
      type: "switch",
      name: "canLogin",
      id: "canLogin",
      label: t("Allow Signin"),
      checked: formik.values.canLogin,
    },
    {
      type: formik.values.canLogin ? "switch" : "hidden",
      name: "mobileAttendance",
      id: "mobileAttendance",
      label: t("Allow attendance from mobile"),
      checked: formik.values.mobileAttendance,
    },
    {
      type: formik.values.canLogin ? "switch" : "hidden",
      name: "webAttendance",
      id: "webAttendance",
      label: t("Allow attendance from web"),
      checked: formik.values.webAttendance,
    },
    {
      type: formik.values.canLogin ? "password" : "hidden",
      name: "password",
      label: t("Password"),
      value: formik.values.password,
      autocomplete: "new-password",
    },
  ];

  const formTitle = employee ? t("Update employee") : t("Create employee");

  return (
    <BaseForm title={formTitle} buttonText={employee} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} />
  );
}
