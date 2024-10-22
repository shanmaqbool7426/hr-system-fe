import React, { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { Button, CheckBox, DropDown, Table } from "@/components/elements";
import CreateShiftPlan from "@/components/forms/attendance/create-shift-plan";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import Toast from "@/util/toast";
import { useDispatch, useSelector } from "react-redux";
import { DeleteShift, FetchShifts } from "@/store/actions/shiftplan.action";

export default function ShiftPlanPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { is_loading, shift_list } = useSelector((state) => state.shift);
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editDetail, setEditDetails] = useState("");


  const headings = [
    { title: t("Shift Title"), col: "name" },
    { title: t("Shift Code"), col: "shiftCode" },
    { title: t("Shift Type"), col: "shiftType" },
    { title: t("Start Time"), col: "startTime" },
    { title: t("End Time"), col: "endTime" },
    { title: t("Action"), col: "action" },
  ];
  let filteredrows = [...shift_list].sort((a, b) => {
    if (sortDir === "asc") return a[sortCol]?.localeCompare(b[sortCol]);
    else return b[sortCol]?.localeCompare(a[sortCol]);
  });
  const indexOfLastItem = page * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const paginatedData = filteredrows.slice(indexOfFirstItem, indexOfLastItem);

  const rows = paginatedData?.map((item, i) => ({
    name: item?.name,
    shiftCode: item?.shiftCode,
    shiftType: <span className="capitalize">{item?.shiftType}</span>,
    startTime: item?.shiftType === 'fixed' ? item?.startTime : item?.minStartTime,
    endTime: item?.endTime || '-----',
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
                deleteHandler(item._id);
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

  const deleteHandler = (id) => {
    Toast.confirmDelete(() => {
      dispatch(DeleteShift(id, () => {
        Toast.success(t("Shift deleted successfully"))
      }))
    }, t)
  }

  useEffect(() => {
    dispatch(FetchShifts());
  }, [dispatch]);

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
