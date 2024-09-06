import { Button, Table, DropDown, Profile } from "@/components/elements";
import CreateEmployeeForm from "@/components/forms/employees/create";
import FilterArea from "@/components/includes/FilterArea";
import { BlockIcon, Edit, EyeOff, EyeOn, ThreeDotsVertical } from "@/components/svg";
import { FetchEmployees } from "@/store/actions/employee.actions";
import PageLoader from "@/components/elements/PageLoader";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import ReHireForm from "@/components/forms/employees/reHire";

export default function EmployeesListPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { is_loading, employees_list } = useSelector((state) => state.employee);
  const { customfield_list } = useSelector((state) => state.customfield);
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [create, setCreate] = useState("");
  const [reHire, setReHire] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    project: null,
    department: null,
    status: null,
  });

  useEffect(() => {
    dispatch(FetchEmployees());
  }, [dispatch]);

  const filterElements = [
    {
      type: "search",
      name: "search",
      value: filters.search,
      placeholder: t("Search employees by name & email"),
      className: "xl:col-span-2",
      onChange: (event) => {
        let _filter = { ...filters };
        _filter["search"] = event.target.value;
        setFilters(_filter);
      },
    },
    {
      type: "select",
      name: "status",
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
    { title: t("Employee Name"), col: "firstName", sort: true },
    { title: t("Designation"), col: "designation" },
    { title: t("Project"), col: "project" },
    { title: t("Department"), col: "department" },
    { title: t("Line Manager"), col: "lineManager" },
    { title: t("Employee Status"), col: "status", sort: true },
    { title: t("Work Mode"), col: "workMode" },
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

  const rows = paginatedData?.map((item, i) => {
    return {
      firstName: (
        <Link href={`/employees/details/${item._id}`} className="flex gap-2 items-center no-underline dark:text-white">
          <Profile image={item?.avatar} name={item.firstName} />
          <div className="text-left">
            <div>{`${item.firstName} ${item.lastName}`}</div>
            <div className="text-xs">{`${item.employeeCode}`}</div>
          </div>
        </Link>
      ),
      designation: item?.designation?.name || "------",
      project: item?.project?.name || "------",
      department: item?.department?.name || "------",
      lineManager: item?.lineManager ? `${item?.lineManager?.firstName} ${item?.lineManager?.lastName}` : "------",
      status: item?.status?.name || "------",
      workMode: <span className="capitalize">{item?.workMode || "------"}</span>,
      action: (
        <DropDown icon={<ThreeDotsVertical />}>
          <ul className="zt-themeDropDownList zt-sm gap-4">
            <li className="!p-0">
              <Link
                href={`/employees/details/${item._id}`}
                className={"flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themePrimary"}
              >
                <span>
                  <EyeOn />
                </span>
                <span>Details</span>
              </Link>
            </li>
            <li className="!p-0">
              <a
                onClick={() => editEmployee(item)}
                className={
                  "flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark"
                }
              >
                <span>
                  <Edit />
                </span>
                <span>Edit</span>
              </a>
            </li>
            <li className="!p-0">
              <a
                onClick={() => editEmployee(item)}
                className={"flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeOrange"}
              >
                <span>
                  <EyeOff />
                </span>
                <span>Inactive</span>
              </a>
            </li>
            <li className="!p-0">
              <a
                onClick={() => editEmployee(item)}
                className={"flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger"}
              >
                <span>
                  <BlockIcon />
                </span>
                <span>Block</span>
              </a>
            </li>
          </ul>
        </DropDown>
      ),
    };
  });
  const pagination = {
    totalRecords: employees_list.length,
    showPerPage: true,
    prevAction: () => page > 1 && setPage(page - 1),
    clickAction: (value) => setPage(value),
    nextAction: () => setPage(page + 1),
  };

  const editEmployee = (item) => {
    setSelected({ ...item });
    setCreate("employee");
  };

  useEffect(() => {
    dispatch(FetchEmployees());
  }, [dispatch]);

  return (
    <section className="flex flex-col grow">
      {is_loading && <PageLoader />}
      <div className="flex justify-between items-center pb-6">
        <div>
          <h1 className="text-h4 mb-0">{t("Manage Employee")}</h1>
          <p className="mb-0 dark:text-white">{t("Manage your employee")}</p>
        </div>
        <div className="flex items-start gap-2">
          {/* <Button className={"btn btn-dark-outline"}>{t("Export")}</Button> */}
          <Button onClick={() => setReHire(true)} className={"btn btn-dark-outline"}>
            {t("Re-Hire employee")}
          </Button>
          <Button className={"btn btn-primary"} onClick={() => setCreate("employee")}>
            {t("Add employee")}
          </Button>
        </div>
      </div>

      <div className="zt-card grow">
        <FilterArea title={t("Employees")} elements={filterElements} filters={filters} setFilters={setFilters} />

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
          className={"zt-employeeTable"}
        />
      </div>
      {create === "employee" && (
        <CreateEmployeeForm
          employee={selected}
          onClose={() => {
            setCreate("");
            setSelected(null);
          }}
        />
      )}
      {reHire && <ReHireForm onClose={() => setReHire(false)} />}
    </section>
  );
}
