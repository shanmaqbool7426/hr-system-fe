import BaseForm from "../BaseForm";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployee, UpdateEmployee } from "@/store/actions/employee.actions";
import AddTaskForm from '@/components/forms/projects/addTask'
import Toast from "@/util/toast";
import { useState } from 'react'
import { Button, Input, Textarea } from '@/components/elements'
import DiscussionForm from "./discussion";

export default function CreateReportedIssueForm({ onClose, object }) {
    const { t } = useTranslation();
    const [board, setBoard] = useState(false)
    const [discussion, setDiscussion] = useState(false)
    const dispatch = useDispatch();
    const { is_loading } = useSelector((state) => state.employee);
    const formik = useFormik({
        initialValues: {
            warningTitle: "",
            description: "",
        },
        validationSchema: Yup.object().shape({
            warningTitle: Yup.string().required(t('Warning Title Required')),
            description: Yup.string().required(t('description Required')),
        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateEmployee(employee._id, values, onCompleted)) : dispatch(CreateEmployee(values, onCompleted));
        }
    });

    const onCompleted = () => {
        Toast.success(object ? t("Employee updated successfully") : t("Employee created successfully"));
        onClose();
    };

    return (
        <>
            <BaseForm title={object ? "Reported Issue detail" : "Reported Issue detail"} formik={formik} onClose={onClose} is_loading={is_loading} >
                <div className='col-span-2 grid grid-cols-2 gap-6'>
                    <Input label={'Title'} placeholder='Time need to extend' className={'cursor-not-allowed'} />
                    <div className="flex gap-4">
                        <Button onClick={() => { setBoard(true) }} className={'btn btn-primary h-max w-max self-end'}>{t("Edit Task")} </Button>
                        <Button onClick={() => { setDiscussion(true) }} className={'btn btn-primary h-max w-max self-end'}>{t("Discussion")} </Button>
                    </div>
                    <Textarea className={'cursor-not-allowed'} containerClass={'col-span-2'} label={'Description'} placeholder='This task lengthy its required more time for completion due to its complexity.' />
                </div>
            </BaseForm>
            {discussion && <DiscussionForm back={true}
                onClose={() => { setDiscussion(false) }}
            />}
            {board && <AddTaskForm back={true}
                object={true}
                onClose={() => { setBoard(false) }}
            />}
        </>
    );
}
