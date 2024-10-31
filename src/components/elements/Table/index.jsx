import React, { useState } from 'react';
import Pagination from './pagination';
import { SortEmpty, SortAsc, SortDesc } from "@/components/svg";
import CheckBox from '../CheckBox';
import { useTranslation } from 'next-i18next';
// Table component parameters:
// - headings: Array of objects, the column headings for the table
//   - Each heading object contains:
//     - col: String, the column name
//     - title: String, the column label to display
//     - sort: Boolean, whether to allow sorting on this column
//     - className: String, additional classes for the column
// - rows: Array of objects, the data to be displayed in the table
// - sortCol: String, the column to sort by
// - sortDir: String, the direction to sort in (asc or desc)
// - setSortCol: Function, to set the column to sort by
// - setSortDir: Function, to set the direction to sort in
// - perPage: Number, the number of rows to display per page
// - setPerPage: Function, to set the number of rows to display per page
// - page: Number, the current page number
// - setPage: Function, to set the current page number
// - pagination: Boolean, whether to display pagination or not
// - className: String, additional classes for the table
// - checkbox: Boolean, whether to display a checkbox column or not
// - selected: Array of strings, the selected rows
// - setSelected: Function, to set the selected rows


export default function Table({
    headings,
    rows,
    sortCol,
    sortDir,
    setSortCol,
    setSortDir,
    perPage,
    setPerPage,
    page = 1,
    setPage,
    pagination,
    className,
    checkbox = true,
    selected = [],
    setSelected = () => { }
}) {
    const [expandedRows, setExpandedRows] = useState([]);
    const { t } = useTranslation();

    const sortHandler = (heading) => {
        if (!sortDir || sortCol !== heading.col) {
            setSortDir('asc');
        } else if (sortDir === 'asc') {
            setSortDir('desc');
        } else if (sortDir === 'desc') {
            setSortDir('asc');
        }
        setSortCol(heading.col);
    };

    const toggleExpandRow = (index) => {
        setExpandedRows(expandedRows.includes(index)
            ? expandedRows.filter(i => i !== index)
            : [...expandedRows, index]
        );
    };

    const handleSelectAll = () => {
        if (rows?.length && rows?.length === selected?.length) {
            setSelected([])
        } else {
            setSelected(rows?.reduce((acc, item) => [...acc, item._id], []))
        }
    };

    const handleRowSelect = (id) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(i => i !== id))
        } else {
            setSelected([...selected, id])
        }
    };

    return (
        <div className='w-full overflow-x-auto min-h-80'>
            <table className={`zt-table ${className}`}>
                <thead>
                    <tr>
                        <th>
                            <div className='flex gap-2 items-center'>
                                {checkbox && <CheckBox
                                    size={'sm'}
                                    variant={'dark'}
                                    id="checkboxSelectAll"
                                    name={"checkboxSelectAll"}
                                    checked={rows?.length && rows?.length === selected?.length}
                                    onChange={handleSelectAll}
                                />}
                                <span>{t("Sr")}</span>
                            </div>
                        </th>
                        {headings?.map((value, index) => (
                            <th key={index}>
                                <div className={`flex items-center justify-center whitespace-nowrap ${value?.className || ""}`}>
                                    <span>{value.title}</span>
                                    {value.sort && <span className='cursor-pointer' onClick={() => sortHandler(value)}>
                                        {sortCol !== value.col && <SortEmpty />}
                                        {sortCol === value.col && sortDir === 'asc' && <SortAsc />}
                                        {sortCol === value.col && sortDir === 'desc' && <SortDesc />}
                                    </span>}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                {rows?.length > 0 && (
                    <tbody>
                        {rows?.map((item, index1) => (
                            <React.Fragment key={index1}>
                                <tr>
                                    <td>
                                        <div className='flex items-center gap-2'>
                                            {checkbox && <CheckBox
                                                size={'sm'}
                                                variant={'dark'}
                                                id={`checkboxRow${item._id}`}
                                                name={`checkboxRow${item._id}`}
                                                checked={selected.includes(item._id)}
                                                onChange={() => handleRowSelect(item._id)}
                                            />}
                                            {perPage ? (page - 1) * perPage + index1 + 1 : index1 + 1}
                                        </div>
                                    </td>
                                    {headings.map((value, index2) => (
                                        <td className={value?.className} key={index2}>
                                            {value.col === 'view' ? (
                                                <button onClick={() => toggleExpandRow(index1)}>
                                                    {item[value.col]}
                                                </button>
                                            ) : (
                                                item[value.col]
                                            )}
                                        </td>
                                    ))}
                                </tr>
                                {expandedRows.includes(index1) && (
                                    <tr className="disclosure-row">
                                        <td colSpan={headings.length + 2}>
                                            {/* Add your disclosure content here */}
                                            <div className="">
                                                {item.discloureContent}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                )}
            </table>
            {!rows?.length && <div className='w-full h-40 flex flex-grow justify-center items-center'>{t("No data found")}</div>}
            {rows?.length > 0 && pagination && (
                <Pagination
                    pagination={pagination}
                    currentLength={rows?.length}
                    perPage={perPage}
                    setPerPage={setPerPage}
                    page={page}
                    setPage={setPage}
                />
            )}
        </div>
    );
};
