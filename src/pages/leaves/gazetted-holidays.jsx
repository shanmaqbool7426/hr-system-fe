import { Button, CheckBox, DropDown, Table } from "@/components/elements";
import CreateGazetedLeaveForm from "@/components/forms/leaves/create-gazetted-leave";
import { Edit, EyeOn, ThreeDotsVertical, Trash } from "@/components/svg";
import { useEffect, useState } from "react";
import Toast from "@/util/toast";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchGazettedHoliday,
  DeleteHoliday,
} from "@/store/actions/gazetteholiday.actions";
import DisplayDate from "@/components/elements/DisplayDate";
import FilterArea from "@/components/includes/FilterArea";
import { FetchEmployees } from "@/store/actions/employee.actions";
import moment from "moment";

export default function LeaveGazettedHolidaysPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [create, setCreate] = useState(false);
  const [editHoliday, setEditHoliday] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
  });

  const { holiday_list, is_loading } = useSelector(
    (state) => state.gazetteholiday
  );
  useEffect(() => {
    dispatch(FetchGazettedHoliday());
    dispatch(FetchEmployees());
  }, [dispatch]);

  const headings = [
   
    { title: t("Holiday Name"), col: "name", sort: true },
    { title: t("From Date"), col: "fromDate" },
    { title: t("To Date"), col: "toDate" },
    { title: t("Action"), col: "action" },
  ];

  const deleteHandler = (item) => {
    Toast.confirmDelete(() => {
      dispatch(
        DeleteHoliday(item._id, () => {
          Toast.success(t("Holiday deleted successfully"));
        })
      );
    }, t);
  };

  const filterElements = [
    {
      type: "search",
      name: "search",
      value: filters.search,
      placeholder: t("Search by holiday name"),
      className: "xl:col-span-2",
      onChange: (event) => {
        let _filter = { ...filters };
        _filter["search"] = event.target.value;
        setFilters(_filter);
      },
    },
  ];

  let filteredRows = holiday_list?.filter((item) => {
      return (
        filters.search.length === 0 ||
        item.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortDir === "asc") return a[sortCol]?.localeCompare(b[sortCol]);
      else return b[sortCol]?.localeCompare(a[sortCol]);
    });

  const indexOfLastItem = page * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const paginatedData = filteredRows?.slice(indexOfFirstItem, indexOfLastItem);
  const rows = paginatedData?.map((item, i) => ({
    name: item?.title,
    fromDate: <div><DisplayDate date={item.fromDate} /> ({moment(item.fromDate).format('dddd')})</div>,
    toDate: <div><DisplayDate date={item.toDate} /> ({moment(item.toDate).format('dddd')})</div>,
    action: (
      <DropDown icon={<ThreeDotsVertical />}>
        <ul className="zt-themeDropDownList zt-sm gap-1">
          <li className="!p-0">
            <a
              onClick={() => setView(true)}
              className={
                "flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themePrimary"
              }
            >
              <span>
                <EyeOn />
              </span>
              <span>{t("View")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a
              onClick={() => {
                setEditHoliday(item);
                setCreate(true);
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
                <Trash />
              </span>
              <span>{t("Delete")}</span>
            </a>
          </li>
        </ul>
      </DropDown>
    ),
  }));

  const pagination = {
    totalRecords: filteredRows?.length,
    showPerPage: true,
    prevAction: () => page > 1 && setPage(page - 1),
    clickAction: (value) => setPage(value),
    nextAction: () => setPage(page + 1),
  };

  return (
    <section className="flex flex-col grow">
      <div className="flex justify-between items-center pb-6">
        <div className="">
          <h1 className="text-h4 mb-0">{t("Gazetted Holidays")}</h1>
        </div>
        <div className="flex items-start gap-2">
          <Button className={"btn btn-primary"} onClick={() => setCreate(true)}>
            {t("Add Gazetted Holidays")}
          </Button>
        </div>
      </div>
      <div className="zt-card grow">
        <FilterArea
          title={t("Gazetted Holidays")}
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
          className={"zt-employeeTable zt-leaveTable"}
          isLoading={is_loading}
        />
      </div>
      {create && (
        <CreateGazetedLeaveForm
          onClose={() => {
            setCreate(false);
            setEditHoliday(null);
          }}
          object={editHoliday}
        />
      )}
    </section>
  );
}
