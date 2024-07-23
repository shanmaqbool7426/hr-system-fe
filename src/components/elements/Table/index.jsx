import React, { useState } from 'react';
import Pagination from './pagination';
import { SortEmpty, SortAsc, SortDesc } from "@/components/svg";
import CheckBox from '../CheckBox';

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
    allChecked,
    handleCheckAll
}) {
    const [expandedRows, setExpandedRows] = useState([]);

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

    return (
        <>
            <table className={`zt-themeTable ${className}`}>
                <thead>
                    <tr className='rounded-lg bg-themeGrayscale100'>
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
                                            // size={'sm'}
                                            // variant={'dark'}
                                            // labelClass={'text-base leading-none text-themeGrayscale600 font-bold'}
                                            // id="checkboxStatus-sm"
                                            // name={"checkboxStatus"}
                                            // label={value.title}
                                            // checked={allChecked}
                                            // onChange={(e) => handleCheckAll(e.target.checked)}
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
                                        <td colSpan={headings.length}>
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
        </>
    );
};
