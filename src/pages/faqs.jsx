import React, { Fragment } from "react"
import { useRouter } from "next/router"

import LandingPage from "@/layouts/LandingPage"
import InnerBanner from "@/components/web/InnerBanner"

export default function FAQSPage () {
    const router = useRouter()
    const pageName = router.pathname.substring(1);

    return (
        <Fragment>
            <InnerBanner pageTitle={'FAQs'} />
            <main id="main" className={`main page landingPageLayout grow flex flex-col py-12 md:py-20 page-${pageName}`}>
                <div className={'container'}>
                    <ol className={'list-inside list-decimal'}>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>What is Zaffre Tech?</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>- Zaffre Tech is a leading provider of ERP solutions, specializing in Human Resource Management (HRM) modules. Our comprehensive suite of tools is designed to streamline business operations and enhance efficiency.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>What modules does Zaffre Tech offer?</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>We offer a wide range of modules, including:</li>
                                <li>Dashboard</li>
                                <li>Attendance</li>
                                <li>Leave</li>
                                <li>Recruitment (AI-driven ATS)</li>
                                <li>Connect (communication tools)</li>
                                <li>Project Management</li>
                                <li>Remote Work</li>
                                <li>Inventory Management</li>
                                <li>Payroll</li>
                                <li>Reports and Analytics</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>How does the Recruitment module work?</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Our Recruitment module is an AI-driven Applicant Tracking System (ATS) that helps streamline the hiring process. It enhances candidate matching and selection through advanced AI features, making it easier to find and hire the best talent.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Can Zaffre Tech help manage remote teams?</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Yes, our Remote Work module is designed to manage remote teams effectively. It monitors employee productivity, counts only allowed work as productive, and converts it into accurate attendance records.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>How does the Attendance module ensure accuracy?</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>The Attendance module automates attendance recording, reducing manual errors. It supports various attendance methods, including biometric, RFID, and manual entry, ensuring accurate tracking of employee attendance.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>What features does the Connect module offer?</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>The Connect module facilitates seamless communication within your organization through chat, group chat, audio/video calls, and meeting scheduling. This helps foster collaboration and keeps your team connected.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>How does the Payroll module work?</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Our Payroll module ensures error-free and timely payroll processing. It automates payroll calculations, deductions, and compliance with regulatory requirements, guaranteeing accurate and efficient payroll management.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>What type of reports can be generated with the Reports module?</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>The Reports module generates detailed and customizable reports across all business functions. This provides valuable insights, helping you make data-driven decisions and improve overall efficiency.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>How does Zaffre Tech&apos;s Project Management module benefit my business?</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Our Project Management module offers project boards and task boards to manage tasks and projects efficiently. It allows you to create task-based workspaces, use AI to count working hours based on completed work, and evaluate performance through feedback.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Can Zaffre Tech’s ERP solutions be customized to my business needs?</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Yes, our ERP solutions are highly customizable. We understand that every business is unique, and we tailor our modules to meet your specific needs and requirements.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>How do I get started with Zaffre Tech?</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>To get started, contact us at [contact email/phone number] or visit our website at [website URL]. We can provide more information, schedule a demo, and discuss how our ERP solutions can benefit your business.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>What kind of support does Zaffre Tech offer?</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>We offer exceptional support to ensure your experience with our ERP systems is smooth and productive. Our dedicated support team is always ready to assist you with any questions or issues you may have.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Is Zaffre Tech committed to innovation?</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Yes, we are committed to continuous innovation. We integrate the latest technologies into our solutions to ensure that your business stays ahead of the curve.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>How does the Inventory Management module work?</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Our Inventory Management module provides comprehensive tracking from acquisition to end user. It manages repair costs and calculates depreciation, offering complete control over your inventory lifecycle.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Why should I choose Zaffre Tech?</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Choosing Zaffre Tech means partnering with a company dedicated to your success. Our comprehensive, customizable, and innovative ERP solutions are designed to meet the challenges of modern business, helping you achieve your goals and drive growth.</li>
                            </ul>
                        </li>
                    </ol>
                </div>
            </main>
        </Fragment>
    );
}

FAQSPage.layout = LandingPage;