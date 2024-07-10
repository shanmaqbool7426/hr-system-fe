import { Button, CheckBox, DropDown, Table } from "@/components/elements";
import CreateFlagForm from "@/components/forms/attendance/createFlagSetting";
import AddReasonTypeForm from "@/components/forms/attendance/reasonType";
import {
  CrossClose,
  Edit,
  SuccessTick,
  ThreeDotsVertical,
  Tick,
  Trash,
} from "@/components/svg";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchShiftFlags,
  deleteShiftFlag,
} from "@/store/actions/shift-flag.actions";

export default function AttendanceModule() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [add, setAdd] = useState(false);
  const [editFlag, setEditFlag] = useState(null);

  const { flags_list, is_loading } = useSelector((state) => state.shiftflag);

  useEffect(() => {
    dispatch(fetchShiftFlags());
  }, [dispatch]);

  const headings = [
    { title: t("Reason Type"), col: "name" },
    { title: t("Deduction"), col: "deduction" },
    { title: t("Modified On"), col: "modifiedOn" },
    { title: t("Action"), col: "action" },
  ];

  const rows = flags_list.map((flag) => ({
    name: flag.name,
    deduction: flag.deduction,
    modifiedOn: (
      <div className="flex justify-center">
        <div className="flex flex-col items-start">
          <span>
            {moment(flag.modifiedOn).format("DD MMMM YYYY")}
            <span className="text-themeGrayscale500">
              {" "}
              {moment(flag.modifiedOn).format("h:mm A")}
            </span>
          </span>
          <span className="text-themeGrayscale500">
            By{" "}
            <span className="text-[#7239EA]">{`${flag.modifiedBy.firstName} ${flag.modifiedBy.lastName}`}</span>
          </span>
        </div>
      </div>
    ),
    action: (
      <DropDown icon={<ThreeDotsVertical />}>
        <ul className="zt-themeDropDownList zt-sm gap-4">
          <li className="!p-0">
            <a
              onClick={() => {
                setEditFlag(flag);
                setAdd(true);
              }}
              className={
                "flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark"
              }
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
                dispatch(deleteShiftFlag(flag._id));
              }}
              className={
                "flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark"
              }
            >
              <span>
                <CrossClose />
              </span>
              <span>{t("Delete")}</span>
            </a>
          </li>
        </ul>
      </DropDown>
    ),
  }));

  return (
    <div className="zt-card grow">
      <h2 className="font-bold text-xl">{t("Flags Setting")}</h2>
      <Button
        className={"btn btn-primary absolute top-4 right-4"}
        onClick={() => setAdd(true)}
      >
        {t("Add New Flag")}
      </Button>
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
        className={"zt-employeeTable zt-attendanceTable"}
        isLoading={is_loading}
      />
      {add && (
        <CreateFlagForm
          onClose={() => {
            setAdd(false);
            setEditFlag(null);
          }}
          object={editFlag}
        />
      )}
    </div>
  );
}
