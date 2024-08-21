import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { useDispatch, useSelector } from 'react-redux';
import { CreateProject, UpdateProject } from "@/store/actions/project.actions";
import { Button, Datepicker, Input, SearchSelect, TextEditor, ToggleCheck } from '@/components/elements';
import { useState } from 'react';
import Radio from '@/components/elements/Radio';
import { Employees, HamburgerMenu, LocationIcon, NotificationBell } from '@/components/svg';

export default function CreatScheduleForm({ onClose, object, }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading } = useSelector(state => state.project)
    const [selectedDays, setSelectedDays] = useState([]);
    const [leaveType, setLeaveType] = useState([]);

    const daysOfWeek = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

    const handleDayChange = (day) => {
        setSelectedDays((prevSelectedDays) =>
            prevSelectedDays.includes(day)
                ? prevSelectedDays.filter((d) => d !== day)
                : [...prevSelectedDays, day]
        );
    };
    const formik = useFormik({
        initialValues: {
            fromDate: object?.fromDate || "",
            fromTime: object?.fromTime || "",
            toDate: object?.toDate || "",
            toTime: object?.toTime || "",
            repeatDay: object?.repeatDay || "",
            reapeatDuration: object?.reapeatDuration || "",
            repeatEvent: object?.repeatEvent || false,

        },
        validationSchema: Yup.object().shape({
            fromDate: Yup.string().required(t('From Date is required')),
            fromTime: Yup.string().required(t('From Time is required')),
            toDate: Yup.string().required(t('To Date is required')),
            toTime: Yup.string().required(t('To Time is required')),
            repeatDay: Yup.string().required(t('Repeat Day is required')),
            reapeatDuration: Yup.string().required(t('Reapeat Duration is required')),

        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateProject(object._id, values, onCompleted)) : dispatch(CreateProject(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t("Project updated successfully") : t("Project created successfully"))
        onClose()
    }
    const leaves = ['Important Tasks', 'Daily Tasks', 'Interviews', 'Internal Meetings', 'Client Meetings', 'General'];

    return (
        <BaseForm formik={formik} onClose={onClose} is_loading={is_loading}>
            <div className='flex flex-col gap-6 col-span-2'>
                <Input placeholder='Add Title' className='!text-2xl dark:bg-transparent !border-r-0 !border-l-0 !border-t-0 !rounded-none' />
                <div className='flex gap-6'>
                    <Datepicker formik={formik} name={'fromDate'} value={formik.values.fromDate} containerClass={'w-full'} type='date' />
                    <Input formik={formik} name={'fromTime'} value={formik.values.fromTime} containerClass={'w-full'} type='time' />
                    <span className='font-bold mt-3'>{t("To")}</span>
                    <Datepicker formik={formik} name={'toDate'} value={formik.values.toDate} containerClass={'w-full'} type='date' />
                    <Input formik={formik} name={'toTime'} value={formik.values.toTime} containerClass={'w-full'} type='time' />
                </div>
                <div className='flex gap-4 items-center'>
                    <ToggleCheck name='repeatEvent'
                        checked={formik.values.repeatEvent}
                        onChange={(event) => {
                            formik.setFieldValue('repeatEvent', event.target.checked)
                        }}
                        id={'repeatEvent'} className={'!gap-6 font-bold !flex-row shrink-0'} label={'Repeat Event'} />
                    <SearchSelect containerClass='w-full'
                        list={leaves.map((leave) => ({ value: leave, display: leave }))}
                        value={leaveType}
                        onChange={(selected) => setLeaveType(selected)}
                        placeholder="Important Tasks"
                    />
                </div>

                {formik.values.repeatEvent &&
                    <div className='flex flex-col gap-2'>
                        <p className='mb-0 text-left font-bold text-2xl'>{t('Custom Repeat')}</p>
                        <div className='flex gap-4'>
                            <span className='mt-2'>{t("Repeat every")}</span>
                            <Input containerClass={'w-20'} type={'number'} name={'repeatDay'} value={formik.values.repeatDay} formik={formik} className={'w-max'} placeholder='1' />
                            <SearchSelect placeholder={'Week'} formik={formik} name='reapeatDuration' value={formik.values.reapeatDuration} list={[{ display: "Daily", value: "Daily" }, { display: "Week", value: "Week" }, { display: "Month", value: "Month" }]} />
                        </div>
                        <span className='mt-2 text-left'>{t("Repeat On")}</span>
                        <div className="flex flex-wrap gap-2">
                            {daysOfWeek.map((day) => (
                                <div key={day}>
                                    <input
                                        type="checkbox"
                                        id={day}
                                        name="days"
                                        value={day}
                                        className="hidden"
                                        checked={selectedDays.includes(day)}
                                        onChange={() => handleDayChange(day)}
                                    />
                                    <label
                                        htmlFor={day}
                                        className={`cursor-pointer h-10 w-10 flex justify-center items-center border dark:border-gray-500 rounded-full transition transform ${selectedDays.includes(day) ? 'bg-themePrimary text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
                                            }`}
                                    >
                                        {day}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <span className='mt-2 text-left font-bold text-xl'>{t("Ends")}</span>
                        <Radio id='neverEnd' label={'Never'} name={'end'} />
                        <div className='flex'>
                            <Radio className='w-40' id='endOn' label={'On'} name={'end'} />
                            <Datepicker formik={formik} name={'endOn'} value={formik.values.endOn} type={'date'} />
                        </div>
                        <div className='flex'>
                            <Radio className='w-40' id='endAfter' label={'After'} name={'end'} />
                            <div className='relative'>
                                <Input formik={formik} name={'endOn'} value={formik.values.endOn} type={'number'} placeholder='2' />
                                <span className='absolute right-3 top-[10px]'>{t("Occurence")}</span>
                            </div>
                        </div>
                    </div>
                }
                <p className='text-xl font-bold text-themePurple dark:border-gray-700 border-b border-themeGrayscale500 text-left'>{t("Event Details")}</p>
                <div className='flex gap-4 pl-9'>
                    <Button className={'btn btn-purple'}>{t("Meeting url")}</Button>
                    <Input containerClass={'grow'} placeholder='https://googlemeet.com/xyz-abc' />
                </div>
                <div className='flex items-center gap-4'>
                    <span><LocationIcon /></span>
                    <Input containerClass={'grow'} placeholder='Add Location' />
                </div>
                <div className='flex items-center gap-4'>
                    <span><NotificationBell /></span>
                    <Button className={'btn btn-purple'}>{t("Notification before")}</Button>
                    <Input placeholder='30 Min' containerClass={'w-20'} />
                </div>
                <div className='flex items-center gap-4'>
                    <span><Employees className={'h-5 w-5'} /></span>
                    <SearchSelect containerClass={'w-[34%]'} list={[
                        { display: "John", value: "John" },
                        { display: "Mink", value: "Mink" },
                    ]} placeholder='Participent' />
                    <span className='bg-themeGrayscale300 dark:bg-gray-700 py-3 px-4 rounded-lg text-sm grow text-left p-4 '>{t("John is not available on meeting schedule please change time")}</span>
                </div>
                <div className='flex gap-4'>
                    <span><HamburgerMenu className={'h-5 w-5 mt-3'} /></span>
                    <TextEditor containerClass='grow' />
                </div>
            </div>

        </BaseForm>
    )
}