import * as Yup from 'yup';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button, Input, TextEditor, ToggleCheck } from '@/components/elements';
import { useState } from 'react';
import Radio from '@/components/elements/Radio';
import { Edit, Employees, HamburgerMenu, LocationIcon, NotificationBell } from '@/components/svg';
import CreatScheduleForm from './create';
import { useFormik } from 'formik';

export default function ViewScheduleForm({ onClose, object, }) {
    const { t } = useTranslation()
    const { is_loading } = useSelector(state => state.project)
    const [selectedDays, setSelectedDays] = useState(['MO']);
    const [create, setCreate] = useState(false)
    const daysOfWeek = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
    const formik = useFormik({
        initialValues: {
            fromDate: object?.fromDate || "",

        },
        validationSchema: Yup.object().shape({
            fromDate: Yup.string().required(t('From Date is required')),
        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateProject(object._id, values, onCompleted)) : dispatch(CreateProject(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t("Project updated successfully") : t("Project created successfully"))
        onClose()
    }
    return (
        <BaseForm onClose={onClose} is_loading={is_loading}>
            <div className='flex flex-col gap-6 col-span-2 '>
                <div className='flex gap-3'>
                    <Button onClick={() => { setCreate(true) }} className={'btn btn-light-primary !p-2'}><Edit /></Button>
                    <h3 className='mb-0'>{t("Mini Soman : MERN Stack Interview")}</h3>
                </div>
                <div className='flex gap-6'>
                    <Input disabled={true} name={'fromDate'} value={'02/02/2024'} className={'cursor-not-allowed'} containerClass={'w-full'} type='text' />
                    <Input disabled={true} name={'fromTime'} value={'09:41 PM'} className={'cursor-not-allowed'} containerClass={'w-full'} type='text' />
                    <span className='font-bold mt-3'>{t("To")}</span>
                    <Input disabled={true} name={'fromDate'} value={'02/03/2024'} className={'cursor-not-allowed'} containerClass={'w-full'} type='text' />
                    <Input disabled={true} name={'fromTime'} value={'11:41 PM'} className={'cursor-not-allowed'} containerClass={'w-full'} type='text' />
                </div>
                <ToggleCheck name='repeatEvent'
                    checked={true}
                    id={'repeatEvent'} className={'!gap-6 font-bold !flex-row'} label={'Repeat Event'} />
                <div className='flex flex-col gap-2'>
                    <p className='mb-0 text-left font-bold text-2xl'>{t('Custom Repeat')}</p>
                    <div className='flex gap-4'>
                        <span className='mt-2'>{t("Repeat every")}</span>
                        <Input disabled={true} containerClass={'w-20'} type={'text'} name={'repeatDay'} value={'1'} className={'w-max cursor-not-allowed'} placeholder='1' />
                        <Input disabled={true} containerClass={''} type={'text'} name={'repeatDay'} value={'Week'} className={'cursor-not-allowed'} placeholder='1' />
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
                                // onChange={() => handleDayChange(day)}
                                />
                                <label
                                    htmlFor={day}
                                    className={`cursor-pointer h-10 w-10 flex justify-center items-center border rounded-full transition transform ${selectedDays.includes(day) ? 'bg-themePrimary text-white' : 'bg-gray-200'
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
                        <Radio className='w-40' id='endOn' checked={true} label={'On'} name={'end'} />
                        <Input disabled={true} name={'fromDate'} value={'02/02/2024'} className={'cursor-not-allowed'} type='text' />
                    </div>
                    <div className='flex'>
                        <Radio className='w-40' id='endAfter' label={'After'} name={'end'} />
                        <div className='relative'>
                            <Input disabled={true} name={'endOn'} value={'2'} className={'cursor-not-allowed'} type={'number'} placeholder='2' />
                            <span className='absolute right-3 top-[10px]'>{t("Occurence")}</span>
                        </div>
                    </div>
                </div>
                <p className='text-xl font-bold text-themePurple border-b border-themeGrayscale500 text-left'>{t("Event Details")}</p>
                <div className='flex gap-4 pl-9'>
                    <Button className={'btn btn-purple'}>{t("Meeting url")}</Button>
                    <Input disabled={true} className={'cursor-not-allowed'} containerClass={'grow'} placeholder='https://googlemeet.com/xyz-abc' />
                </div>
                <div className='flex items-center gap-4'>
                    <span><LocationIcon /></span>
                    <Input disabled={true} className={'cursor-not-allowed'} containerClass={'grow'} placeholder='Online' />
                </div>
                <div className='flex items-center gap-4'>
                    <span><Employees className={'h-5 w-5'} /></span>
                    <Input disabled={true} className={'cursor-not-allowed'} containerClass={'grow'} placeholder='John, Mink, Lily' />
                </div>
                <div className='flex gap-4'>
                    <span><HamburgerMenu className={'h-5 w-5 mt-3'} /></span>
                    <TextEditor readOnly={true} content=' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam inventore quisquam tenetur voluptatum facilis sed id delectus dolores consequuntur exercitationem, aspernatur laboriosam dolorum cum dolore earum nihil provident voluptas quae!' containerClass='grow cursor-not-allowed' />
                </div>
            </div>
            {create && <CreatScheduleForm onClose={() => setCreate(false)} />}
        </BaseForm>
    )
}