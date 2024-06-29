import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import { Input, Datepicker, MultiSelect, SearchSelect, Textarea, ToggleCheck, CheckBox } from "@/components/elements"

export default function CandidateFieldForm({ title, onClose, type, object, additionFields }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            employeeCNIC: object?.employeeCNIC || "",
            fatherName: object?.fatherName || "",
            passportNumber: object?.passportNumber || "",
            gender: object?.gender || "",
            martialStatus: object?.martialStatus || "",
            institution: object?.institution || "",
            subject: object?.subject || "",
            startingDate: object?.startingDate || "",
            completionDate: object?.completionDate || "",
            degree: object?.degree || "",
            grade: object?.grade || "",
            startDate: object?.startDate || "",

            /* institution: object?.institution || "",
            subject: object?.subject || "",
            startingDate: object?.startingDate || "",
            completionDate: object?.completionDate || "",
            degree: object?.degree || "",
            grade: object?.grade || "", */

            companyName: object?.companyName || "",
            designation: object?.designation || "",
            jobStartDate: object?.jobStartDate || "",
            endDate: object?.endDate || "",
            location: object?.location || "",
        },
        validationSchema: Yup.object().shape({
            employeeCNIC: Yup.string().required(t('formik.employeeCNICRequired')),
            fatherName: Yup.string().required(t('formik.fatherNameRequired')),
            passportNumber: Yup.string().required(t('formik.passportNumberRequired')),
            gender: Yup.string().required(t('formik.genderRequired')),
            martialStatus: Yup.string().required(t('formik.martialStatusRequired')),
            institution: Yup.string().required(t('formik.institutionRequired')),
            subject: Yup.string().required(t('formik.subjectRequired')),
            startingDate: Yup.string().required(t('formik.startingDateRequired')),
            completionDate: Yup.string().required(t('formik.completionDateRequired')),
            degree: Yup.string().required(t('formik.degreeRequired')),
            grade: Yup.string().required(t('formik.gradeRequired')),

            /* institution: Yup.string().required(t('formik.institutionRequired')),
            subject: Yup.string().required(t('formik.subjectRequired')),
            startingDate: Yup.string().required(t('formik.startingDateRequired')),
            completionDate: Yup.string().required(t('formik.completionDateRequired')),
            degree: Yup.string().required(t('formik.degreeRequired')),
            grade: Yup.string().required(t('formik.gradeRequired')), */

            companyName: Yup.string().required(t('formik.companyNameRequired')),
            designation: Yup.string().required(t('formik.designationRequired')),
            jobStartDate: Yup.string().required(t('formik.jobStartDateRequired')),
            endDate: Yup.string().required(t('formik.endDateRequired')),
            location: Yup.string().required(t('formik.locationRequired')),
        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateCustomfield(object._id, values, onCompleted)) : dispatch(CreateCustomfield(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`${type} updated successfully`) : t(`${type} created successfully`))
        onClose()
    }

    return (
        <BaseForm 
            title={object ? `Edit ${title}` : `Add new ${title}`}
            formElements={[]}
            formik={formik}
            onClose={onClose}
            is_loading={false}
        >
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                <legend className='col-span-2 text-left text-h6 font-bold'>Personal Info</legend>
                <Input
                    type={'text'}
                    name={'employeeCNIC'}
                    label={t('Employee CNIC')}
                    placeholder={t('Employee CNIC')}
                    value={formik.values.employeeCNIC}
                    formik={formik}
                    required
                />
                <Input
                    type={'text'}
                    name={'fatherName'}
                    label={t('Father Name')}
                    placeholder={t('Father Name')}
                    value={formik.values.fatherName}
                    formik={formik}
                    required
                />
                <Input
                    type={'text'}
                    name={'passportNumber'}
                    label={t('Passport Number')}
                    placeholder={t('Passport Number')}
                    value={formik.values.passportNumber}
                    formik={formik}
                    required
                />
                <SearchSelect
                    name={'gender'}
                    label={t('Gender')}
                    value={formik.values.gender}
                    list={[
                        { display: 'Male', value: 'male' },
                        { display: 'Female', value: 'Female' },
                        { display: 'Other', value: 'other' },
                    ]}
                    error={formik.touched.gender && formik.errors.gender}
                    onBlur={() => {
                        formik.setFieldTouched('gender', true)
                    }}
                    onInput={formik.handleBlur}
                    onChange={(value) => {
                        formik.setFieldValue('gender', value)
                    }}
                />
                <SearchSelect
                    name={'martialStatus'}
                    label={t('Martial Status')}
                    value={formik.values.martialStatus}
                    list={[
                        { display: 'Single', value: 'single' },
                        { display: 'Married', value: 'married' },
                        { display: 'Divorced', value: 'divorced' },
                        { display: 'Widowed', value: 'widowed' },
                        { display: 'Separated', value: 'separated' },
                        { display: 'Engaged', value: 'engaged' },
                    ]}
                    error={formik.touched.martialStatus && formik.errors.martialStatus}
                    onBlur={() => {
                        formik.setFieldTouched('martialStatus', true)
                    }}
                    onInput={formik.handleBlur}
                    onChange={(value) => {
                        formik.setFieldValue('martialStatus', value)
                    }}
                />
                <Input
                    type={'text'}
                    name={'nationality'}
                    label={t('Nationality')}
                    placeholder={t('Nationality')}
                    value={formik.values.nationality}
                    formik={formik}
                    required
                />
                <Input
                    type={'text'}
                    name={'religion'}
                    label={t('Religion')}
                    placeholder={t('Religion')}
                    value={formik.values.religion}
                    formik={formik}
                    required
                />
                <Input
                    type={'text'}
                    name={'language'}
                    label={t('Language')}
                    placeholder={t('Language')}
                    value={formik.values.language}
                    formik={formik}
                    required
                />
            </div>

            <hr className='my-6' />

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                <legend className='col-span-2 text-left text-h6 font-bold'>Education Information</legend>
                <Input
                    type={'text'}
                    name={'institution'}
                    label={t('Institution')}
                    placeholder={t('Institution')}
                    value={formik.values.institution}
                    formik={formik}
                    required
                />
                <Input
                    type={'text'}
                    name={'subject'}
                    label={t('Subject')}
                    placeholder={t('Subject')}
                    value={formik.values.subject}
                    formik={formik}
                    required
                />
                <Datepicker
                    name={'startingDate'}
                    label={t('Starting Date')}
                    value={formik.values.startingDate}
                    error={formik.errors.startingDate}
                    onBlur={formik.handleBlur}
                    onInput={formik.handleBlur}
                    minDate={new Date}
                    onChange={(value) => {formik.setFieldValue('startingDate', value)}}
                    required
                />
                <Datepicker
                    name={'completionDate'}
                    label={t('Completion Date')}
                    value={formik.values.completionDate}
                    error={formik.errors.completionDate}
                    onBlur={formik.handleBlur}
                    onInput={formik.handleBlur}
                    minDate={new Date}
                    onChange={(value) => {formik.setFieldValue('completionDate', value)}}
                    required
                />
                <Input
                    type={'text'}
                    name={'institution'}
                    label={t('Institution')}
                    placeholder={t('Institution')}
                    value={formik.values.institution}
                    formik={formik}
                    required
                />
                <Input
                    type={'text'}
                    name={'degree'}
                    label={t('Degree')}
                    placeholder={t('Degree')}
                    value={formik.values.degree}
                    formik={formik}
                    required
                />
            </div>

            <hr className='my-6' />

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                <legend className='col-span-2 text-left text-h6 font-bold'>Education Information</legend>
                <Input
                    type={'text'}
                    name={'institution'}
                    label={t('Institution')}
                    placeholder={t('Institution')}
                    value={formik.values.institution}
                    formik={formik}
                    required
                />
                <Input
                    type={'text'}
                    name={'subject'}
                    label={t('Subject')}
                    placeholder={t('Subject')}
                    value={formik.values.subject}
                    formik={formik}
                    required
                />
                <Datepicker
                    name={'startingDate'}
                    label={t('Starting Date')}
                    value={formik.values.startingDate}
                    error={formik.errors.startingDate}
                    onBlur={formik.handleBlur}
                    onInput={formik.handleBlur}
                    minDate={new Date}
                    onChange={(value) => {formik.setFieldValue('startingDate', value)}}
                    required
                />
                <Datepicker
                    name={'completionDate'}
                    label={t('Completion Date')}
                    value={formik.values.completionDate}
                    error={formik.errors.completionDate}
                    onBlur={formik.handleBlur}
                    onInput={formik.handleBlur}
                    minDate={new Date}
                    onChange={(value) => {formik.setFieldValue('completionDate', value)}}
                    required
                />
                <Input
                    type={'text'}
                    name={'institution'}
                    label={t('Institution')}
                    placeholder={t('Institution')}
                    value={formik.values.institution}
                    formik={formik}
                    required
                />
                <Input
                    type={'text'}
                    name={'degree'}
                    label={t('Degree')}
                    placeholder={t('Degree')}
                    value={formik.values.degree}
                    formik={formik}
                    required
                />
            </div>

            <hr className='my-6' />

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                <legend className='col-span-2 text-left text-h6 font-bold'>Experience Information</legend>
                <Input
                    type={'text'}
                    name={'companyName'}
                    label={t('Company Name')}
                    placeholder={t('Company Name')}
                    value={formik.values.companyName}
                    formik={formik}
                    required
                />
                <Input
                    type={'text'}
                    name={'designation'}
                    label={t('Designation')}
                    placeholder={t('Designation')}
                    value={formik.values.designation}
                    formik={formik}
                    required
                />
                <Datepicker
                    name={'jobStartDate'}
                    label={t('Job Start Date')}
                    value={formik.values.jobStartDate}
                    error={formik.errors.jobStartDate}
                    onBlur={formik.handleBlur}
                    onInput={formik.handleBlur}
                    minDate={new Date}
                    onChange={(value) => {formik.setFieldValue('jobStartDate', value)}}
                    required
                />
                <Datepicker
                    name={'jobEndDate'}
                    label={t('Job End Date')}
                    value={formik.values.jobEndDate}
                    error={formik.errors.jobEndDate}
                    onBlur={formik.handleBlur}
                    onInput={formik.handleBlur}
                    minDate={new Date}
                    onChange={(value) => {formik.setFieldValue('jobEndDate', value)}}
                    required
                />
                <Input
                    type={'text'}
                    name={'location'}
                    label={t('Location')}
                    placeholder={t('Location')}
                    value={formik.values.location}
                    formik={formik}
                    required
                />
            </div>
        </BaseForm>
    )
}

CandidateFieldForm.defaultProps = {
    additionFields: []
}