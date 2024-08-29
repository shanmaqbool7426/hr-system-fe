import React, { useEffect, useState } from "react";
import Link from "next/link";
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
import { forgotPassword } from "@/store/actions/auth.actions"

export default function ForgotPasswordPage() {

    const { is_loading, reset } = useSelector((state) => state.auth)
    const router = useRouter()
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email(t('Enter valid email')).required(t('Email is required')),
        }),
        onSubmit: async (values) => {
            dispatch(forgotPassword(values, router))
        }
    })


    return (
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
            <h1 className="text-h3 mb-6 md:mb-10 text-center">{t('Forgot your password')}</h1>
            <p className="mb-10 text-lg">{t('Enter your email address and we’ll send you password reset instructions.')}</p>
            <fieldset className="flex flex-col gap-4">
                <Input
                    name='email'
                    value={formik.values.email}
                    placeholder={t('Enter your email')}
                    type='email'
                    formik={formik}
                    label={t('Email')}
                />
                <Button type="submit" value={t('Submit')} variant={'primary'} disabled={!formik.isValid || is_loading} is_loading={is_loading} />
                <Link href={"/sign-in"} className={'btn btn-primary-outline no-underline'}>{t('Back to sign in')}</Link>
            </fieldset>
        </form>
    );
}

ForgotPasswordPage.layout = Auth;
