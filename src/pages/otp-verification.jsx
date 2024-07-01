import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import Auth from "@/layouts/Auth"
import Button from "@/components/elements/Button";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "@/store/actions/auth.actions"
import OtpInput from 'react-otp-input';
import { forgotPassword } from "@/store/actions/auth.actions"
import BasicModal from "@/components/Modal/BasicModal";
import { InputErrorInfo } from "@/components/svg";

export default function OptVerificationPage() {
    const [popup, setPopup] = useState(false);
    const [state, setState] = useState(0);
    const [otp, setOtp] = useState('');
    const { is_loading, reset } = useSelector((state) => state.auth)
    const router = useRouter()
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [countdown, setCountdown] = useState(60);
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        let interval;
        if (isResending) {
            interval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isResending]);

    useEffect(() => {
        if (countdown === 0) setIsResending(false);
    }, [countdown]);

    const resendCodeHandler = async () => {
        dispatch(forgotPassword({ email: reset.email }))
        setCountdown(60);
        setIsResending(true);
    }

    const formik = useFormik({
        initialValues: {
            otp: "",
        },
        validationSchema: Yup.object().shape({
            otp: Yup.string().length(4, t('formik.otpRequired')).required(t('formik.otpRequired')),
        }),

        onSubmit: async (values) => {
            dispatch(verifyOtp({ otp: values.otp, email: reset.email }, router))
        }
    })

    useEffect(() => {
        if (!reset.email) {
            router.push('/forgot-password')
        }
    }, [reset, router])

    useEffect(() => {
        formik.setFieldValue('otp', otp)
    }, [otp, formik])

    return (
        <>
            <form className="zt-authForm zt-otpVerificationForm" onSubmit={(event) => { event.preventDefault(); formik.handleSubmit() }}>
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
                <h1 className="text-h3 mb-6 md:mb-10 text-center">{t('OTP Verification')}</h1>
                <p className="mb-10 text-lg">
                    {t('We have sent a verification code to email address')} <strong>{reset.email}</strong>
                    <Link href={'/forgot-password'} className="font-normal no-underline hover:underline">{" "}{t('Wrong Email?')}</Link>{" "}
                    {t('Resend Code')}{" "}
                    {!isResending && <a href="#" className="font-normal no-underline text-themePrimary hover:underline" onClick={() => resendCodeHandler()}>{t("Resend")}</a>}
                    {isResending && <span>{t("Resend in countdown second(s)", { countdown })} </span>}
                </p>

                <fieldset>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        // onPaste={() => formik.handleSubmit()}
                        containerStyle={`parent flex gap-3${formik.errors.otp ? " mb-1" : " mb-8"}`}
                        inputStyle={`zt-themeInput text-center !w-full ${formik.errors.otp && "zt-error"}`}
                        renderInput={(props) => <span className=""><input {...props} /></span>}
                    />
                    {formik.errors.otp && <span className="text-themeDanger text-sm mb-2">
                        {formik.errors.otp}
                    </span>}
                    <Button type="submit" value={t('Submit')} className={'btn-primary'} disabled={!formik.isValid || is_loading} />
                </fieldset>
            </form>
            {/* {setPopup && (
                <BasicModal
                    state={state}
                    popup={popup}
                    setPopup={setPopup}
                    setState={setState}
                />
            )} */}
        </>
    );
}

OptVerificationPage.layout = Auth;
