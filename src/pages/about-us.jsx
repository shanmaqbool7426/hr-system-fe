import React, { Fragment } from "react"
import { useRouter } from "next/router"

import LandingPage from "@/layouts/LandingPage"
import InnerBanner from "@/components/web/InnerBanner";

export default function AboutUsPage () {
  const router = useRouter()
  const pageName = router.pathname.substring(1);

  return (
    <Fragment>
      <InnerBanner pageTitle={'Welcome to Zaffre Tech!'} />
      <main id="main" className={`main page landingPageLayout grow flex flex-col py-12 md:py-20 page-${pageName}`}>
        <div className={'container'}>
          <p>At Zaffre Tech, we are dedicated to transforming business operations with AI based ERP solutions. Specializing in Human Resource Management (HRM) modules, we offer a comprehensive suite of tools designed to streamline and enhance your business processes.</p>
          <h2 className={'text-h4'}>Our Modules:</h2>
          <ol className={'list-inside list-decimal'}>
            <li>
              <h3 className={'text-h5 inline-block mb-2'}>Dashboard:</h3>
              <ul className={'list-inside list-disc pb-4 ml-5'}>
                <li>- Provides a centralized interface that gives you an overview of all business operations. It displays key metrics and insights in real-time, enabling informed decision-making and efficient management.</li>
              </ul>
            </li>
            <li>
              <h3 className={'text-h5 inline-block mb-2'}>Attendance:</h3>
              <ul className={'list-inside list-disc pb-4 ml-5'}>
                <li>- Tracks employee attendance accurately. This module automates attendance recording, reducing manual errors and ensuring compliance with company policies. It supports various attendance methods, including, mobile app, web based, biometric, RFID, and manual entry.</li>
              </ul>
            </li>
            <li>
              <h3 className={'text-h5 inline-block mb-2'}>Leave:</h3>
              <ul className={'list-inside list-disc pb-4 ml-5'}>
                <li>- Simplifies leave management by allowing employees to request leave and managers to approve or reject requests easily. It tracks leave balances and generates comprehensive leave reports to ensure smooth workflow management.</li>
              </ul>
            </li>
            <li>
              <h3 className={'text-h5 inline-block mb-2'}>Recruitment:</h3>
              <ul className={'list-inside list-disc pb-4 ml-5'}>
                <li>- An AI-driven Applicant Tracking System (ATS) that streamlines the recruitment process. It helps you find, attract, and hire the best talent efficiently by enhancing candidate matching and selection through advanced AI features and save resumes for future hirings in ATS database.</li>
              </ul>
            </li>
            <li>
              <h3 className={'text-h5 inline-block mb-2'}>Connect:</h3>
              <ul className={'list-inside list-disc pb-4 ml-5'}>
                <li>- Enhances communication within the organization. This module provides chat, group chat, audio/video calls, and meeting scheduling functionalities, fostering collaboration and ensuring seamless communication among team members.</li>
              </ul>
            </li>
            <li>
              <h3 className={'text-h5 inline-block mb-2'}>Project Management:</h3>
              <ul className={'list-inside list-disc pb-4 ml-5'}>
                <li>- Offers project boards and task boards to manage tasks and projects efficiently. It allows you to create task-based workspaces without attendance marking, count working hours based on completed work using AI, and evaluate performance through feedback.</li>
              </ul>
            </li>
            <li>
              <h3 className={'text-h5 inline-block mb-2'}>Remote Work:</h3>
              <ul className={'list-inside list-disc pb-4 ml-5'}>
                <li>- Manages remote teams effectively. This module monitors employee productivity in remote settings, ensuring that only allowed work is counted as productive and converting it into accurate attendance records. It helps maintain accountability and efficiency among remote workers.</li>
              </ul>
            </li>
            <li>
              <h3 className={'text-h5 inline-block mb-2'}>Inventory:</h3>
              <ul className={'list-inside list-disc pb-4 ml-5'}>
                <li> - Provides complete tracking of inventory from acquisition to the end user. It manages repair costs and calculates the depreciation of individual assets, offering a comprehensive view of your inventory lifecycle.</li>
              </ul>
            </li>
            <li>
              <h3 className={'text-h5 inline-block mb-2'}>Payroll:</h3>
              <ul className={'list-inside list-disc pb-4 ml-5'}>
                <li>- Ensures error-free and timely payroll processing. This module automates payroll calculations, deductions, and compliance with regulatory requirements, guaranteeing accurate and efficient payroll management.</li>
              </ul>
            </li>
            <li>
              <h3 className={'text-h5 inline-block mb-2'}>Reports:</h3>
              <ul className={'list-inside list-disc pb-4 ml-5'}>
                <li>- Generates detailed and customizable reports across all modules. This module provides insights into various aspects of your business operations, helping you make data-driven decisions and improve overall efficiency.</li>
              </ul>
            </li>
          </ol>
          <p>At Zaffre Tech, our vision is to empower businesses with cutting-edge AI based Innovative ERP solutions that drive efficiency, productivity, and growth. We are committed to continuous innovation, customization to meet your specific needs, and exceptional support to ensure your success.</p>
          <strong className={'block'}>For more information, please contact us or visit our website.</strong>
        </div>
      </main>
    </Fragment>
  );
}

AboutUsPage.layout = LandingPage;