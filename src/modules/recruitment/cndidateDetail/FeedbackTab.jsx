import { Button, CheckBox, Input } from '@/components/elements'
import React from 'react'
import { useTranslation } from 'react-i18next'

const FeedbackTab = () => {
    const { t } = useTranslation()

    return (
        <div>
            <h2 className='font-bold text-lg'>{t("Interview Feedback ")}</h2>
            <div className='flex gap-8 mb-4'>
                <CheckBox size={'sm'} label={t("Recommended")}
                    variant={'dark'}
                    labelClass={'text-base leading-none'}
                    id="Recommended"
                    name={"Recommended"}
                />
                <CheckBox size={'sm'} label={t("Non recommended")}
                    variant={'dark'}
                    labelClass={'text-base leading-none'}
                    id="NonRecommended"
                    name={"NonRecommended"} />
            </div>
            <div className='flex justify-between items-center mb-4'>
                <h3 className='font-semibold mb-0 text-base'>{t("Feedback Question")}</h3>
                <Button className={'btn btn-dark-outline !py-1 !px-4'}>{t("Add Question")}</Button>
            </div>
            <div className='grid grid-cols-2 gap-4 mb-6'>
                <Input
                    type={'text'}
                    name={'QuestionTitle'}
                    label={t('Question Title')}
                    placeholder={t('Communications')}
                    required
                />
                <Input
                    type={'text'}
                    name={'Score'}
                    label={t('Score')}
                    placeholder={t('10')}
                    required
                />
                <Input
                    type={'text'}
                    name={'QuestionTitle'}
                    label={t('Question Title')}
                    placeholder={t('Technical Skill')}
                    required
                />
                <Input
                    type={'text'}
                    name={'Score'}
                    label={t('Score')}
                    placeholder={t('10')}
                    required
                />
                <Input
                    type={'text'}
                    name={'QuestionTitle'}
                    label={t('Question Title')}
                    placeholder={t('Personality Assessment')}
                    required
                />
                <Input
                    type={'text'}
                    name={'Score'}
                    label={t('Score')}
                    placeholder={t('10')}
                    required
                />
                <Input
                    type={'text'}
                    name={'QuestionTitle'}
                    label={t('Question Title')}
                    placeholder={t('References and Background')}
                    required
                />
                <Input
                    type={'text'}
                    name={'Score'}
                    label={t('Score')}
                    placeholder={t('10')}
                    required
                />
            </div>
            <Button className={'btn btn-purple w-max !px-14'}> {t("Submit")}</Button>
        </div>
    )
}

export default FeedbackTab
