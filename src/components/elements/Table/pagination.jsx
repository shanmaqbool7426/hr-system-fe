import { ChevronLeft, ChevronRight } from '@/components/svg';
import { Select } from '@/components/elements';
import React from 'react';

export default function Pagination({
    perPage,
    setPerPage,
    page,
    setPage,
    pagination,
    currentLength
}) {
    const totalPages = Math.ceil(pagination.totalRecords / perPage);
    const pages = Array.from({ length: totalPages }, (_, index) => 1 + index);
    return (
        <div className="flex justify-between items-center">
            <div className="">
                {totalPages > 1 &&
                    <ul className="m-0 p-0 flex items-center gap-5">
                        <li>
                            <button className={`w-[32px] h-[32px] border border-gray-200 flex items-center justify-center rounded-8 ${page === 1 ? 'text-gray-500' : ''} `}
                                disabled={page === 1} type="button"
                                onClick={() => pagination.prevAction()}>

                                <ChevronLeft />
                            </button>
                        </li>
                        {pages.length < 6 &&
                            pages.map((page) => (
                                <li key={`pagination-${page}`}>
                                    <button className={`w-[32px] h-[32px] flex items-center justify-center rounded-10 text-gray-900 font-semibold text-xs ${page === page ? 'bg-gray-100' : 'dark:text-white'}`}
                                        type="button" onClick={() => pagination.clickAction(page)}
                                    >{page}</button>
                                </li>
                            ))
                        }

                        {pages.length > 6 &&
                            <>
                                {pages.slice(0, 2).map((page) => (
                                    <li key={`pagination-${page}`}>
                                        <button className={`w-[32px] h-[32px] flex items-center justify-center rounded-10 text-gray-900 font-semibold text-xs ${page === page ? 'bg-gray-100' : 'dark:text-white'}`}
                                            type="button" onClick={() => pagination.clickAction(page)}>{page}</button>
                                    </li>
                                ))}

                                {page > 1 && page < (totalPages - 1) &&
                                    <li>
                                        <button className="w-[32px] h-[32px] flex items-center justify-center rounded-10 text-gray-900 dark:text-white font-semibold text-xs" type="button">...</button>
                                    </li>
                                }

                                {page > 1 && page < (totalPages - 1) &&
                                    pages.slice(page - (page > 2 ? 2 : 0), page + (page === (totalPages - 2) ? 0 : (page > 2 ? 1 : 3))).map((page) => (
                                        <li key={`pagination-${page}`}>
                                            <button className={`w-[32px] h-[32px] flex items-center justify-center rounded-10 text-gray-900 font-semibold text-xs ${page === page ? 'bg-gray-100' : 'dark:text-white'}`}
                                                type="button" onClick={() => pagination.clickAction(page)}>{page}</button>
                                        </li>
                                    ))
                                }

                                <li>
                                    <button className="w-[32px] h-[32px] flex items-center justify-center rounded-10 text-gray-900 dark:text-white font-semibold text-xs" type="button">...</button>
                                </li>

                                {
                                    pages.slice(-2).map((page) => (
                                        <li key={`pagination-${page}`}>
                                            <button className={`w-[32px] h-[32px] flex items-center justify-center rounded-10 text-gray-900 font-semibold text-xs ${page === page ? 'bg-gray-100' : 'dark:text-white'}`}
                                                type="button" onClick={() => pagination.clickAction(page)}>{page}</button>
                                        </li>
                                    ))
                                }
                            </>
                        }
                        <li>
                            <button className={`w-[32px] h-[32px] border border-gray-200 flex items-center justify-center rounded-8 ${page === totalPages ? 'text-gray-500' : ''} `}
                                disabled={page === totalPages} type="button"
                                onClick={() => pagination.nextAction()}>
                                <ChevronRight width={15} height={18} />
                            </button>
                        </li>
                    </ul>
                }
            </div>

            {pagination.totalRecords > 10 && <div className={`flex items-center gap-5`}>
                <span className={`block text-gray-600 text-xs font-medium`}>
                    Showing {((page - 1) * perPage) + 1} to {((page - 1) * perPage) + currentLength} of {pagination.totalRecords} entries
                </span>
                {pagination?.showPerPage &&
                    <div className='w-[120px]'>
                        <Select
                            onChnage={(event) => {
                                setPerPage(event.target.value)
                                setPage(1)
                            }}
                            value={perPage}
                            options={[
                                10,
                                20,
                                50,
                                100
                            ]} />
                    </div>
                }
            </div>}
        </div>
    );
};

Pagination.defaultProps = {
    perPage: 10
}