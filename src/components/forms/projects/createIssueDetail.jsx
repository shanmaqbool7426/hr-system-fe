import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import AddTaskForm from '@/components/forms/projects/addTask'
import Toast from "@/util/toast";
import { useEffect, useState } from 'react'
import { Button, DetailPanel } from '@/components/elements'
import DiscussionForm from "./discussion";

export default function CreateReportedIssueForm({ onClose, object}) {
    const { t } = useTranslation();
    const [task, setTask] = useState(false)
    const [discussion, setDiscussion] = useState(false)
    const dispatch = useDispatch();

    const resolveHandler = async()=>{
        onClose()
    }
   
    return (
        <>
            <DetailPanel>
                <div className="zt-customScrollbar overflow-y-auto px-6 h-[calc(100dvh_-_185px)]">
                <h4>{t('Reported Issue detail')}</h4>
                <div className='text-left'>
                    <h5>{t('Title')}</h5>
                    <p> {object?.raiseIssue?.name} </p>
                    <h5>{t('Description')}</h5>
                    <p> {object?.raiseIssue?.description} </p>
                </div>
                </div>
                <div className="zt-btns">
                    <Button type="button" value={t("Cancel")} className={"btn w-full btn-primary-outline"} onClick={onClose} />
                <Button onClick={() => { setTask(true) }} className={'btn w-full btn-primary'}>{t("Edit Task")} </Button>
                    <Button type="button" onClick={resolveHandler} value={t("Resolved")} className={"btn w-full btn-success"}  />
                </div>
            </DetailPanel>
            {discussion && <DiscussionForm back={true}
                onClose={() => { setDiscussion(false) }}
            />}
            {task && <AddTaskForm back={true}
                object={object}
                onClose={() => { setTask(false) }}
            />}
        </>
    );
}
