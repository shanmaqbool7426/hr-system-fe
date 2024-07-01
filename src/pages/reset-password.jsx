import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import Auth from "@/layouts/Auth"
import Input from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import { useRouter } from "next/router";
import Toast from "@/util/toast";
import axios from "@/util/axios";
import ls from 'localstorage-slim';
import { useTranslation } from "next-i18next";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/store/actions/auth.actions"
import PasswordUpdatedModal from "@/components/Modal/PasswordUpdated"

export default function ForgotPasswordPage() {

    const { is_loading, reset } = useSelector((state) => state.auth)
    const router = useRouter()
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [open, setOpen] = useState(false)
    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object().shape({
            password: Yup.string().required(t('formik.passwordRequired')),
            confirmPassword: Yup.string().required(t('formik.confirmPasswordRequired')).oneOf([Yup.ref('password'), ''], (t('formik.matchPassword'))),
        }),
        onSubmit: async (values) => {
            dispatch(resetPassword({ ...values, ...reset }, setOpen))
        }
    })
    useEffect(() => {
        if (!reset.email) router.push('/forgot-password')
        if (!reset.otp) router.push('/otp-verification')
    }, [reset, router])
    return (
        <>
            <form className="zt-authForm zt-forgotPasswordForm" onSubmit={(event) => { event.preventDefault(); formik.handleSubmit() }}>
                <figure className="zt-logo">
                    <Image
                        src={'/assets/images/logo-mini.svg'}
                        width={150}
                        height={150}
                        quality={100}
                        priority={true}
                        placeholder="blur"
                        blurDataURL={'/assets/images/logo-mini.svg'}
                        alt="icon"
                    />
                </figure>
                <h1 className="text-h3 mb-6 md:mb-10 text-center">{t('Reset your password')}</h1>
                <p className="mb-10 text-lg">{t('Please enter your new password.')}</p>
                <fieldset>
                    <Input
                        name='password'
                        value={formik.values.password}
                        placeholder={t('Enter your password')}
                        type='password'
                        formik={formik}
                        label={t('New Password')}
                    />
                    <Input
                        name='confirmPassword'
                        value={formik.values.confirmPassword}
                        placeholder={t('Confirm your password')}
                        type='password'
                        formik={formik}
                        label={t('Confirm Password')}
                    />

                    <Button type="submit" value={t('Submit')} variant={'primary'} className={'mb-4'} disabled={!formik.isValid || is_loading} is_loading={is_loading} />
                </fieldset>
            </form>
            <PasswordUpdatedModal open={open} setOpen={setOpen} />
        </>
    );
}

ForgotPasswordPage.layout = Auth;
