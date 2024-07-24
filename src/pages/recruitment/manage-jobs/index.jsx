import { useTranslation } from "next-i18next";
import ls from 'localstorage-slim';
import { Button, DropDown, Table } from "@/components/elements";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Applicants, Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import AddJob from "@/components/forms/organization/jobs/AddJob";
import { fetchJobs } from "@/store/actions/job.actions";

const user = ls?.get('auth_user', { decrypt: true });

export default function ManageJobsPage() {
    const { t } = useTranslation();
    const [create, setCreate] = useState(false);
    const [sortCol, setSortCol] = useState(null);
    const [sortDir, setSortDir] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const dispatch = useDispatch();
    const { jobs, loading, error } = useSelector((state) => state.job);

    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    useEffect(() => {
        if (jobs && jobs.jobs) {
            console.log('Fetched Data:', jobs.jobs);
        } else {
            console.log('Jobs or jobs.jobs is undefined', jobs);
        }
    }, [jobs]);

    const headings = [
        { title: t("Job Title"), col: "JobTitle" },
        { title: t("Department"), col: "Department" },
        { title: t("Start Date"), col: "StartDate" },
        { title: t("Expire Date"), col: "ExpireDate" },
		{ title: t("Job Types"), col: "JobTypes" },
        { title: t("Status"), col: "Status" },
		{ title: t("Applicant"), col: "Applicant" },
        { title: t("Action"), col: "action" }
    ];

    const rows = jobs && jobs.jobs ? jobs.jobs.map(job => ({
        JobTitle: job.jobTitle,
        Department: job.department ,
        StartDate: job.startDate ? new Date(job.startDate).toLocaleDateString() : 'N/A',
        ExpireDate: job.expireDate ? new Date(job.expireDate).toLocaleDateString() : 'N/A',
        JobTypes: <span className="zt-tag zt-tag-success !rounded-lg">{t(job.jobType)}</span>,
        Status: <span className="zt-tag zt-tag-danger !rounded-lg">{t(job.status)}</span>,
		Applicants:<Button type="button" variant={'purple'} className={'!py-1 !px-4'}>
		{t('3 Candidates')}
	</Button>,
        action: (
            <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4">
                    <li className="!p-0">
                        <a onClick={() => { setEdit(true); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            console.confirmDelete(() => {
                                dispatch(DeleteCustomfield(job._id, () => {
                                    console.success(t("Asset Type deleted successfully"))
                                }))
                            }, t);
                        }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        )
    })) : [];

    return (
        <section className="flex flex-col grow">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex justify-between pb-6">
                <div className="flex flex-col">
                    <h1 className="text-h4 mb-0">{t("Recruitment")}</h1>
                </div>
                <div className="flex items-start gap-2">
                    <Button onClick={() => { setCreate(true) }} className={"btn btn-dark"}>{t("Add New Job")}</Button>
                </div>
            </div>
            <div className="zt-card grow">
                <h2 className="text-lg">{t("Jobs List")}</h2>
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
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
                        className={'zt-employeeTable zt-recruitmentTable'}
                    />
                )}
            </div>
            {create && <AddJob onClose={() => { setCreate(false) }} />}
        </section>
    );
}
