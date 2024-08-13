import * as Yup from "yup";
import { useFormik } from "formik";
import BaseForm from "../BaseForm";
import { useTranslation } from "react-i18next";
import Toast from "@/util/toast";
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions";
import { useDispatch } from "react-redux";
import { Button, SearchSelect, Select, Table, ToggleCheck } from "@/components/elements";
import { useState } from "react";
import { Plus, Trash } from "@/components/svg";
import { CreateShiftplan } from "@/store/actions/shiftplan.action";
export default function CreateAttendanceForm({ onClose, object }) {
  const { t } = useTranslation();
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      shiftName: object?.shiftName || "",
      reqiuredHours: object?.reqiuredHours || "",
      startTime: object?.startTime || "",
      endTime: object?.endTime || "",
      minStartTime: object?.minStartTime || "",
      maxStartTime: object?.maxStartTime || "",
      maxEndTime: object?.maxEndTime || "",
      breakStartTime: object?.breakStartTime || "",
      breakEndTime: object?.breakEndTime || "", 
      radioStatus: object?.radioStatus || "flexibleSchedule",
      scheduleType: object?.scheduleType || [],
    },
    validationSchema: Yup.object().shape({
      shiftName: Yup.string().required(t("shift Name is required.")),
      reqiuredHours: Yup.string().required(t("Required working hours/ Day is required.")),
      startTime: Yup.string().when("radioStatus", {
        is: "clockBased",
        then: () => Yup.string().required(t("Start Time is required.")),
        otherwise: () => Yup.string(),
      }),
      endTime: Yup.string().when("radioStatus", {
        is: "clockBased",
        then: () => Yup.string().required(t("End Time is required.")),
        otherwise: () => Yup.string(),
      }),
      minStartTime: Yup.string().required(t("Min Start Time is required.")), 
      maxEndTime: Yup.string().when("radioStatus", {
        is: "clockBased",
        then: () => Yup.string().required(t("Max End Time is required.")),
        otherwise: () => Yup.string(),
      }),
      maxStartTime: Yup.string().when("radioStatus", {
        is: "flexibleSchedule",
        then: () => Yup.string().required(t("Max Start Time is required.")),
        otherwise: () => Yup.string(),
      }), 
      breakStartTime: Yup.string().required(t("Break Start Time is required.")),
      breakEndTime: Yup.string().required(t("Break End Time is required.")),
    }),
    onSubmit: async (values) => {
      dispatch(CreateShiftplan(values));
      Toast.success('Shift created Plan successfully'); 
      onClose();
    },
  }); 
  console.log(formik.values , "checkingstatus");
  

  // const onCompleted = () => {
  //   Toast.success(object ? t(`${type} updated successfully`) : t(`${type} created successfully`)); 
  //   onClose();
  // };
  const handleToggleChange = (day) => {
    const scheduleType = formik.values.scheduleType;
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
    formik.setFieldValue("scheduleType", [...scheduleType]);
  };

  const handleHoursChange = (day, hours) => {
    const scheduleType = formik.values.scheduleType;
    const index = scheduleType.findIndex((item) => item.day === day);
    if (index > -1) {
      scheduleType[index].hours = hours;
    }
    formik.setFieldValue("scheduleType", [...scheduleType]);
  };

  const handleFromChange = (day, from) => {
    const scheduleType = formik.values.scheduleType;
    const index = scheduleType.findIndex((item) => item.day === day);
    if (index > -1) {
      scheduleType[index].from = from;
    }
    formik.setFieldValue("scheduleType", [...scheduleType]);
  };
  const handleToChange = (day, to) => {
    const scheduleType = formik.values.scheduleType;
    const index = scheduleType.findIndex((item) => item.day === day);
    if (index > -1) {
      scheduleType[index].to = to;
    }
    formik.setFieldValue("scheduleType", [...scheduleType]);
  };
  const selectList = [
    { display: "9:00:00 PM", value: "9:00:00 PM" },
    { display: "8:00:00 PM", value: "8:00:00 PM" },
    { display: "6:00:00 PM", value: "6:00:00 PM" },
  ];
  const flexibleselectList = [
    { display: "9:00:00", value: "9:00:00" },
    { display: "8:00:00", value: "8:00:00" },
    { display: "6:00:00", value: "6:00:00" },
  ];
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
            checked={formik.values.scheduleType.some((item) => item.day === "monday")}
          />
          <span>{t("Monday")}</span>
        </div>
      ),
      From: (
        <SearchSelect
          list={selectList}
          value={formik.values.scheduleType.find((item) => item.day === "monday")?.from} 
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleFromChange("monday", value)}
          required
        />
      ),
      To: (
        <SearchSelect
          list={selectList}
          value={formik.values.scheduleType.find((item) => item.day === "monday")?.to} 
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleToChange("monday", value)}
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
            checked={formik.values.scheduleType.some((item) => item.day === "tuesday")}
          />
          <span>{t("Tuesday")}</span>
        </div>
      ),
      From: (
        <SearchSelect
          list={selectList}
          value={formik.values.scheduleType.find((item) => item.day === "tuesday")?.from} 
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleFromChange("tuesday", value)}
          required
        />
      ),
      To: (
        <SearchSelect
          list={selectList}
          value={formik.values.scheduleType.find((item) => item.day === "tuesday")?.to} 
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleToChange("tuesday", value)}
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
            checked={formik.values.scheduleType.some((item) => item.day === "wednesday")}
          />
          <span>{t("Wednesday")}</span>
        </div>
      ),
      From: (
        <SearchSelect
          list={selectList}
          value={formik.values.scheduleType.find((item) => item.day === "wednesday")?.from} 
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleFromChange("wednesday", value)} 
          required
        />
      ),
      To: (
        <SearchSelect
          list={selectList}
          value={formik.values.scheduleType.find((item) => item.day === "wednesday")?.to} 
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleToChange("wednesday", value)}

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
            checked={formik.values.scheduleType.some((item) => item.day === "thursday")}
          />
          <span>{t("Thursday")}</span>
        </div>
      ),
      From: (
        <SearchSelect
          list={selectList}
          value={formik.values.scheduleType.find((item) => item.day === "thursday")?.from} 
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleFromChange("thursday", value)} 
          required
        />
      ),
      To: (
        <SearchSelect
          list={selectList}
          value={formik.values.scheduleType.find((item) => item.day === "thursday")?.to}
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleToChange("thursday", value)} 
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
            checked={formik.values.scheduleType.some((item) => item.day === "friday")}
          />
          <span>{t("Friday")}</span>
        </div>
      ),
      From: (
        <SearchSelect
          list={selectList}
          value={formik.values.scheduleType.find((item) => item.day === "friday")?.from}
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleFromChange("friday", value)} 
          required
        />
      ),
      To: (
        <SearchSelect
          list={selectList}
          value={formik.values.scheduleType.find((item) => item.day === "friday")?.to}
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleToChange("friday", value)} 
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
            checked={formik.values.scheduleType.some((item) => item.day === "saturday")}
          />
          <span>{t("Saturday")}</span>
        </div>
      ),
      From: (
        <SearchSelect
          list={selectList}
          value={formik.values.scheduleType.find((item) => item.day === "saturday")?.from}
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleFromChange("saturday", value)} 
          required
        />
      ),
      To: (
        <SearchSelect
          list={selectList}
          value={formik.values.scheduleType.find((item) => item.day === "saturday")?.to}
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleToChange("saturday", value)} 
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
            checked={formik.values.scheduleType.some((item) => item.day === "sunday")}
          />
          <span>{t("Sunday")}</span>
        </div>
      ),
      From: (
        <SearchSelect
          list={selectList}
          value={formik.values.scheduleType.find((item) => item.day === "sunday")?.from}
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleFromChange("sunday", value)} 
          required
        />
      ),
      To: (
        <SearchSelect
          list={selectList}
          value={formik.values.scheduleType.find((item) => item.day === "sunday")?.to}
          placeholder={"9:00:00 PM"}
          onChange={(value) => handleToChange("sunday", value)} 
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
            checked={formik.values.scheduleType.some((item) => item.day === "monday")}
          />
          <span>{t("Monday")}</span>
        </div>
      ),
      workingHours: (
        <SearchSelect
          list={flexibleselectList}
          value={formik.values.scheduleType.find((item) => item.day === "monday")?.hours}
          placeholder={"9:00:00"}
          onChange={(value) => handleHoursChange("monday", value)}
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
            checked={formik.values.scheduleType.some((item) => item.day === "tuesday")}
          />
          <span>{t("Tuesday")}</span>
        </div>
      ),
      workingHours: (
        <SearchSelect
          list={flexibleselectList}
          value={formik.values.scheduleType.find((item) => item.day === "tuesday")?.hours || "9:00:00"}
          placeholder={"9:00:00"}
          onChange={(value) => handleHoursChange("tuesday", value)}
          required
        />
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
            checked={formik.values.scheduleType.some((item) => item.day === "wednesday")}
          />
          <span>{t("Wednesday")}</span>
        </div>
      ),
      workingHours: (
        <SearchSelect
          list={flexibleselectList}
          value={formik.values.scheduleType.find((item) => item.day === "wednesday")?.hours || "9:00:00"}
          placeholder={"9:00:00"}
          onChange={(value) => handleHoursChange("wednesday", value)}
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
            checked={formik.values.scheduleType.some((item) => item.day === "thursday")}
          />
          <span>{t("Thursday")}</span>
        </div>
      ),
      workingHours: (
        <SearchSelect
          list={flexibleselectList}
          value={formik.values.scheduleType.find((item) => item.day === "thursday")?.hours}
          placeholder={"9:00:00"}
          onChange={(value) => handleHoursChange("thursday", value)}
          required
        />
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
            checked={formik.values.scheduleType.some((item) => item.day === "friday")}
          />
          <span>{t("Friday")}</span>
        </div>
      ),
      workingHours: (
        <SearchSelect
          list={flexibleselectList}
          value={formik.values.scheduleType.find((item) => item.day === "friday")?.hours || "9:00:00"}
          placeholder={"9:00:00"}
          onChange={(value) => handleHoursChange("friday", value)}
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
            onChange={() => handleToggleChange("Saturday")}
            checked={formik.values.scheduleType.some((item) => item.day === "Saturday")}
          />
          <span>{t("Saturday")}</span>
        </div>
      ),
      workingHours: (
        <SearchSelect
          list={flexibleselectList}
          value={formik.values.scheduleType.find((item) => item.day === "Saturday")?.hours || "9:00:00"}
          placeholder={"9:00:00"}
          onChange={(value) => handleHoursChange("Saturday", value)}
          required
        />
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
            checked={formik.values.scheduleType.some((item) => item.day === "sunday")}
          />
          <span>{t("Sunday")}</span>
        </div>
      ),
      workingHours: (
        <SearchSelect
          list={flexibleselectList}
          value={formik.values.scheduleType.find((item) => item.day === "sunday")?.hours || "9:00:00"}
          placeholder={"9:00:00"}
          onChange={(value) => handleHoursChange("sunday", value)}
          required
        />
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
    },
    {
      type: "text",
      name: "reqiuredHours",
      label: t("Required working hours/ Day"),
      placeholder: t("Required working hours/ Day"),
      required: true,
      value: formik.values.reqiuredHours,
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
      type: formik.values.radioStatus === "clockBased" ? "text" : "hidden",
      name: "startTime",
      label: t("Start Time"),
      placeholder: t("Start Time"),
      required: true,
      value: formik.values.startTime,
    },
    {
      type: formik.values.radioStatus === "clockBased" ? "text" : "hidden",
      name: "endTime",
      label: t("End Time"),
      placeholder: t("End Time"),
      required: true,
      value: formik.values.endTime,
    },
    {
      type: "text",
      name: "minStartTime",
      label: t("Min Start Time"),
      placeholder: t("Min Start Time"),
      required: true,
      value: formik.values.minStartTime,
    },
    {
      type: formik.values.radioStatus === "flexibleSchedule" ? "text" : "hidden",
      name: "maxStartTime",
      label: t("Max Start Time"),
      placeholder: t("Max Start Time"),
      required: true,
      value: formik.values.maxStartTime,
    },
    {
      type: formik.values.radioStatus === "clockBased" ? "text" : "hidden",
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
      type: formik.values.break ? "text" : "hidden",
      name: "breakStartTime",
      label: t("Break Start Time"),
      placeholder: t("Break Start Time"),
      required: true,
      value: formik.values.breakStartTime,
    },
    {
      type: formik.values.break ? "text" : "hidden",
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
      is_loading={false}
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
