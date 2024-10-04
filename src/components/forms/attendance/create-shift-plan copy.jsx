import * as Yup from "yup";
import { useFormik } from "formik";
import BaseForm from "../BaseForm";
import { useTranslation } from "react-i18next";
import Toast from "@/util/toast";
import { useDispatch } from "react-redux";
import { Button, Input, SearchSelect, Select, Table, ToggleCheck } from "@/components/elements";
import { useState } from "react";
import { Plus, Trash } from "@/components/svg";
import { CreateShiftplan, UpdateShiftPlane, fetchShiftplan } from "@/store/actions/shiftplan.action";
export default function CreateShiftplanForm({ onClose, object, is_loading }) {
  const { t } = useTranslation();
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: object?.name || "",
      shiftType: object?.shiftType || "fixed",
      workingDays: object?.workingDays || [],
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

      workingDays: Yup.array()
        .of(Yup.string())
        .required("Working Days are required")
        .min(1, "Working Days must be an array"),

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
        dispatch(UpdateShiftPlane(id, values));
        dispatch(fetchShiftplan());
        Toast.success("Shift Plan Updated successfully");
      } else {
        dispatch(CreateShiftplan(values));
        dispatch(fetchShiftplan());
        Toast.success("Shift Plan created successfully");
      }
      onClose();
    },
  });

  // const onCompleted = () => {
  //   Toast.success(object ? t(`${type} updated successfully`) : t(`${type} created successfully`));
  //   onClose();
  // };
  const handleToggleChange = (day) => {
    const scheduleType = [...formik.values.scheduleType]; // Create a shallow copy
    const radioType = formik.values.radioStatus;
    const index = scheduleType.findIndex((item) => item.day === day);

    if (index > -1) {
      scheduleType.splice(index, 1);
    } else {
      if (radioType === "clockBased") {
        scheduleType.push({ day, from: "", to: "" });
      } else {
        scheduleType.push({ day, hours: "" });
      }
    }
    formik.setFieldValue("scheduleType", scheduleType);
  };

  const handleHoursChange = (day, hours) => {
    const scheduleType = [...formik.values.scheduleType];
    const index = scheduleType.findIndex((item) => item.day === day);

    if (index > -1) {
      const updatedItem = { ...scheduleType[index], hours };
      const updatedScheduleType = [...scheduleType.slice(0, index), updatedItem, ...scheduleType.slice(index + 1)];

      formik.setFieldValue("scheduleType", updatedScheduleType);
    } else {
      const newItem = { day, hours };
      formik.setFieldValue("scheduleType", [...scheduleType, newItem]);
    }
  };

  const handleHoursBlur = (day, hours) => {
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!timePattern.test(hours)) {
      formik.setFieldError(`scheduleType.${day}`, "Invalid time format, please use HH:MM.");
    } else {
      formik.setFieldError(`scheduleType.${day}`, "");
    }

    formik.setTouched({ ...formik.touched, scheduleType: { ...formik.touched.scheduleType, [day]: true } });
  };

  const handleFromChange = (day, from) => {
    const scheduleType = formik.values.scheduleType;
    const index = scheduleType.findIndex((item) => item.day === day);
    if (index > -1) {
      const updatedItem = { ...scheduleType[index], from };
      const updatedScheduleType = [...scheduleType.slice(0, index), updatedItem, ...scheduleType.slice(index + 1)];
      formik.setFieldValue("scheduleType", updatedScheduleType);
    }
  };
  const handleToChange = (day, to) => {
    const scheduleType = formik.values.scheduleType;
    const index = scheduleType.findIndex((item) => item.day === day);
    if (index > -1) {
      const updatedItem = { ...scheduleType[index], to };
      const updatedScheduleType = [...scheduleType.slice(0, index), updatedItem, ...scheduleType.slice(index + 1)];
      formik.setFieldValue("scheduleType", updatedScheduleType);
    }
  };

  const generateShiftCode = (shiftName) => {
    if (!shiftName) return "";

    const cleanShiftName = shiftName.replace(/[^a-zA-Z\s]/g, " ");
    const words = cleanShiftName.trim().split(/\s+/);

    const codePrefix =
      words.length >= 2
        ? `${words[0][0].toUpperCase()}${words[1][0].toUpperCase()}`
        : `${words[0].slice(0, 2).toUpperCase()}`;

    const numberOfDigits = Math.floor(Math.random() * 3) + 3;
    const randomNum = Math.floor(Math.random() * Math.pow(10, numberOfDigits));

    return `${codePrefix}-${String(randomNum).padStart(numberOfDigits, "0")}`;
  };

  const handleShiftTimeChange = () => {
    const { minStartTime, maxStartTime, shiftEndNextDay } = formik.values;

    if (minStartTime && maxStartTime) {
      const [minHours, minMinutes] = minStartTime.split(":").map(Number);
      const [maxHours, maxMinutes] = maxStartTime.split(":").map(Number);

      const minTimeInMinutes = minHours * 60 + minMinutes;
      const maxTimeInMinutes = maxHours * 60 + maxMinutes;

      if (maxTimeInMinutes > minTimeInMinutes && shiftEndNextDay) {
        formik.setFieldValue("shiftEndNextDay", false);
      }
    }
  };

  const headings = [
    { title: t("Working Day"), col: "workingDay" },
    { title: t("From"), col: "From" },
    { title: t("To"), col: "To" },
  ];
  const rows = [
    {
      workingDay: (
        <div className="flex items-center gap-4 font-semibold">
          <ToggleCheck
            id="Monday"
            variant={"themePrimary"}
            disabled={false}
            onChange={() => handleToggleChange("monday")}
          // checked={formik.values.scheduleType.some((item) => item.day === "monday")}
          />
          <span>{t("Monday")}</span>
        </div>
      ),
      From: (
        <Input
          type="time"
          // value={formik.values.scheduleType.find((item) => item.day === "monday")?.from}
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleFromChange("monday", value.target.value)}
          // disabled={!formik.values.scheduleType.some((item) => item.day === "monday")}
          required
        />
      ),
      To: (
        <Input
          type="time"
          // value={formik.values.scheduleType.find((item) => item.day === "monday")?.to}
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleToChange("monday", value.target.value)}
          // disabled={!formik.values.scheduleType.some((item) => item.day === "monday")}
          required
        />
      ),
    },
    {
      workingDay: (
        <div className="flex items-center gap-4 font-semibold">
          <ToggleCheck
            id="tuesday"
            variant={"themePrimary"}
            disabled={false}
            onChange={() => handleToggleChange("tuesday")}
          // checked={formik.values.scheduleType.some((item) => item.day === "tuesday")}
          />
          <span>{t("Tuesday")}</span>
        </div>
      ),
      From: (
        <Input
          type="time"
          // value={formik.values.scheduleType.find((item) => item.day === "tuesday")?.from}
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleFromChange("tuesday", value.target.value)}
          // disabled={!formik.values.scheduleType.some((item) => item.day === "tuesday")}
          required
        />
      ),
      To: (
        <Input
          type="time"
          // value={formik.values.scheduleType.find((item) => item.day === "tuesday")?.to}
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleToChange("tuesday", value.target.value)}
          // disabled={!formik.values.scheduleType.some((item) => item.day === "tuesday")}
          required
        />
      ),
    },
    {
      workingDay: (
        <div className="flex items-center gap-4 font-semibold">
          <ToggleCheck
            id="Wednesday"
            variant={"themePrimary"}
            disabled={false}
            onChange={() => handleToggleChange("wednesday")}
          // checked={formik.values.scheduleType.some((item) => item.day === "wednesday")}
          />
          <span>{t("Wednesday")}</span>
        </div>
      ),
      From: (
        <Input
          type="time"
          // value={formik.values.scheduleType.find((item) => item.day === "wednesday")?.from}
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleFromChange("wednesday", value.target.value)}
          // disabled={!formik.values.scheduleType.some((item) => item.day === "wednesday")}
          required
        />
      ),
      To: (
        <Input
          type="time"
          // value={formik.values.scheduleType.find((item) => item.day === "wednesday")?.to}
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleToChange("wednesday", value.target.value)}
          // disabled={!formik.values.scheduleType.some((item) => item.day === "wednesday")}
          required
        />
      ),
    },
    {
      workingDay: (
        <div className="flex items-center gap-4 font-semibold">
          <ToggleCheck
            id="Thursday"
            variant={"themePrimary"}
            disabled={false}
            onChange={() => handleToggleChange("thursday")}
          // checked={formik.values.scheduleType.some((item) => item.day === "thursday")}
          />
          <span>{t("Thursday")}</span>
        </div>
      ),
      From: (
        <Input
          type="time"
          // value={formik.values.scheduleType.find((item) => item.day === "thursday")?.from}
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleFromChange("thursday", value.target.value)}
          // disabled={!formik.values.scheduleType.some((item) => item.day === "thursday")}
          required
        />
      ),
      To: (
        <Input
          type="time"
          // value={formik.values.scheduleType.find((item) => item.day === "thursday")?.to}
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleToChange("thursday", value.target.value)}
          // disabled={!formik.values.scheduleType.some((item) => item.day === "thursday")}
          required
        />
      ),
    },
    {
      workingDay: (
        <div className="flex items-center gap-4 font-semibold">
          <ToggleCheck
            id="Friday"
            variant={"themePrimary"}
            disabled={false}
            onChange={() => handleToggleChange("friday")}
          // checked={formik.values.scheduleType.some((item) => item.day === "friday")}
          />
          <span>{t("Friday")}</span>
        </div>
      ),
      From: (
        <Input
          type="time"
          // value={formik.values.scheduleType.find((item) => item.day === "friday")?.from}
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleFromChange("friday", value.target.value)}
          // disabled={!formik.values.scheduleType.some((item) => item.day === "friday")}
          required
        />
      ),
      To: (
        <Input
          type="time"
          // value={formik.values.scheduleType.find((item) => item.day === "friday")?.to}
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleToChange("friday", value.target.value)}
          // disabled={!formik.values.scheduleType.some((item) => item.day === "friday")}
          required
        />
      ),
    },
    {
      workingDay: (
        <div className="flex items-center gap-4 font-semibold">
          <ToggleCheck
            id="Saturday"
            variant={"themePrimary"}
            disabled={false}
            onChange={() => handleToggleChange("saturday")}
          // checked={formik.values.scheduleType.some((item) => item.day === "saturday")}
          />
          <span>{t("Saturday")}</span>
        </div>
      ),
      From: (
        <Input
          type="time"
          // value={formik.values.scheduleType.find((item) => item.day === "saturday")?.from}
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleFromChange("saturday", value.target.value)}
          // disabled={!formik.values.scheduleType.some((item) => item.day === "saturday")}
          required
        />
      ),
      To: (
        <Input
          type="time"
          // value={formik.values.scheduleType.find((item) => item.day === "saturday")?.to}
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleToChange("saturday", value.target.value)}
          // disabled={!formik.values.scheduleType.some((item) => item.day === "saturday")}
          required
        />
      ),
    },
    {
      workingDay: (
        <div className="flex items-center gap-4 font-semibold">
          <ToggleCheck
            id="Sunday"
            variant={"themePrimary"}
            disabled={false}
            onChange={() => handleToggleChange("sunday")}
          // checked={formik.values.scheduleType.some((item) => item.day === "sunday")}
          />
          <span>{t("Sunday")}</span>
        </div>
      ),
      From: (
        <Input
          type="time"
          // value={formik.values.scheduleType.find((item) => item.day === "sunday")?.from}
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleFromChange("sunday", value.target.value)}
          // disabled={!formik.values.scheduleType.some((item) => item.day === "sunday")}
          required
        />
      ),
      To: (
        <Input
          type="time"
          // value={formik.values.scheduleType.find((item) => item.day === "sunday")?.to}
          // disabled={!formik.values.scheduleType.some((item) => item.day === "sunday")}
          placeholder={"9:00:00 PM"}
          // onChange={(value) => handleToChange("sunday", value.target.value)}
          required
        />
      ),
    },
  ];
  const flexibleHeadings = [
    { title: t("Working Day"), col: "workingDay" },
    { title: t("Working Hours"), col: "workingHours" },
  ];
  const flexibleRows = [
    {
      workingDay: (
        <div className="flex items-center gap-4 font-semibold">
          <ToggleCheck
            id="Monday"
            variant={"themePrimary"}
            disabled={false}
            onChange={() => handleToggleChange("monday")}
          // checked={formik.values.scheduleType.some((item) => item.day === "monday")}
          />
          <span>{t("Monday")}</span>
        </div>
      ),
      workingHours: (
        <div>
          <Input
            type="text"
            // value={formik.values.scheduleType.find((item) => item.day === "monday")?.hours || ""}
            // disabled={!formik.values.scheduleType.some((item) => item.day === "monday")}
            placeholder={"Monday hours (HH:MM)"}
            onChange={(e) => handleHoursChange("monday", e.target.value)}
            onBlur={(e) => handleHoursBlur("monday", e.target.value)}
            required
          />

          {formik.errors.scheduleType && formik.errors.scheduleType.monday && (
            <div className="custom-error">{formik.errors.scheduleType.monday}</div>
          )}
        </div>
      ),
    },
    {
      workingDay: (
        <div className="flex items-center gap-4 font-semibold">
          <ToggleCheck
            id="tuesday"
            variant={"themePrimary"}
            disabled={false}
            onChange={() => handleToggleChange("tuesday")}
          //checked={formik.values.scheduleType.some((item) => item.day === "tuesday")}
          />
          <span>{t("Tuesday")}</span>
        </div>
      ),
      workingHours: (
        <div>
          <Input
            type="text"
            // value={formik.values.scheduleType.find((item) => item.day === "tuesday")?.hours}
            // disabled={!formik.values.scheduleType.some((item) => item.day === "tuesday")}
            placeholder={"Tuesday hours (HH:MM)"}
            onChange={(value) => handleHoursChange("tuesday", value.target.value)}
            onBlur={(e) => handleHoursBlur("tuesday", e.target.value)}
            required
          />
          {formik.errors.scheduleType && formik.errors.scheduleType.tuesday && (
            <div className="custom-error">{formik.errors.scheduleType.tuesday}</div>
          )}
        </div>
      ),
    },
    {
      workingDay: (
        <div className="flex items-center gap-4 font-semibold">
          <ToggleCheck
            id="wednesday"
            variant={"themePrimary"}
            disabled={false}
            onChange={() => handleToggleChange("wednesday")}
          //checked={formik.values.scheduleType.some((item) => item.day === "wednesday")}
          />
          <span>{t("Wednesday")}</span>
        </div>
      ),
      workingHours: (
        <div>
          <Input
            type="text"
            value={formik.values.scheduleType.find((item) => item.day === "wednesday")?.hours}
            // disabled={!formik.values.scheduleType.some((item) => item.day === "wednesday")}
            placeholder={"Wednesday hours (HH:MM)"}
            onChange={(value) => handleHoursChange("wednesday", value.target.value)}
            onBlur={(e) => handleHoursBlur("wednesday", e.target.value)}
            required
          />
          {formik.errors.scheduleType && formik.errors.scheduleType.wednesday && (
            <div className="custom-error">{formik.errors.scheduleType.wednesday}</div>
          )}
        </div>
      ),
    },
    {
      workingDay: (
        <div className="flex items-center gap-4 font-semibold">
          <ToggleCheck
            id="Thursday"
            variant={"themePrimary"}
            disabled={false}
            onChange={() => handleToggleChange("thursday")}
          //checked={formik.values.scheduleType.some((item) => item.day === "thursday")}
          />
          <span>{t("Thursday")}</span>
        </div>
      ),
      workingHours: (
        <div>
          <Input
            type="text"
            value={formik.values.scheduleType.find((item) => item.day === "thursday")?.hours}
            // disabled={!formik.values.scheduleType.some((item) => item.day === "thursday")}
            placeholder={"Thursday hours (HH:MM)"}
            onChange={(value) => handleHoursChange("thursday", value.target.value)}
            onBlur={(e) => handleHoursBlur("thursday", e.target.value)}
            required
          />
          {formik.errors.scheduleType && formik.errors.scheduleType.thursday && (
            <div className="custom-error">{formik.errors.scheduleType.thursday}</div>
          )}
        </div>
      ),
    },
    {
      workingDay: (
        <div className="flex items-center gap-4 font-semibold">
          <ToggleCheck
            id="friday"
            variant={"themePrimary"}
            disabled={false}
            onChange={() => handleToggleChange("friday")}
          // checked={formik.values.scheduleType.some((item) => item.day === "friday")}
          />
          <span>{t("Friday")}</span>
        </div>
      ),
      workingHours: (
        <div>
          <Input
            type="text"
            value={formik.values.scheduleType.find((item) => item.day === "friday")?.hours}
            // disabled={!formik.values.scheduleType.some((item) => item.day === "friday")}
            placeholder={"Frinday hours (HH:MM)"}
            onChange={(value) => handleHoursChange("friday", value.target.value)}
            onBlur={(e) => handleHoursBlur("friday", e.target.value)}
            required
          />
          {formik.errors.scheduleType && formik.errors.scheduleType.friday && (
            <div className="custom-error">{formik.errors.scheduleType.friday}</div>
          )}
        </div>
      ),
    },
    {
      workingDay: (
        <div className="flex items-center gap-4 font-semibold">
          <ToggleCheck
            id="Saturday"
            variant={"themePrimary"}
            disabled={false}
            onChange={() => handleToggleChange("saturday")}
          // checked={formik.values.scheduleType.some((item) => item.day === "saturday")}
          />
          <span>{t("Saturday")}</span>
        </div>
      ),
      workingHours: (
        <div>
          <Input
            type="text"
            value={formik.values.scheduleType.find((item) => item.day === "saturday")?.hours}
            // disabled={!formik.values.scheduleType.some((item) => item.day === "saturday")}
            placeholder={"Saturday hours (HH:MM)"}
            onChange={(value) => handleHoursChange("saturday", value.target.value)}
            onBlur={(e) => handleHoursBlur("saturday", e.target.value)}
            required
          />
          {formik.errors.scheduleType && formik.errors.scheduleType.saturday && (
            <div className="custom-error">{formik.errors.scheduleType.saturday}</div>
          )}
        </div>
      ),
    },
    {
      workingDay: (
        <div className="flex items-center gap-4 font-semibold">
          <ToggleCheck
            id="sunday"
            variant={"themePrimary"}
            disabled={false}
            onChange={() => handleToggleChange("sunday")}
          // checked={formik.values.scheduleType.some((item) => item.day === "sunday")}
          />
          <span>{t("Sunday")}</span>
        </div>
      ),
      workingHours: (
        <div>
          <Input
            type="text"
            value={formik.values.scheduleType.find((item) => item.day === "sunday")?.hours}
            // disabled={!formik.values.scheduleType.some((item) => item.day === "sunday")}
            placeholder={"Sunday hours (HH:MM)"}
            onChange={(value) => handleHoursChange("sunday", value.target.value)}
            onBlur={(e) => handleHoursBlur("sunday", e.target.value)}
            required
          />
          {formik.errors.scheduleType && formik.errors.scheduleType.sunday && (
            <div className="custom-error">{formik.errors.scheduleType.sunday}</div>
          )}
        </div>
      ),
    },
  ];
  const flagHeadings = [
    { title: t("Attendance Flag"), col: "AttendanceFlag" },
    { title: t("Flag Affect"), col: "FlagAffect" },
    { title: t("Minimum Time"), col: "MinimumTime" },
    { title: t("Maximum Time"), col: "MaximumTime" },
    { title: t("Action"), col: "action" },
  ];
  const flagRows = [
    {
      AttendanceFlag: (
        <div className="w-36">
          <Select
            placeholder={"Select One"}
            options={["Late", "Early Day", "Short Day", "Half Day", "Absent for short time"]}
          />
        </div>
      ),
      FlagAffect: (
        <div className="flex justify-center">
          <div className="w-36">
            <Select
              placeholder={"Select One"}
              options={["Before End Time", "After Start Time", "Minimum Working Hours"]}
            />
          </div>
        </div>
      ),
      MinimumTime: "-",
      MaximumTime: "-",
      action: (
        <Button variant={"light-danger"} className={"!py-2 !px-2"}>
          {" "}
          <Trash />{" "}
        </Button>
      ),
    },
    {
      AttendanceFlag: (
        <div className="w-36">
          <Select
            placeholder={"Select One"}
            options={["Late", "Early Day", "Short Day", "Half Day", "Absent for short time"]}
          />
        </div>
      ),
      FlagAffect: (
        <div className="flex justify-center">
          <div className="w-36">
            <Select
              placeholder={"Select One"}
              options={["Before End Time", "After Start Time", "Minimum Working Hours"]}
            />
          </div>
        </div>
      ),
      MinimumTime: "-",
      MaximumTime: "-",
      action: (
        <Button variant={"light-danger"} className={"!py-2 !px-2"}>
          {" "}
          <Trash />{" "}
        </Button>
      ),
    },
    {
      AttendanceFlag: (
        <div className="w-36">
          <Select
            placeholder={"Select One"}
            options={["Late", "Early Day", "Short Day", "Half Day", "Absent for short time"]}
          />
        </div>
      ),
      FlagAffect: (
        <div className="flex justify-center">
          <div className="w-36">
            <Select
              placeholder={"Select One"}
              options={["Before End Time", "After Start Time", "Minimum Working Hours"]}
            />
          </div>
        </div>
      ),
      MinimumTime: "-",
      MaximumTime: "-",
      action: (
        <Button variant={"light-danger"} className={"!py-2 !px-2"}>
          {" "}
          <Trash />{" "}
        </Button>
      ),
    },
    {
      AttendanceFlag: (
        <div className="w-36">
          <Select
            placeholder={"Select One"}
            options={["Late", "Early Day", "Short Day", "Half Day", "Absent for short time"]}
          />
        </div>
      ),
      FlagAffect: (
        <div className="flex justify-center">
          <div className="w-36">
            <Select
              placeholder={"Select One"}
              options={["Before End Time", "After Start Time", "Minimum Working Hours"]}
            />
          </div>
        </div>
      ),
      MinimumTime: "7:00",
      MaximumTime: "6:00",
      action: (
        <Button variant={"light-danger"} className={"!py-2 !px-2"}>
          {" "}
          <Trash />{" "}
        </Button>
      ),
    },
    {
      AttendanceFlag: (
        <div className="w-36">
          <Select
            placeholder={"Select One"}
            options={["Late", "Early Day", "Short Day", "Half Day", "Absent for short time"]}
          />
        </div>
      ),
      FlagAffect: (
        <div className="flex justify-center">
          <div className="w-36">
            <Select
              placeholder={"Select One"}
              options={["Before End Time", "After Start Time", "Minimum Working Hours"]}
            />
          </div>
        </div>
      ),
      MinimumTime: "-",
      MaximumTime: "-",
      action: (
        <Button variant={"light-danger"} className={"!py-2 !px-2"}>
          {" "}
          <Trash />{" "}
        </Button>
      ),
    },
  ];
  const formElements = [
    {
      type: "text",
      name: "shiftName",
      label: t("Shift Name"),
      placeholder: t("Shift Name"),
      required: true,
      value: formik.values.shiftName,
      onChange: (e) => {
        formik.handleChange(e);
        const shiftName = e.target.value;
        const shiftCode = generateShiftCode(shiftName);
        formik.setFieldValue("shiftCode", shiftCode);
      },
    },
    {
      type: "text",
      name: "shiftCode",
      label: t("Shift Code"),
      placeholder: t("Shift Code"),
      required: true,
      value: formik.values.shiftCode,
    },
    {
      type: "radio",
      name: "flexibleSchedule",
      label: t("Flexible Schedule"),
      required: true,
      id: "flexibleSchedule",
      default: true,
      value: formik.values.radioStatus,
    },
    {
      type: "radio",
      name: "clockBased",
      label: t("Clock Based"),
      id: "clockBased",
      required: true,
      value: formik.values.clockBased,
    },
    {
      type: formik.values.radioStatus === "clockBased" ? "time" : "hidden",
      name: "startTime",
      label: t("Start Time"),
      placeholder: t("Start Time"),
      required: true,
      value: formik.values.startTime,
    },
    {
      type: formik.values.radioStatus === "clockBased" ? "time" : "hidden",
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
      onChange: (e) => {
        formik.handleChange(e);
        handleShiftTimeChange();
      },
    },
    {
      type: formik.values.radioStatus === "flexibleSchedule" ? "time" : "hidden",
      name: "maxStartTime",
      label: t("Max Start Time"),
      placeholder: t("Max Start Time"),
      required: true,
      value: formik.values.maxStartTime,
      onChange: (e) => {
        formik.handleChange(e);
        handleShiftTimeChange();
      },
    },
    {
      type: formik.values.radioStatus === "clockBased" ? "time" : "hidden",
      name: "maxEndTime",
      label: t("Max End Time"),
      placeholder: t("Max End Time"),
      required: true,
      value: formik.values.maxEndTime,
    },
    {
      type: "switch",
      name: "shiftEndNextDay",
      id: "shiftEndNextDay",
      label: t("Shift end on the next day"),
      checked: formik.values.shiftEndNextDay,
      className: "col-span-2",
      onChange: (e) => formik.setFieldValue("shiftEndNextDay", e.target.checked),
    },
    {
      type: "switch",
      name: "break",
      id: "break",
      label: t("Break"),
      checked: formik.values.break,
    },
    {
      type: "switch",
      name: "breakCountable",
      id: "breakCountable",
      label: t("Is Break Countable?"),
      checked: formik.values.breakCountable,
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
      title={object ? `Edit Shift Plan` : `Add Shift Plan`}
      formElements={formElements}
      formik={formik}
      onClose={onClose}
      is_loading={is_loading}
      buttonText={object}
    >
      {formik.values.radioStatus === "clockBased" ? (
        <div className="py-6 col-span-2">
          <Table
            headings={headings}
            rows={rows}
            sortCol={sortCol}
            setSortCol={setSortCol}
            sortDir={sortDir}
            setSortDir={setSortDir}
            perPage={perPage}
            setPerPage={setPerPage}
            page={page}
            setPage={setPage}
            className={"zt-employeeTable zt-attendanceAddclockTable"}
          />
          <div className="py-6 flex flex-col items-start">
            <Table
              headings={flagHeadings}
              rows={flagRows}
              sortCol={sortCol}
              setSortCol={setSortCol}
              sortDir={sortDir}
              setSortDir={setSortDir}
              perPage={perPage}
              setPerPage={setPerPage}
              page={page}
              setPage={setPage}
              className={"zt-employeeTable zt-addAttendanceTable"}
            />
            <Button variant={"dark-outline"}>
              <Plus /> Add Line
            </Button>
          </div>
        </div>
      ) : (
        <div className="py-6 col-span-2">
          <h3 className="text-xl text-start">{t("Working Time")}</h3>
          <Table
            headings={flexibleHeadings}
            rows={flexibleRows}
            sortCol={sortCol}
            setSortCol={setSortCol}
            sortDir={sortDir}
            setSortDir={setSortDir}
            perPage={perPage}
            setPerPage={setPerPage}
            page={page}
            setPage={setPage}
            className={"zt-employeeTable zt-attendanceAddTable"}
          />
          <div className="py-6 flex flex-col items-start">
            <Table
              headings={flagHeadings}
              rows={flagRows}
              sortCol={sortCol}
              setSortCol={setSortCol}
              sortDir={sortDir}
              setSortDir={setSortDir}
              perPage={perPage}
              setPerPage={setPerPage}
              page={page}
              setPage={setPage}
              className={"zt-employeeTable zt-addAttendanceTable"}
            />
            <Button variant={"dark-outline"}>
              <Plus /> Add Line
            </Button>
          </div>
        </div>
      )}
    </BaseForm>
  );
}
