import React, { Fragment } from "react"
import { useRouter } from "next/router"

import LandingPage from "@/layouts/LandingPage"
import InnerBanner from "@/components/web/InnerBanner"

export default function FeaturesPage () {
    const router = useRouter()
    const pageName = router.pathname.substring(1);

    return (
        <Fragment>
            <InnerBanner pageTitle={'Features'} />
            <main id="main" className={`main page landingPageLayout grow flex flex-col py-12 md:py-20 page-${pageName}`}>
                <div className={'container'}>
                    <p>Welcome to the Features page of Zaffre Tech! Our ERP platform is designed with a wide range of features to help you streamline your business operations, improve efficiency, and drive growth. Here’s a detailed look at what makes Zaffre Tech the preferred choice for businesses of all sizes.</p>
                    <ol className={'list-inside list-decimal'}>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Centralized Dashboard:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Real-Time Insights: Access key metrics and business insights in real-time from a single, centralized dashboard.</li>
                                <li>Customizable Widgets: Tailor your dashboard with customizable widgets to track performance and monitor KPIs relevant to your business.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Advanced Attendance Management:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Automated Tracking: Ensure accurate and error-free attendance recording with automated systems supporting biometric, RFID, and manual entry.</li>
                                <li>Compliance Assurance: Maintain compliance with company policies and labor regulations through reliable and consistent attendance data.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Efficient Leave Management:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Simplified Requests: Employees can easily request leave, while managers can approve or reject requests seamlessly.</li>
                                <li>Comprehensive Tracking: Track leave balances and generate detailed reports for better leave management and transparency.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>AI-Driven Recruitment:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Applicant Tracking System (ATS): Streamline the hiring process with our AI-powered ATS that enhances candidate matching and selection.</li>
                                <li>Efficient Hiring: Reduce time-to-hire and improve the quality of hires with efficient and automated recruitment processes.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Enhanced Communication Tools:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Connect Module: Facilitate seamless communication within your organization through chat, group chat, audio/video calls, and meeting scheduling.</li>
                                <li>Integrated Communication: Integrate communication tools with other modules to enhance teamwork and streamline operations.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Comprehensive Project Management:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Project and Task Boards: Manage tasks and projects effectively with project boards and task boards that offer real-time tracking.</li>
                                <li>AI-Powered Performance Evaluation: Utilize AI to track working hours based on completed tasks and evaluate performance through feedback mechanisms.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Remote Work Capabilities:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Productivity Monitoring: Monitor remote employees&apos; productivity and count only allowed work as productive, converting it into accurate attendance records.</li>
                                <li>Efficiency and Accountability: Ensure accountability and maintain high standards of performance among remote teams.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Robust Inventory Management:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>End-to-End Tracking: Track inventory from acquisition to end-user, managing repair costs and calculating depreciation.</li>
                                <li>Asset Management: Gain comprehensive insights into the utilization and maintenance of individual assets.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Error-Free Payroll Processing:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Automated Calculations: Guarantee accurate payroll processing with automated calculations, deductions, and compliance with regulatory requirements.</li>
                                <li>Simplified Payroll Management: Reduce administrative burdens and ensure employees are paid accurately and on time.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Detailed Reports and Analytics:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Customizable Reports: Generate detailed and customizable reports across all business functions to gain valuable insights.</li>
                                <li>Advanced Analytics: Utilize advanced analytics to monitor performance, identify trends, and make data-driven decisions.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Customization and Flexibility:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Tailored Solutions: Our platform is highly customizable, allowing you to tailor it to meet your specific business needs and requirements.</li>
                                <li>Scalable Modules: Scale your ERP system as your business grows, ensuring continuous support and functionality.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Exceptional Support:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Dedicated Assistance: Our dedicated support team is always ready to assist you, ensuring a smooth and productive experience with our ERP system.</li>
                                <li>Training and Resources: Access comprehensive training and resources to make the most out of our platform.</li>
                            </ul>
                        </li>
                    </ol>
                </div>
            </main>
        </Fragment>
    );
}

FeaturesPage.layout = LandingPage;