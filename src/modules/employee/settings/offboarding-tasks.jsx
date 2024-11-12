import { Button, CheckBox, Input, DropDown } from '@/components/elements';
import { useTranslation } from 'next-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { CreateOffboardingTask, UpdateOffboardingTask, DeleteOffboardingTask } from '@/store/actions/onboarding-offboarding.actions';
import Toast from '@/util/toast';
import { Edit, ThreeDotsVertical, Trash } from '@/components/svg';

export default function OffboardingTasksList() {
    const { exit_clearance_tasks } = useSelector((state) => state.onboardingoffboarding)
    const { t } = useTranslation()
    const [create, setCreate] = useState(false)
    const [edit, setEdit] = useState(null)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: edit?.name || ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required(t("Task is required"))
        }),
        onSubmit: () => {
            if (edit) {
                dispatch(UpdateOffboardingTask(edit._id, formik.values, onCompleted))
            } else {
                dispatch(CreateOffboardingTask(formik.values, onCompleted))
            }
        },
        enableReinitialize: true
    })
    const onCompleted = () => {
        formik.resetForm()
        setCreate(false)
        setEdit(null)
        Toast.success(edit ? t("Task updated successfully") : t("Task created successfully"))
    }
    const toggleActive = (id, active) => {
        dispatch(UpdateOffboardingTask(id, { active: !active }, () => {
            Toast.success(t("Task updated successfully"))
        }))
    }
    const onDelete = (id) => {
        Toast.confirmDelete(() => dispatch(DeleteOffboardingTask(id, () => {
            Toast.success(t("Task deleted successfully"))
        })), t)
    }
    return <div className='zt-card'>
        <div className="flex justify-between items-center">
            <h4>{t("Exit Clearance Tasks")}</h4>

            {create ?
                <div className='flex flex-row-reverse gap-2'>
                    <Button variant='success' size='sm' value={t("Save")} onClick={formik.handleSubmit} disabled={!formik.isValid} />
                    <Button size='sm' value={t("Cancel")} onClick={() => {
                        setCreate(false)
                        setEdit(null)
                    }} />
                </div> :
                <Button variant='primary' size='sm' value={t("Add")} onClick={() => {
                    setCreate(true)
                    setEdit(null)
                }} />
            }
        </div>
        {create && <form onSubmit={formik.handleSubmit}>
            <Input name='name' value={formik.values.name} formik={formik} />
        </form>}
        <table className='zt-table mt-2'>
            <thead>
                <tr>
                    <th className='text-left'>{t("Task")}</th>
                    <th className='text-right'>{t("Active")}</th>
                </tr>
            </thead>
            <tbody>
                {exit_clearance_tasks.map((task, i) => (
                    <tr key={i}>
                        <td>{task.name}</td>
                        <td>
                            <div className="flex justify-end">
                                <CheckBox id={i} checked={task.active} onChange={() => toggleActive(task._id, task.active)} />
                                <DropDown icon={<ThreeDotsVertical />}>
                                    <ul className="zt-themeDropDownList w-32 gap-4">
                                        <li className="!p-0" onClick={() => {
                                            setEdit(task)
                                            setCreate(true)
                                        }}>
                                            <a href="#" className="flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccess">
                                                <span>
                                                    <Edit />
                                                </span>
                                                <span>{t("Edit")}</span>
                                            </a>
                                        </li>
                                        <li className="!p-0" onClick={() => onDelete(task._id)}>
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