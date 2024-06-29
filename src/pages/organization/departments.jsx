import { Button, SearchInput, Table, SearchSelect, DropDown } from "@/components/elements";
import PageLoader from "@/components/elements/PageLoader";
import CreateDepartmentForm from "@/components/forms/departments/create";
import FilterArea from "@/components/includes/FilterArea";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import { FetchDepartments, DeleteDepartment } from "@/store/actions/department.actions";
import Toast from "@/util/toast";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DepartmentsPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { is_loading, departments_list } = useSelector((state) => state.department)
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [create, setCreate] = useState("")
  const [selected, setSelected] = useState(null)
  const [filters, setFilters] = useState({
    search: "",
    project: null,
    department: null,
    status: "",
  })

  const filterElements = [
    {
      type: "search",
      name: "search",
      value: filters.search,
      placeholder: t("Search departments by name or code"),
      className: "xl:col-span-2",
      onChange: (event) => {
        let _filter = { ...filters }
        _filter['search'] = event.target.value
        setFilters(_filter)
      }
    },
    {
      type: "select",
      name: "status",
      value: filters.status,
      list: [
        { display: "Active", value: "active" },
        { display: "In Active", value: "inactive" },
      ],
      onChange: (status) => {
        let _filter = { ...filters }
        _filter['status'] = status
        setFilters(_filter)
      }
    },
  ]

  const headings = [
    { title: t("Name"), col: "name", sort: true },
    { title: t("Code"), col: "code", sort: true },
    { title: t("Parent"), col: "parent" },
    { title: t("Head"), col: "head", },
    { title: t("Status"), col: "status", sort: true, className: "capitalize" },
    { title: t("Action"), col: "action" },
  ]

  let filteredrows = departments_list.filter((item) => {
    let include = true
    if (filters.search && filters.search.length > 0) {
      include = item.name.toLowerCase().includes(filters.search.toLowerCase()) || item.code.toLowerCase().includes(filters.search.toLowerCase())
      if (!include) return false
    }
    if (filters.status) {
      include = item?.status === filters.status
      if (!include) return false
    }
    return include
  }).sort((a, b) => {
    if (sortDir === 'asc') return a[sortCol]?.localeCompare(b[sortCol])
    else return b[sortCol]?.localeCompare(a[sortCol])
  })
  const indexOfLastItem = page * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const paginatedData = filteredrows.slice(indexOfFirstItem, indexOfLastItem);

  const rows = paginatedData.map(item => {
    return {
      name: item.name,
      parent: item?.parent?.name || '------',
      head: item?.head ? `${item?.head.firstName} ${item?.head.lastName}` : '------',
      code: item?.code || '------',
      status: item?.status,
      action: item?.company ? <DropDown icon={<ThreeDotsVertical />}>
        <ul className="zt-themeDropDownList zt-sm gap-4">
          <li className="!p-0">
            <a onClick={() => editDepartment(item)} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
              <span><Edit /></span>
              <span>{t("Edit")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a onClick={() => removeDepartment(item)} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
              <span><Trash /></span>
              <span>{t('Delete')}</span>
            </a>
          </li>
        </ul>
      </DropDown> : ""
    }
  })

  const pagination = {
    totalRecords: departments_list.length,
    showPerPage: true,
    prevAction: () => page > 1 && setPage(page - 1),
    clickAction: (value) => setPage(value),
    nextAction: () => setPage(page + 1),
  }

  const editDepartment = (item) => {
    setSelected({ ...item })
    setCreate('department')
  }

  const removeDepartment = (item) => {
    Toast.confirmDelete(() => {
      dispatch(DeleteDepartment(item._id, () => {
        Toast.success(t("Department deleted successfully"))
      }))
    }, t)
  }

  useEffect(() => {
    dispatch(FetchDepartments())
  }, [dispatch])

  return (
    <section className="flex flex-col grow">
      <div className="flex justify-between items-center pb-6">
        <div className="">
          <h1 className="text-h4 mb-0">{t("Departments")}</h1>
          <p className="mb-0">{t("Manage your Departments")}</p>
        </div>
        <div className="flex items-start gap-2">
          {/* <Button className={"btn btn-dark-outline"}>{t("Export")}</Button> */}
          {/* <Button className={"btn btn-dark-outline"}>{t("Import")}</Button> */}
          <Button className={"btn btn-primary"} onClick={() => setCreate('department')}>{t("Add new department")}</Button>
        </div>
      </div>

      <div className="w-full bg-white p-6 rounded-lg grow">
        <FilterArea title={t("Departments")}
          elements={filterElements}
          filters={filters}
          setFilters={setFilters}
        // filterHandler={filterHandler}
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
          className={'zt-departmentTable'}
        />
      </div>
      {create === "department" && <CreateDepartmentForm department={selected} onClose={() => {
        setCreate("")
        setSelected(null)
      }} />}
      {is_loading && <PageLoader />}
    </section>
  )
}