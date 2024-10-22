import { CheckBox, Table, ToggleCheck } from '@/components/elements';
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next';

export default function EmployeeFieldApprovalSettingPage() {
    const { t } = useTranslation();
    const [sortCol, setSortCol] = useState(null);
    const [sortDir, setSortDir] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const headings = [
        { title: t(""), col: "sr", check: true },
        { title: t("S#"), col: "srerialNo", },
        { title: t("Field Name"), col: "Name" },
        { title: t("Enable"), col: "Enable" },
        { title: t("On Approval"), col: "Approval" },
        { title: t("Modified On"), col: "ModifiedOn" },
    ];
    const rows = [
        {
            sr: <div className="flex items-center">
                <CheckBox
                    id={`1`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            srerialNo: "1",
            Name: "First Name",
            Enable: <div className='flex justify-center'><ToggleCheck
                id="fistName"
                variant={"themePrimary"}
                disabled={false}
            /> </div>,
            Approval: <div className='flex justify-center'><ToggleCheck
                id="fistNameApproval"
                variant={"themePrimary"}
                disabled={false}
            /> </div>,
            ModifiedOn: <div className="flex justify-end"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
        },
        {
            sr: <div className="flex items-center">
                <CheckBox
                    id={`2`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            srerialNo: "2",
            Name: "Last Name",
            Enable: <div className='flex justify-center'><ToggleCheck
                id="LastName"
                variant={"themePrimary"}
                disabled={false}
            /> </div>,
            Approval: <div className='flex justify-center'><ToggleCheck
                id="LastNameApproval"
                variant={"themePrimary"}
                disabled={false}
            /> </div>,
            ModifiedOn: <div className="flex justify-end"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
        },
        {
            sr: <div className="flex items-center">
                <CheckBox
                    id={`3`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            srerialNo: "3",
            Name: "CNIC",
            Enable: <div className='flex justify-center'><ToggleCheck
                id="CNIC"
                variant={"themePrimary"}
                disabled={false}
            /> </div>,
            Approval: <div className='flex justify-center'><ToggleCheck
                id="CNICApproval"
                variant={"themePrimary"}
                disabled={false}
            /> </div>,
            ModifiedOn: <div className="flex justify-end"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
        },
        {
            sr: <div className="flex items-center">
                <CheckBox
                    id={`4`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            srerialNo: "4",
            Name: "Mobile Number",
            Enable: <div className='flex justify-center'><ToggleCheck
                id="Mobile"
                variant={"themePrimary"}
                disabled={false}
            /> </div>,
            Approval: <div className='flex justify-center'><ToggleCheck
                id="MobileApproval"
                variant={"themePrimary"}
                disabled={false}
            /> </div>,
            ModifiedOn: <div className="flex justify-end"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
        },
        {
            sr: <div className="flex items-center">
                <CheckBox
                    id={`1`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            srerialNo: "5",
            Name: "Blood Group",
            Enable: <div className='flex justify-center'><ToggleCheck
                id="BloodGroup"
                variant={"themePrimary"}
                disabled={false}
            /> </div>,
            Approval: <div className='flex justify-center'><ToggleCheck
                id="BloodGroupApproval"
                variant={"themePrimary"}
                disabled={false}
            /> </div>,
            ModifiedOn: <div className="flex justify-end"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
        },
    ]
    return (
        <section className="flex flex-col grow">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex flex-col pb-6">
                <h1 className="text-h4 mb-0">{t("Employee Field Approval Setting")}</h1>
                {/* <p className="mb-0">{t("Manage your employee settings")}</p> */}
            </div>
            <div className="zt-card grow">
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
                    className={"zt-employeeTable"}
                />
            </div>
        </section>
    )
}