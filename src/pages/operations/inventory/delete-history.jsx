import { Button, SearchInput, Table, SearchSelect, DropDown, Profile, DisplayDate } from "@/components/elements";
import FilterArea from "@/components/includes/FilterArea";
import { AssignTo, Edit, EyeOn, HandFree, HeadPhone, Led, ReturnTo, ThreeDotsVertical, Trash } from "@/components/svg";
import { FetchDepartments, DeleteDepartment } from "@/store/actions/department.actions";
import Toast from "@/util/toast";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FetchEmployees } from "@/store/actions/employee.actions";
import { useDispatch, useSelector } from "react-redux";
import { FetchAssets, RestoreAsset } from "@/store/actions/asset.actions";

export default function DeleteHistoryPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { is_loading, asset_list } = useSelector((state) => state.asset)
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [filters, setFilters] = useState({
    search: "", fields: ['Model', 'Serial']
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
      multiple: true,
      value: filters.fields,
      list: asset_list.reduce((acc, item) => {
        acc = acc.concat(Object.keys(item.fields))
        return acc
      }, []).map((item) => { return { display: item, value: item } }),
      onChange: (values) => {
        setFilters((prev) => {
          prev = { ...prev }
          prev['fields'] = [...values]
          return prev
        })
      }
    }
  ]

  const headings = [
    { title: t("Asset ID"), col: "assetId", sort: true },
    { title: t("Asset Type"), col: "assetType", sort: true }]
    .concat(filters.fields.map((item) => {
      return { title: item, col: item }
    }))
    .concat([
      { title: t("Deleted By"), col: "deletedBy" },
      { title: t("Deleted At"), col: "deletedAt" },
      { title: t("Actions"), col: "actions" },
    ])
  const rows = asset_list.map((item) => {
    return {
      assetId: item.assetId,
      assetType: item.assetType.name,
      ...item.fields,
      deletedBy: <div className="flex gap-2 justify-center">
        <Profile name={item?.deletedBy?.firstName} />
        <div className="flex flex-col items-start">
          <span>{item?.deletedBy?.firstName} {item?.deletedBy?.lastName}</span>
          <span>{item?.deletedBy?.employeeCode}</span>
        </div>
      </div>,
      deletedAt: <DisplayDate date={item.deletedAt} time={true} />,
      actions: <DropDown icon={<ThreeDotsVertical />}>
        <ul className="zt-themeDropDownList zt-sm gap-4">
          <li className="!p-0" onClick={() => restoreHandler(item._id)}>
            <span><EyeOn /></span>
            <span>Restore</span>
          </li>
        </ul>
      </DropDown>
    }
  })

  const pagination = {
    totalRecords: asset_list.length,
    showPerPage: true,
    prevAction: () => page > 1 && setPage(page - 1),
    clickAction: (value) => setPage(value),
    nextAction: () => setPage(page + 1),
  }


  useEffect(() => {
    dispatch(FetchAssets({ deleted: true }))
  }, [dispatch])

  const restoreHandler = (id) => {
    dispatch(RestoreAsset(id))
  }
  return (
    <section className="flex flex-col grow">
      <div className="flex justify-between pb-6">
        <div className="flex flex-col">
          <h1 className="text-h4 mb-0">{t("Asset Delete History")}</h1>
          <p className="mb-0">{t("View asset delete history here")}</p>
        </div>
      </div>

      <div className="w-full bg-white p-6 rounded-lg grow">
        <FilterArea
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
          className={'zt-assetHistoryTable text-center text-sm'}
        />
      </div>
    </section>
  )
}