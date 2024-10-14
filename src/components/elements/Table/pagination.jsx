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
                            <button className={`zt-pagination-btn ${page === 1 ? 'disabled' : ''} `}
                                disabled={page === 1} type="button"
                                onClick={() => pagination.prevAction()}>
                                <ChevronLeft className={"w-3 h-3"} />
                            </button>
                        </li>
                        {pages.length < 6 &&
                            pages.map((item) => (
                                <li key={`pagination-${item}`}>
                                    <button className={`zt-pagination-btn ${item === page ? 'active' : ''}`}
                                        type="button" onClick={() => pagination.clickAction(item)}
                                    >{item}</button>
                                </li>
                            ))
                        }

                        {pages.length > 6 &&
                            <>
                                {pages.slice(0, 2).map((item) => (
                                    <li key={`pagination-${item}`}>
                                        <button className={`zt-pagination-btn ${item === page ? 'active' : ''}`}
                                            type="button" onClick={() => pagination.clickAction(item)}>{item}</button>
                                    </li>
                                ))}

                                {page > 1 && page < (totalPages - 1) &&
                                    <li>
                                        <button className="zt-pagination-btn" type="button"><span className='pb-2'>...</span></button>
                                    </li>
                                }

                                {page > 1 && page < (totalPages - 1) &&
                                    pages.slice(page - (page > 2 ? 2 : 0), page + (page === (totalPages - 2) ? 0 : (page > 2 ? 1 : 3))).map((item) => (
                                        <li key={`pagination-${item}`}>
                                            <button className={`zt-pagination-btn ${item === page ? 'active' : ''}`}
                                                type="button" onClick={() => pagination.clickAction(item)}>{item}</button>
                                        </li>
                                    ))
                                }

                                <li>
                                    <button className="zt-pagination-btn" type="button"><span className='pb-2'>...</span></button>
                                </li>

                                {
                                    pages.slice(-3).map((item) => (
                                        <li key={`pagination-${item}`}>
                                            <button className={`zt-pagination-btn ${item === page ? 'active' : ''}`}
                                                type="button" onClick={() => pagination.clickAction(item)}>{item}</button>
                                        </li>
                                    ))
                                }
                            </>
                        }
                        <li>
                            <button className={`zt-pagination-btn ${page === totalPages ? 'disabled' : ''} `}
                                disabled={page === totalPages} type="button"
                                onClick={() => pagination.nextAction()}>
                                <ChevronLeft className={"rotate-180 w-3 h-3"} />
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