import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, CheckBox, DropDown, Table } from "@/components/elements";
import CreateShiftPlan from "@/components/forms/attendance/create-shift-plan";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import Toast from "@/util/toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchShiftplan, DeleteShiftplan } from "@/store/actions/shiftplan.action";

export default function AttendanceSettingShiftPlanPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editDetail, setEditDetails] = useState("");
  const headings = [
    { title: t("Shift Title"), col: "shiftTitle" },
    { title: t("Start Time"), col: "startTime" },
    { title: t("End Time"), col: "endTime" },
    { title: t("Shift End On Next Day"), col: "shiftEnd" },
    { title: t("Break"), col: "Break" },
    { title: t("Break Countable"), col: "BreakCountable" },
    { title: t("Action"), col: "action" },
  ];
  const { is_loading, shiftplandata } = useSelector((state) => state.shiftplan);
  useEffect(() => {
    dispatch(fetchShiftplan());
  }, [dispatch]);
  const handleDelete = async (id) => {
    await Toast.confirmDelete(() => {
      dispatch(DeleteShiftplan(id));
      Toast.success(t("Shift plan deleted successfully"));
      setTimeout(() => {
        dispatch(fetchShiftplan());
      }, 1000);
      // dispatch(fetchShiftplan());
    }, t);
  };
  const rows = shiftplandata?.list?.map((item) => ({
    shiftTitle: item?.shiftName,
    Break: item?.break === false ? "No" : "Yes",
    BreakCountable: item?.breakCountable === false ? "No" : "Yes",
    startTime: item?.startTime ? item?.startTime : "00:00",
    endTime: item?.endTime ? item?.endTime : "23:59",
    shiftEnd: item?.shiftEndNextDay === false ? "No" : "Yes",
    action: (
      <DropDown icon={<ThreeDotsVertical />}>
        <ul className="zt-themeDropDownList zt-sm gap-4">
          <li className="!p-0">
            <a
              onClick={() => {
                setEdit(true);
                setEditDetails(item);
              }}
              className={"flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark"}
            >
              <span>
                <Edit />
              </span>
              <span>{t("Edit")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a
              onClick={() => {
                handleDelete(item._id);
              }}
              className={"flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark"}
            >
              <span>
                <Trash />
              </span>
              <span>{t("Delete")}</span>
            </a>
          </li>
        </ul>
      </DropDown>
    ),
  }));

  return (
    <section className="flex flex-col grow relative">
      <div className="flex justify-between pb-6">
        <h1 className="text-h4 mb-0">{t("Attendance Settings")}</h1>
        <Button className={"btn btn-primary "} onClick={() => setAdd(true)}>
          {t("Add Shift")}
        </Button>
      </div>
      <div className="zt-card grow">
        <div className="flex justify-between pb-6">
          <h2 className="text-h4 mb-0">{t("Shift Plan")}</h2>
        </div>
        {/* {is_loading && <PageLoader />} */}
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
          className={"zt-employeeTable zt-attendanceShiftTable"}
        />

        {add && (
          <CreateShiftPlan
            onClose={() => {
              setAdd(false);
            }}
            is_loading={is_loading}
          />
        )}

        {edit && (
          <CreateShiftPlan
            onClose={() => {
              setEdit(false);
            }}
            object={editDetail}
            is_loading={is_loading}
          />
        )}
      </div>
    </section>
  );
}
