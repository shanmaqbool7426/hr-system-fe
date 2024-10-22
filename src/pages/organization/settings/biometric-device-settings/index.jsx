import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'; 
import { CheckBox, Input, Table } from '@/components/elements';
import DisclosureComponent from '@/components/elements/Disclosure'

export default function OrganizationBioMetricDeviceSettingPage() {
    const { t } = useTranslation();
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)

    const headings = [
        { title: t("IP Address"), col: "IPAddress", check: true },
        { title: t("Port Number"), col: "PortNumber" },
        { title: t("Device Type"), col: "DeviceType" },
        { title: t("Device Password"), col: "DevicePassword" },
        { title: t("Last Sync Date"), col: "LastSyncDate" },
    ]

    const rows = [,
        {
            IPAddress: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={`1   103.177.241.98`}
            />,
            PortNumber: '7734',
            DeviceType: '7734',
            DevicePassword: '-',
            LastSyncDate: '22 March 2024',
        },
        {
            IPAddress: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={`1   103.177.241.98`}
            />,
            PortNumber: '7734',
            DeviceType: '7734',
            DevicePassword: '-',
            LastSyncDate: '22 March 2024',
        },
    ]
    return (
        <section className="flex flex-col grow relative">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex justify-between pb-6">
                <h1 className="text-h4 mb-0">{t("Organization Settings")}</h1>
            </div>
            <div className='zt-card'>
                <div className="flex justify-between pb-6">
                    <h2 className="text-h4 mb-0">{t("Biometric Device Settings")}</h2>
                </div>
                <DisclosureComponent disclosureTitle={'Token Settings'} defaultOpen={true}>
                    <div className='grid grid-cols-2 gap-4'>
                        <Input
                            type={'text'}
                            name={'UserName'}
                            label={t('User Name')}
                            placeholder={t('Admin')}
                            containerClass='!gap-2'
                        />
                        <Input
                            type={'password'}
                            name={'Password'}
                            label={t('Password')}
                            containerClass='!gap-2'
                            className={'w-full'}
                        />
                        <Input
                            type={'text'}
                            name={'CompanyToken'}
                            label={t('Company Token')}
                            placeholder={t('Zaffreerp@com')}
                            containerClass='!gap-2'
                        />
                        <Input
                            type={'text'}
                            name={'ClientAPI'}
                            label={t('Client API')}
                            placeholder={t('https://jaleel.net')}
                            containerClass='!gap-2'
                        />
                    </div>
                </DisclosureComponent>
                <h3 className='text-lg font-bold mb-4'>{t("Manage Devices")}</h3>
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
                    className={'zt-employeeTable zt-organizationsTable'}
                />
            </div>
        </section>
    )
}