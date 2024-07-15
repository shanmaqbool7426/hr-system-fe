import { Button } from '@/components/elements';
import AddTemplateForm from '@/components/forms/organization/setting/CreatTemplate';
import { Edit, Trash } from '@/components/svg';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

export const CardTemplate = () => {
    const { t } = useTranslation();
    const [add, setAdd] = useState(false)
    return (
        <div className='zt-card'>
            <div className="flex justify-between pb-6">
                <h2 className="text-h4 mb-0">{t("Card Template")}</h2>
                <Button onClick={() => { setAdd(true) }} className={'btn-dark'}>{t("Add New Template")}</Button>
            </div>
            <div className='flex flex-col gap-2'>
                {['Employee Card', 'Management Card', 'Admiration Card'].map((ele, i) => (
                    <div key={i} className='flex w-full items-center justify-between p-4 border rounded-lg'>
                        <span className='font-medium'>{ele}</span>
                        <div className='flex gap-2'>
                            <Button variant={"light-primary"} className={'!p-2'}><Edit className={'h-4 w-4'} /></Button>
                            <Button variant={"light-danger"} className={'!p-2'}><Trash className={'h-4 w-4'} /></Button>
                        </div>
                    </div>
                ))}
            </div>
            {add && <AddTemplateForm
                object={add}
                onClose={() => { setAdd(false) }}
            />}
        </div>
    )
}
