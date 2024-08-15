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
    page,
    setPage,
    pagination,
    className,
}) {
    const [expandedRows, setExpandedRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
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
        if (selectAll) {
            setSelectedRows([]);
        } else {
            setSelectedRows(rows.map((_, index) => index));
        }
        setSelectAll(!selectAll);
    };

    const handleRowSelect = (index) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter(i => i !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
    };

    return (
        <div className='overflow-auto w-full'>
            <table className={`zt-themeTable ${className}`}>
                <thead>
                    <tr className='rounded-lg bg-themeGrayscale100'>
                        <th className='flex gap-2'>
                            {/* <CheckBox
                                size={'sm'}
                                variant={'dark'}
                                id="checkboxSelectAll"
                                name={"checkboxSelectAll"}
                                checked={selectAll}
                                onChange={handleSelectAll}
                            /> */}
                            <span>{t("Sr#")}</span></th>
                        {headings?.map((value, index) => (
                            <th key={index} className='select-none px-2 py-5'>
                                <div className="flex items-center justify-center whitespace-nowrap">
                                    {value.check ?
                                        <CheckBox
                                            size={'sm'}
                                            variant={'dark'}
                                            labelClass={'text-base leading-none text-themeGrayscale600 font-bold'}
                                            id="checkboxStatus-sm"
                                            name={"checkboxStatus"}
                                            label={value.title}
                                        /> :
                                        <span>{value.title}</span>
                                    }
                                    {value.sort && (
                                        <span className='cursor-pointer' onClick={() => sortHandler(value)}>
                                            {sortCol !== value.col && <SortEmpty />}
                                            {sortCol === value.col && sortDir === 'asc' && <SortAsc />}
                                            {sortCol === value.col && sortDir === 'desc' && <SortDesc />}
                                        </span>
                                    )}
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
                                        {/* <CheckBox
                                            size={'sm'}
                                            variant={'dark'}
                                            id={`checkboxRow${index1}`}
                                            name={`checkboxRow${index1}`}
                                            checked={selectedRows.includes(index1)}
                                            onChange={() => handleRowSelect(index1)}
                                        /> */}
                                        {(page -1) * perPage + index1 + 1}
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
            {!rows?.length && <div className='w-full h-40 flex flex-grow justify-center items-center'>No data found</div>}
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
