import React, { Fragment } from "react"
import { useRouter } from "next/router"

import LandingPage from "@/layouts/LandingPage"
import InnerBanner from "@/components/web/InnerBanner";

export default function WhyZaffrePage () {
    const router = useRouter()
    const pageName = router.pathname.substring(1);

    return (
            <Fragment>
                <InnerBanner pageTitle={'Why Employers Choose Zaffre Tech'} />
                <main id="main" className={`main page landingPageLayout grow flex flex-col py-12 md:py-20 page-${pageName}`}>
                    <div className={'container'}>
                        <p>At Zaffre Tech, we understand the complexities of managing a business in today&apos;s fast-paced, digital world. Our ERP solutions are designed to simplify and enhance your operations, making us the preferred choice for employers looking to optimize their business processes. Here’s why employers choose Zaffre Tech:</p>

                        <ol className={'list-inside list-decimal'}>
                            <li>
                                <h3 className={'text-h5 inline-block mb-2'}>Comprehensive ERP Solutions:</h3>
                                <ul className={'list-inside list-disc pb-4 ml-5'}>
                                    <li>- Our ERP systems cover a wide range of business functions, from HRM to inventory management. With modules tailored to meet various needs, Zaffre Tech offers a one-stop solution for all your business requirements.</li>
                                </ul>
                            </li>
                            <li>
                                <h3 className={'text-h5 inline-block mb-2'}>Advanced HRM Modules:</h3>
                                <ul className={'list-inside list-disc pb-4 ml-5'}>
                                    <li>- Specializing in Human Resource Management, our modules include ATS-based recruitment, attendance tracking, leave management, error-free payroll, employee management, and more. These tools help streamline HR processes, improve accuracy, and enhance employee satisfaction.</li>
                                </ul>
                            </li>
                            <li>
                                <h3 className={'text-h5 inline-block mb-2'}>AI-Driven Recruitment:</h3>
                                <ul className={'list-inside list-disc pb-4 ml-5'}>
                                    <li>- Our Applicant Tracking System (ATS) uses advanced AI features to enhance candidate matching and selection. This not only speeds up the recruitment process but also ensures you hire the best talent suited for your organization.</li>
                                </ul>
                            </li>
                            <li>
                                <h3 className={'text-h5 inline-block mb-2'}>Efficient Attendance and Leave Management:</h3>
                                <ul className={'list-inside list-disc pb-4 ml-5'}>
                                    <li>- With automated attendance recording and seamless leave management, our modules reduce manual errors and ensure compliance with company policies. This leads to better workforce management and increased productivity.</li>
                                </ul>
                            </li>
                            <li>
                                <h3 className={'text-h5 inline-block mb-2'}>Enhanced Communication Tools:</h3>
                                <ul className={'list-inside list-disc pb-4 ml-5'}>
                                    <li>- The Connect module facilitates seamless communication within your organization through chat, group chat, audio/video calls, and meeting scheduling. This fosters collaboration and ensures that your team stays connected, no matter where they are.</li>
                                </ul>
                            </li>
                            <li>
                                <h3 className={'text-h5 inline-block mb-2'}>Robust Project Management:</h3>
                                <ul className={'list-inside list-disc pb-4 ml-5'}>
                                    <li>- Our project management tools, including project boards and task boards, enable efficient task tracking and project execution. With AI-powered performance evaluation, you can ensure that your projects are completed on time and to the highest standards.</li>
                                </ul>
                            </li>
                            <li>
                                <h3 className={'text-h5 inline-block mb-2'}>Remote Work Management:</h3>
                                <ul className={'list-inside list-disc pb-4 ml-5'}>
                                    <li>- Zaffre Tech’s remote work module helps you manage remote teams effectively. It monitors employee productivity, counts only allowed work as productive, and converts it into accurate attendance records, ensuring accountability and efficiency.</li>
                                </ul>
                            </li>
                            <li>
                                <h3 className={'text-h5 inline-block mb-2'}>Detailed Reporting and Analytics:</h3>
                                <ul className={'list-inside list-disc pb-4 ml-5'}>
                                    <li>- Our reports module generates detailed and customizable reports across all business functions. This provides you with valuable insights, helping you make data-driven decisions and improve overall efficiency.</li>
                                </ul>
                            </li>
                            <li>
                                <h3 className={'text-h5 inline-block mb-2'}>Inventory Management:</h3>
                                <ul className={'list-inside list-disc pb-4 ml-5'}>
                                    <li>- Our inventory module offers comprehensive tracking from acquisition to end user, managing repair costs and calculating depreciation. This ensures that you have complete control over your inventory lifecycle.</li>
                                </ul>
                            </li>
                            <li>
                                <h3 className={'text-h5 inline-block mb-2'}>Customization and Flexibility:</h3>
                                <ul className={'list-inside list-disc pb-4 ml-5'}>
                                    <li>- We understand that every business is unique. Our ERP solutions are highly customizable, allowing you to tailor them to meet your specific needs and requirements.</li>
                                </ul>
                            </li>
                            <li>
                                <h3 className={'text-h5 inline-block mb-2'}>Exceptional Support:</h3>
                                <ul className={'list-inside list-disc pb-4 ml-5'}>
                                    <li>- Our dedicated support team is always ready to assist you. We ensure that your experience with our ERP systems is smooth and productive, offering prompt and effective support whenever you need it.</li>
                                </ul>
                            </li>
                            <li>
                                <h3 className={'text-h5 inline-block mb-2'}>Commitment to Innovation:</h3>
                                <ul className={'list-inside list-disc pb-4 ml-5'}>
                                    <li>- At Zaffre Tech, we are committed to continuous innovation. We integrate the latest technologies into our solutions to ensure that your business stays ahead of the curve.</li>
                                </ul>
                            </li>
                            <li>
                                <h3 className={'text-h5 inline-block mb-2'}>Cost-Effective Solutions:</h3>
                                <ul className={'list-inside list-disc pb-4 ml-5'}>
                                    <li>- Our ERP solutions are designed to save you time and resources. By automating processes and improving efficiency, we help you reduce operational costs and achieve better ROI.</li>
                                </ul>
                            </li>
                        </ol>
                        <p>Choosing Zaffre Tech means partnering with a company that is dedicated to your success. Our comprehensive, customizable, and innovative ERP solutions are designed to meet the challenges of modern business, helping you achieve your goals and drive growth.</p>
                        <p>Experience the future of business management with Zaffre Tech. Contact us today to learn more about our solutions and how we can help your business thrive.</p>
                    </div>
                </main>
            </Fragment>
    );
}

WhyZaffrePage.layout = LandingPage;