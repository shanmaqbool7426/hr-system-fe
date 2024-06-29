import React, { Fragment } from "react"
import { useRouter } from "next/router"

import LandingPage from "@/layouts/LandingPage"
import InnerBanner from "@/components/web/InnerBanner"

export default function PrivacyPolicyPage () {
    const router = useRouter()
    const pageName = router.pathname.substring(1);

    return (
        <Fragment>
            <InnerBanner pageTitle={'Privacy Policy'} />
            <main id="main" className={`main page landingPageLayout grow flex flex-col py-12 md:py-20 page-${pageName}`}>
                <div className={'container'}>
                    <h2 className={'text-h4'}>Last Updated: June 19, 2024</h2>
                    <p>At Zaffre Tech, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website [website URL], use our platform, or engage with our services. By using our website or services, you agree to the terms of this Privacy Policy.</p>
                    <ol className={'list-inside list-decimal'}>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Information We Collect:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Personal Information: We may collect personal information such as your name, email address, phone number, and other contact details when you register on our platform, subscribe to our newsletter, or contact us.</li>
                                <li>Usage Data: We automatically collect information about your interactions with our website and services, including IP address, browser type, operating system, pages viewed, links clicked, and other usage data.</li>
                                <li>Cookies and Tracking Technologies: We use cookies and similar tracking technologies to enhance your experience on our website, analyze site traffic, and understand user behavior. You can control the use of cookies through your browser settings.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>How We Use Your Information:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Provide and Improve Services: We use your information to deliver, maintain, and improve our platform and services, including personalizing your experience and responding to your inquiries.</li>
                                <li>Communication: We may use your contact information to send you updates, newsletters, marketing materials, and other information that may be of interest to you. You can opt out of receiving these communications at any time.</li>
                                <li>Analytics: We use usage data and tracking technologies to analyze trends, monitor the performance of our website, and gather demographic information about our user base.</li>
                                <li>Compliance and Security: We may use your information to enforce our terms of service, comply with legal obligations, and protect the rights, property, and safety of Zaffre Tech, our users, and the public.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Information Sharing and Disclosure:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Service Providers: We may share your information with third-party service providers who perform services on our behalf, such as hosting, data analysis, payment processing, and customer support.</li>
                                <li>Business Transfers: In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred to the acquiring entity.</li>
                                <li>Legal Requirements: We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., court orders or subpoenas).</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Data Security:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Security Measures: We implement robust security measures to protect your information from unauthorized access, use, or disclosure. This includes encryption, firewalls, and secure servers.</li>
                                <li>Data Retention: We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected and to comply with legal obligations.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Your Rights and Choices:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Access and Correction: You have the right to access and correct your personal information held by us. You can update your information by logging into your account or contacting us directly.</li>
                                <li>Opt-Out: You can opt out of receiving marketing communications from us by following the unsubscribe instructions in the emails we send or by contacting us directly.</li>
                                <li>Data Deletion: You can request the deletion of your personal information by contacting us. We will take reasonable steps to delete your information, except where we are required to retain it for legal purposes.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Third-Party Links:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Our website may contain links to third-party websites or services that are not operated by us. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review their privacy policies before providing any personal information.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Children&apos;s Privacy:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. We collecting children data only for medical policy for your record.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Changes to This Privacy Policy:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. We will notify you of any material changes by posting the updated policy on our website and indicating the effective date.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Contact Us:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</li>
                                <li>Email: info@zaffretech.co</li>
                                <li>Phone: +92-313-4444265</li>
                                <li>Address: 92 - E2 Block, Beas Ave, Wapda Town, Phase 1, Lahore</li>
                            </ul>
                        </li>
                    </ol>
                    <p>By using our website and services, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.</p>
                    <strong className={'block'}>Thank you for trusting Zaffre Tech with your information.</strong>
                </div>
            </main>
        </Fragment>
    );
}

PrivacyPolicyPage.layout = LandingPage;