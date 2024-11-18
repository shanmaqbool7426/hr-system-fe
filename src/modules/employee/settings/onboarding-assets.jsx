import { Button, CheckBox, SearchSelect, DropDown } from '@/components/elements';
import { useTranslation } from 'next-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { CreateOnboardingAsset, UpdateOnboardingAsset, DeleteOnboardingAsset } from '@/store/actions/onboarding-offboarding.actions';
import Toast from '@/util/toast';
import { Edit, ThreeDotsVertical, Trash } from '@/components/svg';

export default function OnboardingAssetsList() {
    const { onboarding_assets } = useSelector((state) => state.onboardingoffboarding)
    const { customfield_list } = useSelector((state) => state.customfield)
    const { t } = useTranslation()
    const [create, setCreate] = useState(false)
    const [edit, setEdit] = useState(null)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            assetType: ""
        },
        validationSchema: Yup.object({
            assetType: Yup.string().required(t("Asset type is required"))
        }),
        onSubmit: () => {
            if (edit) {
                dispatch(UpdateOnboardingAsset(edit._id, formik.values, onCompleted))
            } else {
                if (onboarding_assets.some((asset) => asset.assetType._id.toString() === formik.values.assetType.toString())) {
                    Toast.error(t("Asset type already added"))
                    return
                }
                dispatch(CreateOnboardingAsset(formik.values, onCompleted))
            }
        },
        enableReinitialize: true
    })
    const onCompleted = () => {
        Toast.success(edit ? t("Asset updated successfully") : t("Asset created successfully"))
        cancelHandler()
    }
    const toggleActive = (id, active) => {
        dispatch(UpdateOnboardingAsset(id, { active: !active }, () => {
            Toast.success(t("Asset updated successfully"))
        }))
    }
    const onDelete = (id) => {
        Toast.confirmDelete(() => dispatch(DeleteOnboardingAsset(id, () => {
            Toast.success(t("Asset deleted successfully"))
        })), t)
    }

    const cancelHandler = () => {
        setCreate(false)
        setEdit(null)
        formik.resetForm()
    }

    return <div className='zt-card'>
        <div className="flex justify-between items-center">
            <h4>{t("Onboarding Assets")}</h4>
            {create ?
                <div className='flex flex-row-reverse gap-2'>
                    <Button variant='success' size='sm' value={t("Save")} onClick={formik.handleSubmit} disabled={!formik.isValid} />
                    <Button size='sm' value={t("Cancel")} onClick={cancelHandler} />
                </div> :
                <Button variant='primary' size='sm' value={t("Add")} onClick={() => {
                    setCreate(true)
                    setEdit(null)
                }} />
            }
        </div>
        {create && <form onSubmit={formik.handleSubmit}>
            <SearchSelect name='assetType'
                value={formik.values.assetType}
                list={customfield_list.filter((item) => item.type === "asset_type")
                    .map((item) => ({ display: item.name, value: item._id }))}
                onChange={(value) => formik.setFieldValue("assetType", value)}
                error={formik.errors.assetType}
            />
        </form>}
        <table className='zt-table mt-2'>
            <thead>
                <tr>
                    <th className='text-left'>{t("Asset Type")}</th>
                    <th className='text-right'>{t("Active")}</th>
                </tr>
            </thead>
            <tbody>
                {onboarding_assets.map((asset, i) => (
                    <tr key={i}>
                        <td>{asset.assetType.name}</td>
                        <td>
                            <div className="flex justify-end">
                                <CheckBox id={i} checked={asset.active} onChange={() => toggleActive(asset._id, asset.active)} />
                                <DropDown icon={<ThreeDotsVertical />}>
                                    <ul className="zt-themeDropDownList w-32 gap-4">
                                        <li className="!p-0" onClick={() => {
                                            setEdit(asset)
                                            formik.setFieldValue("assetType", asset.assetType._id)
                                            setCreate(true)
                                        }}>
                                            <a href="#" className="flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccess">
                                                <span>
                                                    <Edit />
                                                </span>
                                                <span>{t("Edit")}</span>
                                            </a>
                                        </li>
                                        <li className="!p-0" onClick={() => onDelete(asset._id)}>
                                            <a href="#" className="flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger">
                                                <span>
                                                    <Trash />
                                                </span>
                                                <span>{t("Delete")}</span>
                                            </a>
                                        </li>
                                    </ul>
                                </DropDown>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}