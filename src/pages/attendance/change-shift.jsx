import { Button, CheckBox, DropDown, Table, DisplayDate } from "@/components/elements";
import ChangeShiftForm from "@/components/forms/attendance/ChangeShift";
import CreatLeaveRequestForm from "@/components/forms/leaves/create-leave-request";
import FilterArea from "@/components/includes/FilterArea";
import { CloseCross, Edit, InputErrorInfo, ThreeDotsVertical, Trash } from "@/components/svg";
import { FetchEmployees } from "@/store/actions/employee.actions";
import { DeleteCustomfield } from "@/store/actions/customfield.actions";
import Toast from "@/util/toast";
import React, { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";

export default function ChangeShift() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [create, setCreate] = useState(false);
  const { customfield_list } = useSelector((state) => state.customfield);
  const { is_loading, employees_list } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(FetchEmployees());
  }, [dispatch]);

  const [filters, setFilters] = useState({
    search: "",
    project: null,
    department: null,
    status: null,
  });
  const pagination = {
    totalRecords: 5,
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
    {
      type: "select",
      name: "Request Type",
      placeholder: "Request Type",
      value: filters.status,
      list: customfield_list
        .filter((item) => item.type === "employee_status")
        .map((item) => {
          return { value: item._id, display: item.name };
        }),
      onChange: (status) => {
        let _filter = { ...filters };
        _filter["status"] = status;
        setFilters(_filter);
      },
    },
    {
      type: "select",
      placeholder: "All Departments",
      name: "All Departments",
      value: filters.status,
      list: customfield_list
        .filter((item) => item.type === "employee_status")
        .map((item) => {
          return { value: item._id, display: item.name };
        }),
      onChange: (status) => {
        let _filter = { ...filters };
        _filter["status"] = status;
        setFilters(_filter);
      },
    },
    {
      type: "select",
      placeholder: "All Job Titles",
      name: "All Job Titles",
      value: filters.status,
      list: customfield_list
        .filter((item) => item.type === "employee_status")
        .map((item) => {
          return { value: item._id, display: item.name };
        }),
      onChange: (status) => {
        let _filter = { ...filters };
        _filter["status"] = status;
        setFilters(_filter);
      },
    },
    {
      type: "select",
      name: "All Status",
      placeholder: "All Status",
      value: filters.status,
      list: customfield_list
        .filter((item) => item.type === "employee_status")
        .map((item) => {
          return { value: item._id, display: item.name };
        }),
      onChange: (status) => {
        let _filter = { ...filters };
        _filter["status"] = status;
        setFilters(_filter);
      },
    },
  ];

  const headings = [
    { title: t("Employee"), col: "Employee" },
    { title: t("Employee Details"), col: "EmployeeDetails" },
    { title: t("Date"), col: "date" },
    { title: t("Schedule Day"), col: "scheduleDay" },
    { title: t("Schedule Date"), col: "scheduleDate" },
    { title: t("Schedule Time"), col: "scheduleTime" },
    { title: t("Shift"), col: "Shift" },
    { title: t("Action"), col: "action" },
  ];

  let filteredrows = employees_list
    .filter((item) => {
      let include = true;
      if (filters.search && filters.search.length > 0) {
        let fullname = item.firstName + " " + item.lastName;
        include =
          fullname.toLowerCase().includes(filters.search.toLowerCase()) ||
          item.email.toLowerCase().includes(filters.search.toLowerCase());
        if (!include) return false;
      }
      if (filters.status) {
        include = item?.status?._id === filters.status;
        if (!include) return false;
      }
      return include;
    })
    .sort((a, b) => {
      if (sortDir === "asc") return a[sortCol]?.localeCompare(b[sortCol]);
      else return b[sortCol]?.localeCompare(a[sortCol]);
    });
  const indexOfLastItem = page * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const paginatedData = filteredrows.slice(indexOfFirstItem, indexOfLastItem);

  const rows = paginatedData?.map((item, i) => ({
    sr: (
      <div className="flex items-center">
        <CheckBox size="sm" variant="dark" />
      </div>
    ),
    SerialNo: i + 1, // Serial number based on the index
    Employee: (
      <div className="flex items-center justify-center gap-4 grow">
        <div className="flex flex-col gap-1 text-left">
          <strong className="text-themeGrayscale">{`${item.firstName} ${item.lastName}`}</strong>
          <span className="text-themeGrayscale500">{item.employeeCode}</span>
        </div>
      </div>
    ),
    EmployeeDetails: (
      <div className="flex gap-4 justify-center">
        <div className="flex flex-col items-start gap-1 text-themeGrayscale500">
          <span>{t("Station")}</span>
          <span>{t("Department")}</span>
        </div>
        <div className="flex flex-col gap-1 text-themeGrayscale">
          <span>{t(item?.station || "N/A")}</span>
          <span>{t(item?.designation?.name || "N/A")}</span>
        </div>
      </div>
    ),
    date: <DisplayDate date={item?.createdAt} />,

    scheduleDay: "N/A",
    scheduleDate: (
      <div className="flex gap-4 justify-center">
        <div className="flex flex-col items-start gap-1">
          <span className="text-themeGrayscale500">{t("In")}</span>
          <span>N/A</span>
          <span className="text-themeGrayscale500">{t("Out")}</span>
          <span>N/A</span>
        </div>
      </div>
    ),
    scheduleTime: (
      <div className="flex gap-4 justify-center">
        <div className="flex flex-col items-start gap-1">
          <span className="text-themeGrayscale500">{t("In")}</span>
          <span>N/A</span> {/* Placeholder for check-in time */}
          <span className="text-themeGrayscale500">{t("Out")}</span>
          <span>N/A</span> {/* Placeholder for check-out time */}
        </div>
      </div>
    ),
    Shift: (
      <select defaultValue={t("N/A")}>
        <option>{t("10:00AM To 7:00PM")}</option>
        <option>{t("OFF")}</option>
        <option>{t("9:00AM To 6:00PM")}</option>
      </select>
    ),
    action: (
      <DropDown icon={<ThreeDotsVertical />}>
        <ul className="zt-themeDropDownList zt-sm gap-4">
          <li className="!p-0">
            <a
              onClick={() => setCreate(true)}
              className="flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark"
            >
              <Edit />
              <span>{t("Edit")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a
              onClick={() => {
                Toast.confirmDelete(() => {
                  dispatch(
                    DeleteCustomfield(item._id, () => {
                      Toast.success(t("Employee deleted successfully"));
                    })
                  );
                }, t);
              }}
              className="flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark"
            >
              <Trash />
              <span>{t("Delete")}</span>
            </a>
          </li>
        </ul>
      </DropDown>
    ),
  }));

  return (
    <section className="flex flex-col grow">
      {/* {is_loading && <PageLoader/>} */}
      <div className="flex justify-between pb-6">
        <h1 className="text-h4 mb-0">{t("Change Employee Shift")}</h1>
        <div className="flex gap-6">
          <Button className={"btn btn-primary"}>{t("Upload Excel")}</Button>
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
