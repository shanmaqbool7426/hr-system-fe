import * as Yup from "yup";
import { useFormik } from "formik";
import BaseForm from "../BaseForm";
import { useTranslation } from "next-i18next";
import Toast from "@/util/toast";
import { useDispatch } from "react-redux";
import { Input, Switch, } from "@/components/elements";
import { CreateShift, UpdateShift } from "@/store/actions/shiftplan.action";
export default function CreateShiftplanForm({ onClose, object, is_loading }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: object?.name || "",
      shiftType: object?.shiftType || "flexible",
      workingDays: object?.workingDays || {
        Monday: {
          isWorkingDay: true,
          hours: "08:00",
          startTime: "09:00",
          endTime: "18:00",
        },
        Tuesday: {
          isWorkingDay: true,
          hours: "08:00",
          startTime: "09:00",
          endTime: "18:00",
        },
        Wednesday: {
          isWorkingDay: true,
          hours: "08:00",
          startTime: "09:00",
          endTime: "18:00",
        },
        Thursday: {
          isWorkingDay: true,
          hours: "08:00",
          startTime: "09:00",
          endTime: "18:00",
        },
        Friday: {
          isWorkingDay: true,
          hours: "08:00",
          startTime: "09:00",
          endTime: "18:00",
        },
        Saturday: {
          isWorkingDay: false,
          hours: "",
          startTime: "",
          endTime: "",
        },
        Sunday: {
          isWorkingDay: false,
          hours: "",
          startTime: "",
          endTime: "",
        },
      },
      shiftEndsOnNextDay: object?.shiftEndsOnNextDay || false,
      breakStartTime: object?.breakStartTime || null,
      breakEndTime: object?.breakEndTime || null,
      isBreakCountable: object?.isBreakCountable || false,
      startTime: object?.startTime || null,
      endTime: object?.endTime || null,
      minStartTime: object?.minStartTime || null,
      maxStartTime: object?.maxStartTime || null,
      maxEndTime: object?.maxEndTime || null,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Name is required")
        .test('not-empty', 'Name cannot be empty', value => value && value.trim().length > 0),

      shiftType: Yup.string()
        .required("Shift Type is required")
        .test('not-empty', 'Shift Type cannot be empty', value => value && value.trim().length > 0),

      workingDays: Yup.object().shape({
        Monday: Yup.object().shape({
          isWorkingDay: Yup.boolean(),
          hours: Yup.string().nullable()
            .when('isWorkingDay', {
              is: true,
              then: () => Yup.string().required("Hours required on working days").matches(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
            }),
          startTime: Yup.string()
            .when('isWorkingDay', {
              is: true,
              then: () => Yup.string().required("Start time required on working days").matches(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
            }),
          endTime: Yup.string()
            .when('isWorkingDay', {
              is: true,
              then: () => Yup.string().required("End time required on working days").matches(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
            }),
        }),
        Tuesday: Yup.object().shape({
          isWorkingDay: Yup.boolean(),
          hours: Yup.string().nullable()
            .when('isWorkingDay', {
              is: true,
              then: () => Yup.string().required("Hours required on working days").matches(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
            }),
          startTime: Yup.string()
            .when('isWorkingDay', {
              is: true,
              then: () => Yup.string().required("Start time required on working days").matches(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
            }),
          endTime: Yup.string()
            .when('isWorkingDay', {
              is: true,
              then: () => Yup.string().required("End time required on working days").matches(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
            }),
        }),
        Wednesday: Yup.object().shape({
          isWorkingDay: Yup.boolean(),
          hours: Yup.string().nullable()
            .when('isWorkingDay', {
              is: true,
              then: () => Yup.string().required("Hours required on working days").matches(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
            }),
          startTime: Yup.string()
            .when('isWorkingDay', {
              is: true,
              then: () => Yup.string().required("Start time required on working days").matches(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
            }),
          endTime: Yup.string()
            .when('isWorkingDay', {
              is: true,
              then: () => Yup.string().required("End time required on working days").matches(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
            }),
        }),
        Thursday: Yup.object().shape({
          isWorkingDay: Yup.boolean(),
          hours: Yup.string().nullable()
            .when('isWorkingDay', {
              is: true,
              then: () => Yup.string().required("Hours required on working days").matches(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
            }),
          startTime: Yup.string()
            .when('isWorkingDay', {
              is: true,
              then: () => Yup.string().required("Start time required on working days").matches(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
            }),
          endTime: Yup.string()
            .when('isWorkingDay', {
              is: true,
              then: () => Yup.string().required("End time required on working days").matches(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
            }),
        }),
        Friday: Yup.object().shape({
          isWorkingDay: Yup.boolean(),
          hours: Yup.string().nullable()
            .when('isWorkingDay', {
              is: true,
              then: () => Yup.string().required("Hours required on working days").matches(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
            }),
          startTime: Yup.string()
            .when('isWorkingDay', {
              is: true,
              then: () => Yup.string().required("Start time required on working days").matches(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
            }),
          endTime: Yup.string()
            .when('isWorkingDay', {
              is: true,
              then: () => Yup.string().required("End time required on working days").matches(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
            }),
        }),
        Saturday: Yup.object().shape({
          isWorkingDay: Yup.boolean(),
          hours: Yup.string().nullable()
            .when('isWorkingDay', {
              is: true,
              then: () => Yup.string().required("Hours required on working days").matches(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
            }),
          startTime: Yup.string()
            .when('isWorkingDay', {
              is: true,
              then: () => Yup.string().required("Start time required on working days").matches(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
            }),
          endTime: Yup.string()
            .when('isWorkingDay', {
              is: true,
              then: () => Yup.string().required("End time required on working days").matches(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
            }),
        }),
        Sunday: Yup.object().shape({
          isWorkingDay: Yup.boolean(),
          hours: Yup.string().nullable()
            .when('isWorkingDay', {
              is: true,
              then: () => Yup.string().required("Hours required on working days").matches(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
            }),
          startTime: Yup.string()
            .when('isWorkingDay', {
              is: true,
              then: () => Yup.string().required("Start time required on working days").matches(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
            }),
          endTime: Yup.string()
            .when('isWorkingDay', {
              is: true,
              then: () => Yup.string().required("End time required on working days").matches(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
            }),
        }),
      }),


      shiftEndsOnNextDay: Yup.boolean()
        .required("Shift Ends On Next Day is required"),

      breakStartTime: Yup.string()
        .nullable()
        .test('is-string', "Break Start Time must be a string", value => !value || typeof value === 'string'),

      breakEndTime: Yup.string()
        .nullable()
        .test('is-string', "Break End Time must be a string", value => !value || typeof value === 'string'),

      isBreakCountable: Yup.boolean()
        .required("Is Break Countable is required"),

      startTime: Yup.string()
        .nullable()
        .test('is-string', "Start Time must be a string", value => !value || typeof value === 'string'),

      endTime: Yup.string()
        .nullable()
        .test('is-string', "End Time must be a string", value => !value || typeof value === 'string'),

      minStartTime: Yup.string()
        .nullable()
        .test('is-string', "Minimum Start Time must be a string", value => !value || typeof value === 'string'),

      maxStartTime: Yup.string()
        .nullable()
        .test('is-string', "Maximum Start Time must be a string", value => !value || typeof value === 'string'),

      maxEndTime: Yup.string()
        .nullable()
        .test('is-string', "Maximum End Time must be a string", value => !value || typeof value === 'string'),
    }),
    onSubmit: async (values) => {
      if (object) {
        const id = object?._id;
        dispatch(UpdateShift(id, values, () => {
          Toast.success("Shift Plan Updated successfully");
          onClose();
        }));

      } else {
        dispatch(CreateShift(values, () => {
          Toast.success("Shift Plan created successfully")
          onClose();
        }));
      }
    },
  });
  const formElements = [
    {
      type: "text",
      name: "name",
      label: t("Shift Name"),
      placeholder: t("Shift Name"),
      required: true,
      value: formik.values.name,
      containerClass: "col-span-2"
    },
    {
      type: "radio",
      name: "shiftType",
      label: t("Flexible Schedule"),
      required: true,
      id: "flexible",
      default: true,
      value: "flexible",
      checked: formik.values.shiftType === 'flexible'
    },
    {
      type: "radio",
      name: "shiftType",
      label: t("Clock Based"),
      id: "fixed",
      required: true,
      value: "fixed",
      checked: formik.values.shiftType === 'fixed'
    },
    {
      type: formik.values.shiftType === "fixed" ? "time" : "hidden",
      name: "startTime",
      label: t("Start Time"),
      placeholder: t("Start Time"),
      required: true,
      value: formik.values.startTime,
    },
    {
      type: formik.values.shiftType === "fixed" ? "time" : "hidden",
      name: "endTime",
      label: t("End Time"),
      placeholder: t("End Time"),
      required: true,
      value: formik.values.endTime,
    },
    {
      type: "time",
      name: "minStartTime",
      label: t("Min Start Time"),
      placeholder: t("Min Start Time"),
      required: true,
      value: formik.values.minStartTime,
    },
    {
      type: formik.values.shiftType === "flexible" ? "time" : "hidden",
      name: "maxStartTime",
      label: t("Max Start Time"),
      placeholder: t("Max Start Time"),
      required: true,
      value: formik.values.maxStartTime,
    },
    {
      type: formik.values.shiftType === "fixed" ? "time" : "hidden",
      name: "maxEndTime",
      label: t("Max End Time"),
      placeholder: t("Max End Time"),
      required: true,
      value: formik.values.maxEndTime,
    },
    {
      type: "switch",
      name: "shiftEndsOnNextDay",
      id: "shiftEndsOnNextDay",
      label: t("Shift end on the next day"),
      checked: formik.values.shiftEndsOnNextDay,
      onChange: (e) => formik.setFieldValue("shiftEndsOnNextDay", e.target.checked),
    },
    {
      type: "switch",
      name: "isBreakCountable",
      id: "isBreakCountable",
      label: t("Is Break Countable?"),
      checked: formik.values.isBreakCountable
    },
    {
      type: "switch",
      name: "break",
      id: "break",
      className: "col-span-2",
      label: t("Break"),
      checked: formik.values.break,
    },
    {
      type: formik.values.break ? "time" : "hidden",
      name: "breakStartTime",
      label: t("Break Start Time"),
      placeholder: t("Break Start Time"),
      required: true,
      value: formik.values.breakStartTime,
    },
    {
      type: formik.values.break ? "time" : "hidden",
      name: "breakEndTime",
      label: t("Break End Time"),
      placeholder: t("Break End Time"),
      required: true,
      value: formik.values.breakEndTime,
    },
  ];

  return (
    <BaseForm
      title={object ? `Edit Shift Plan` : `Create Shift Plan`}
      formElements={formElements}
      formik={formik}
      onClose={onClose}
      is_loading={is_loading}
      buttonText={object}
    >
      <table className="zt-table col-span-2">
        <thead>
          <tr>
            <th className="text-left">{t("Working Day")}</th>
            {formik.values.shiftType === 'fixed' && <th>{t("From")}</th>}
            {formik.values.shiftType === 'fixed' && <th>{t("To")}</th>}
            {formik.values.shiftType === 'flexible' && <th>{t("Hours")}</th>}
          </tr>
        </thead>
        <tbody>
          {Object.keys(formik.values.workingDays).map((item, index) => <tr key={index}>
            <td>
              <Switch label={t(item)}
                checked={formik.values.workingDays[item].isWorkingDay}
                onChange={(event) => {
                  formik.setFieldValue(`workingDays.${item}.isWorkingDay`, Boolean(event.target.checked))
                }} />
            </td>
            {formik.values.shiftType === 'fixed' && <td>
              <Input
                name={`workingDays.${item}.startTime`}
                disabled={!formik.values.workingDays[item].isWorkingDay}
                value={formik.values.workingDays[item].startTime}
                type={'time'}
                formik={formik}
                error={formik.errors?.workingDays && formik.errors.workingDays[item]?.startTime}
              />
            </td>}
            {formik.values.shiftType === 'fixed' && <td>
              <Input
                name={`workingDays.${item}.endTime`}
                disabled={!formik.values.workingDays[item].isWorkingDay}
                value={formik.values.workingDays[item].endTime}
                type={'time'}
                formik={formik}
                error={formik.errors?.workingDays && formik.errors.workingDays[item]?.endTime}
              />
            </td>}
            {formik.values.shiftType === 'flexible' && <td>
              <Input
                name={`workingDays.${item}.hours`}
                disabled={!formik.values.workingDays[item].isWorkingDay}
                value={formik.values.workingDays[item].hours}
                type={'text'}
                placeholder={t("Hours and minutes in format HH:mm e.g 7:40")}
                formik={formik}
                error={formik.errors?.workingDays && formik.errors.workingDays[item]?.hours}
              />
            </td>}
          </tr>)}
        </tbody>
      </table>
    </BaseForm>
  );
}
