import React, { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import { FetchAssetsDetails } from '@/store/actions/asset.actions';
import { DisplayDate } from '@/components/elements';
import IconCompnent from "@/components/forms/organization/inventory/IconCompnent"


export default function AssetDetailCard({ assetId = null }) {
    const { t } = useTranslation()
    const { asset_details } = useSelector((state) => state.asset)
    const router = useRouter()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!assetId) assetId = router.query.id
        if (assetId) dispatch(FetchAssetsDetails(assetId))
    }, [router, dispatch])

    return (asset_details &&
        <div className='zt-employeeCard grow'>
            <div className='zt--employeeCardHead'>
                <div className='flex gap-4 items-center'>
                    <IconCompnent icon={asset_details?.assetType?.icon} />
                    <h3>{asset_details.assetType.name}</h3>
                    <span className='bg-themeGrayscale700 text-white rounded-md px-1.5 py-0.5'>{asset_details.status}</span>
                </div>
            </div>

            <ul className='zt--employeeCardBody !grid !grid-cols-2 !mb-8'>
                <li>
                    <span>{t("Asset Code")}</span>
                    <strong>{asset_details.assetId}</strong>
                </li>
                <li>
                    <span>{t("Category")}</span>
                    <strong>{asset_details.assetType.name}</strong>
                </li>
                <li>
                    <span>{t("Purchase Date")}</span>
                    <strong><DisplayDate date={asset_details.purchaseDate} /></strong>
                </li>
                <li>
                    <span>{t("Warranty Expiry")}</span>
                    <strong><DisplayDate date={asset_details.warrantyExpiry} /></strong>
                </li>
                <li>
                    <span>{t("Supplier")}</span>
                    <strong>{asset_details.vendor}</strong>
                </li>
                <li>
                    <span>{t("Purchase Amount")}</span>
                    <strong>{asset_details.cost.toFixed(2)}</strong>
                </li>

                {
                    Object.entries(asset_details.fields).map(([key, value], index) => (
                        <li key={index}>
                            <span>{key}</span>
                            <strong>{value}</strong>
                        </li>
                    ))
                }


            </ul>

            {/* <h4 className='text-h5'>{t('Asset Image Gallery')}</h4>
            <ul className='zt--employeeCardBody !flex-row'>
                <li><Image src={'/assets/images/asset/img-01.png'} width={184} height={120} blurDataURL={'/assets/images/asset/img-01.png'} alt={'image description'} /></li>
                <li><Image src={'/assets/images/asset/img-02.png'} width={184} height={120} blurDataURL={'/assets/images/asset/img-02.png'} alt={'image description'} /></li>
                <li><Image src={'/assets/images/asset/img-03.png'} width={184} height={120} blurDataURL={'/assets/images/asset/img-03.png'} alt={'image description'} /></li>
                <li><Image src={'/assets/images/asset/img-04.png'} width={184} height={120} blurDataURL={'/assets/images/asset/img-04.png'} alt={'image description'} /></li>
                <li><Image src={'/assets/images/asset/img-05.png'} width={184} height={120} blurDataURL={'/assets/images/asset/img-05.png'} alt={'image description'} /></li>
            </ul> */}
        </div>
    )
}