import React, { useEffect } from "react";
import Link from "next/link";
import Auth from "@/layouts/Auth"
import { LogoMini } from "@/components/Logo"
import Input from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "@/store/actions/auth.actions"

export default function SignInPage() {

    const { is_loading, auth_user } = useSelector((state) => state.auth)
    const router = useRouter()
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email(t('Enter valid email')).required(t('Email is required')),
            password: Yup.string().required(t('Password is required')),
        }),
        onSubmit: async (values) => {
            dispatch(signIn(values))
        }
    })

    useEffect(() => {
        if (auth_user) {
            router.push('/dashboard')
        }
    }, [auth_user, router])
    return (
        <form className="zt-authForm zt-signInForm" onSubmit={(event) => { event.preventDefault(); formik.handleSubmit() }}>
            <figure className="zt-logo">
                <LogoMini />
            </figure>
            <h1 className="text-h3 mb-6 md:mb-10 text-center">{t('Sign In to your account')}</h1>
            <fieldset className="flex flex-col gap-4">
                <Input
                    name='email'
                    value={formik.values.email}
                    placeholder={t('Enter your email')}
                    type='email'
                    formik={formik}
                    label={t('Email')}
                />

                <Input
                    name='password'
                    value={formik.values.password}
                    placeholder={t('Enter your password')}
                    type='password'
                    formik={formik}
                    label={t('Password')}
                />

                <div className="zt-formGroup !flex-row justify-end items-center">
                    {/*
                        <CheckBox
                            name='rememberMe'
                            value={formik.values.rememberMeLabel}
                            type='checkbox'
                            formik={formik}
                            className={'zt-themeCheckBox'}
                            label={t('Remember me')}
                        />
                    */}

                    <Link className="text-primaryTheme" href={'/forgot-password'}>{t('Forgot Password?')}</Link>
                </div>
                <Button type="submit" value={t('Sign in')} variant={'primary'} disabled={is_loading} is_loading={is_loading} />
            </fieldset>
        </form>
    );
}

SignInPage.layout = Auth;
