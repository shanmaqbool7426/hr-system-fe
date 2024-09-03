import React, { useState } from 'react';
import Pagination from './pagination';
import { SortEmpty, SortAsc, SortDesc } from "@/components/svg";
import CheckBox from '../CheckBox';
import { useTranslation } from 'react-i18next';

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

    };

    const handleRowSelect = (index) => {

    };

    return (
        <div className='w-full overflow-x-auto min-h-80'>
            <table className={`zt-table ${className}`}>
                <thead>
                    <tr>
                        <th className='flex gap-2 items-center'>
                            {checkbox && <CheckBox
                                size={'sm'}
                                variant={'dark'}
                                id="checkboxSelectAll"
                                name={"checkboxSelectAll"}
                                checked={rows?.length && rows?.length === selected?.length}
                                onChange={handleSelectAll}
                            />}
                            <span>{t("Sr")}</span>
                        </th>
                        {headings?.map((value, index) => (
                            <th key={index}>
                                <div className="flex items-center justify-center whitespace-nowrap">
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
                                    <td className='flex gap-2'>
                                        {checkbox && <CheckBox
                                            size={'sm'}
                                            variant={'dark'}
                                            id={`checkboxRow${index1}`}
                                            name={`checkboxRow${index1}`}
                                            checked={selected.includes(item._id)}
                                            onChange={() => handleRowSelect(index1)}
                                        />}
                                        {perPage ? (page - 1) * perPage + index1 + 1 : index1 + 1}
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
