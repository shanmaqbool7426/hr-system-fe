import { Button, CheckBox, DropDown, Table, DisplayDate, DisplayProfile } from "@/components/elements";
import ChangeShiftForm from "@/components/forms/attendance/ChangeShift";
import FilterArea from "@/components/includes/FilterArea";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import { FetchEmployees } from "@/store/actions/employee.actions";
import { FetchChangeShiftRequests, RevertChangeShiftRequest } from "@/store/actions/change-shift-request.actions";
import { FetchShifts } from "@/store/actions/shiftplan.action";

import Toast from "@/util/toast";
import React, { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { usePagination } from "@/hooks/usePagination";

export default function ChangeShift() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [create, setCreate] = useState(false);
  const { request_list } = useSelector((state) => state.changeshiftrequest);
  const [filters, setFilters] = useState({
    search: "",
  });
  const paginatedData = usePagination(request_list, page, perPage, sortCol, sortDir, (item) => {
    if (filters.search && filters.search.length > 0) {
      const fullname = `${item?.employee?.firstName} ${item?.employee?.lastName}`;
      return fullname?.toLowerCase().includes(filters.search.toLowerCase()) || item?.employee?.employeeCode?.toLowerCase().includes(filters.search.toLowerCase()) || item?.employee?.email?.toLowerCase().includes(filters.search.toLowerCase())
    }
    return true;
  })

  useEffect(() => {
    dispatch(FetchEmployees());
    dispatch(FetchChangeShiftRequests());
    dispatch(FetchShifts());
  }, [dispatch]);


  const pagination = {
    totalRecords: request_list.length,
    showPerPage: true,
    prevAction: () => page > 1 && setPage(page - 1),
    clickAction: (value) => setPage(value),
    nextAction: () => setPage(page + 1),
  };
  const filterElements = [
    {
      type: "search",
      name: "search",
      value: filters.search,
      placeholder: t("Search employee"),
      className: "xl:col-span-2",
      onChange: (event) => {
        let _filter = { ...filters };
        _filter["search"] = event.target.value;
        setFilters(_filter);
      },
    },
  ];

  const headings = [
    { title: t("Employee"), col: "employee" },
    { title: t("Current Shift"), col: "previousShift" },
    { title: t("Requested Shift"), col: "requestedShift" },
    { title: t("From"), col: "effectiveDate" },
    { title: t("To"), col: "validTill" },
    { title: t("Status"), col: "status" },
    { title: t("Action"), col: "action" },
  ];

  const rows = paginatedData?.map((item, i) => ({
    _id: item?._id,
    employee: <DisplayProfile user={item?.employee} />,
    previousShift: item?.previousShift?.name || "------",
    requestedShift: item?.requestedShift?.name || "------",
    effectiveDate: item?.effectiveDate ? <DisplayDate date={item?.effectiveDate} /> : "------",
    validTill: item?.validTill ? <DisplayDate date={item?.validTill} /> : "------",
    status: <span className="zt-tag">{item?.status}</span>,
    action: (
      <DropDown icon={<ThreeDotsVertical />}>
        <ul className="zt-themeDropDownList zt-sm gap-4">
          {item?.status === "pending" && <li className="!p-0">
            <a
              onClick={() => setCreate(true)}
              className="flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark"
            >
              <Edit />
              <span>{t("Edit")}</span>
            </a>
          </li>}
          <li className="!p-0">
            <a
              onClick={() => {
                Toast.dynamicTitle(() => {
                  dispatch(
                    RevertChangeShiftRequest(item._id, () => {
                      Toast.success(t("Shift reverted successfully"));
                    })
                  );
                }, t, "Are you sure you want to revert this shift request?");
              }}
              className="flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark"
            >
              <Trash />
              <span>{t("Revert")}</span>
            </a>
          </li>
        </ul>
      </DropDown>
    ),
  }));

  return (
    <section className="flex flex-col grow">
      <div className="flex justify-between pb-6">
        <h1 className="text-h4 mb-0">{t("Change Employee Shift")}</h1>
        <div className="flex gap-6">
          <Button
            onClick={() => {
              setCreate(true);
            }}
            className={"btn btn-primary"}
          >
            {t("Change Shift")}
          </Button>
        </div>
      </div>
      <div className="zt-card grow">
        <FilterArea elements={filterElements} filters={filters} setFilters={setFilters} />
        <Table
          checkbox={false}
          headings={headings}
          rows={rows}
          sortCol={sortCol}
          setSortCol={setSortCol}
          sortDir={sortDir}
          pagination={pagination}
          setSortDir={setSortDir}
          perPage={perPage}
          setPerPage={setPerPage}
          page={page}
          setPage={setPage}
          className={"zt-employeeTable zt-changeShiftTable"}
        />
      </div>
      {create && (
        <ChangeShiftForm
          onClose={() => {
            setCreate(false);
          }}
        />
      )}
    </section>
  );
}
