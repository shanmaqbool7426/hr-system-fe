import React from "react";
import { Button, CheckBox, DropDown, Table } from "@/components/elements";
import CreateFlagForm from "@/components/forms/attendance/createFlagSetting";
import DisplayDate from "@/components/elements/DisplayDate";
import FilterArea from "@/components/includes/FilterArea";
import Toast from "@/util/toast";
import { CrossClose, Edit, ThreeDotsVertical } from "@/components/svg";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchShiftFlags,
  DeleteShiftFlag,
} from "@/store/actions/shift-flag.actions";
export default function AttendanceFlagsSettingPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [add, setAdd] = useState(false);
  const [editFlag, setEditFlag] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    deduction: null,
  });

  const { flags_list, is_loading } = useSelector((state) => state.shiftflag);
  useEffect(() => {
    dispatch(FetchShiftFlags());
  }, [dispatch]);

  const headings = [
   
    { title: t("Reason Type"), col: "name" },
    { title: t("Deduction"), col: "deduction" },
    { title: t("Modified On"), col: "modifiedOn" },
    { title: t("Action"), col: "action" },
  ];

  const deleteHandler = (item) => {
    Toast.confirmDelete(() => {
      dispatch(
        DeleteShiftFlag(item._id, () => {
          Toast.success(t("Flag deleted successfully"));
        })
      );
    }, t);
  };

  const filterElements = [
    {
      type: "search",
      name: "search",
      value: filters.search,
      placeholder: t("Search by reason type"),
      className: "xl:col-span-2",
      onChange: (event) => {
        let _filter = { ...filters };
        _filter["search"] = event.target.value;
        setFilters(_filter);
      },
    },
  ];

  let filteredrows = flags_list
    .filter((item) => {
      return (
        filters.search.length === 0 ||
        item.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortDir === "asc") return a[sortCol]?.localeCompare(b[sortCol]);
      else return b[sortCol]?.localeCompare(a[sortCol]);
    });

  const indexOfLastItem = page * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const paginatedData = filteredrows.slice(indexOfFirstItem, indexOfLastItem);
  const rows = paginatedData?.map((item,i) => ({
    name: item?.name,
    deduction: item?.deduction,
    modifiedOn: (
      <div className="flex justify-center">
        <div className="flex flex-col items-start">
          <span>
            <DisplayDate date={item?.modifiedOn} time={true} />
          </span>
          <span className="text-themeGrayscale500">
            {t("By")}{" "}
            <span className="text-[#7239EA]">{`${item?.modifiedBy?.firstName} ${item?.modifiedBy?.lastName}`}</span>
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
                setEditFlag(item);
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
                deleteHandler(item);
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

  const pagination = {
    totalRecords: filteredrows.length,
    showPerPage: true,
    prevAction: () => page > 1 && setPage(page - 1),
    clickAction: (value) => setPage(value),
    nextAction: () => setPage(page + 1),
  };
  return (
    <section className="flex flex-col grow relative">
      <div className="flex justify-between pb-6">
        <h1 className="text-h4 mb-0">{t("Attendance Settings")}</h1>
        <Button
          className={"btn btn-primary"}
          onClick={() => setAdd(true)}
        >
          {t("Add New Flag")}
        </Button>
      </div>
      <div className="zt-card grow">
        <div className="w-full bg-white p-1 rounded-lg grow">
          <FilterArea
            title={t("Flags Setting")}
            elements={filterElements}
            filters={filters}
            setFilters={setFilters}
          />
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
            pagination={pagination}
            className={"zt-employeeTable zt-attendanceTable"}
            isLoading={is_loading}
          />
        </div>
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
    </section>
  );
}
