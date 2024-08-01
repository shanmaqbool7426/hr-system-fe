import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import AddTaskForm from '@/components/forms/projects/addTask'
import Toast from "@/util/toast";
import { useState } from 'react'
import { Button, DetailPanel } from '@/components/elements'
import DiscussionForm from "./discussion";
import { UpdateRaiseIssue } from '@/store/actions/task-raise-issue.actions';
import { FetchReportedTasks } from '@/store/actions/task.actions';

export default function ResolveIssuePage({ onClose, object}) {
    const { t } = useTranslation();
    const [task, setTask] = useState(false)
    const [discussion, setDiscussion] = useState(false)
    const dispatch = useDispatch();

    const resolveHandler = async () => {
        if (Array.isArray(object?.issueRaised)) {
            const payload = { issueResolve: true };
            
            await Promise.all(object.issueRaised.map(async (issue) => {
                const id = issue._id;
                await new Promise((resolve) => {
                    dispatch(UpdateRaiseIssue(id, payload, () => {
                        resolve();
                    }));
                });
            }));
    
            Toast.success(t("Issue resolved successfully"));
            dispatch(FetchReportedTasks());
            onClose();
        } else {
            Toast.error(t("No issues found to resolve"));
        }
    };
    
   
    return (
        <>
            <DetailPanel>
                <div className="zt-customScrollbar overflow-y-auto px-6 h-[calc(100dvh_-_120px)]">
                <h4>{t('Reported Issue detail')}</h4>
                <div className='text-left'>
                {object?.issueRaised?.map((issue, index) => (
                    <div key={index} className="mb-4">
                        <h5>{t('Title')}</h5>
                        <p>{issue.name}</p>
                        <h5>{t('Description')}</h5>
                        <p>{issue.description}</p>
                    </div>
                ))}
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
