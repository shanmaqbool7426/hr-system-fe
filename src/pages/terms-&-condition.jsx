import React, { Fragment } from "react"
import { useRouter } from "next/router"

import LandingPage from "@/layouts/LandingPage"
import InnerBanner from "@/components/web/InnerBanner"

export default function TermsAndConditionPage () {
    const router = useRouter()
    const pageName = router.pathname.substring(1);

    return (
        <Fragment>
            <InnerBanner pageTitle={'Terms and Conditions'} />
            <main id="main" className={`main page landingPageLayout grow flex flex-col py-12 md:py-20 page-${pageName}`}>
                <div className={'container'}>
                    <h2 className={'text-h4'}>Last Updated: June 19, 2024</h2>
                    <p>Welcome to Zaffre Tech! These Terms and Conditions (&quot;Terms&quot;) govern your use of our website [www.zaffretech.co](https://www.zaffretech.co), platform, and services. By accessing or using our website and services, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not use our website or services.</p>
                    <ol className={'list-inside list-decimal'}>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Acceptance of Terms:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>By using our website and services, you confirm that you have read, understood, and agree to these Terms, as well as our Privacy Policy, which is incorporated by reference.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Use of Our Services:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Eligibility: You must be at least 18 years old and have the legal capacity to enter into these Terms. If you are using our services on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.</li>
                                <li>Account Registration: To access certain features of our platform, you may need to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</li>
                                <li>Account Security: You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Prohibited Activities:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>You agree not to engage in any of the following prohibited activities:</li>
                                <li>Violating any applicable laws or regulations.</li>
                                <li>Infringing upon or violating our intellectual property rights or the intellectual property rights of others.</li>
                                <li>Using our services to transmit, distribute, or store any content that is unlawful, harmful, threatening, abusive, or otherwise objectionable.</li>
                                <li>Interfering with or disrupting the integrity or performance of our services or the data contained therein.</li>
                                <li>Attempting to gain unauthorized access to our systems or networks.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Intellectual Property:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Ownership: All content, features, and functionality on our website and platform, including but not limited to text, graphics, logos, icons, images, and software, are the exclusive property of Zaffre Tech or its licensors and are protected by copyright, trademark, and other intellectual property laws.</li>
                                <li>License: We grant you a limited, non-exclusive, non-transferable, and revocable license to access and use our website and services for your personal or internal business purposes, in accordance with these Terms.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Fees and Payment:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Subscription Fees: Some of our services may be offered on a subscription basis. You agree to pay all applicable fees for the subscription plan you select, as described on our website.</li>
                                <li>Payment Terms: All fees are payable in advance and are non-refundable, except as otherwise expressly provided in these Terms. We may change our fees and payment policies at any time upon notice to you.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Termination:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>Termination by You: You may terminate your account at any time by following the instructions provided on our website. Upon termination, you must cease all use of our services.</li>
                                <li>Termination by Us: We may terminate or suspend your access to our services, without prior notice or liability, for any reason, including if you breach these Terms.</li>
                                <li>Effect of Termination: Upon termination, your right to use our services will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Disclaimers:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>No Warranty: Our services are provided &quot;as is&quot; and &quot;as available,&quot; without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.</li>
                                <li>Limitation of Liability: In no event shall Zaffre Tech, its directors, employees, partners, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, arising out of or in connection with your use of our services.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Indemnification:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>You agree to indemnify, defend, and hold harmless Zaffre Tech and its affiliates, officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, costs, and expenses, including reasonable attorney&apos;s fees, arising out of or in any way connected with your access to or use of our services, your violation of these Terms, or your infringement of any intellectual property or other rights of any third party.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Governing Law:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Changes to These Terms:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>We may modify these Terms at any time by posting the revised terms on our website and indicating the effective date. Your continued use of our services after the effective date constitutes your acceptance of the revised Terms.</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className={'text-h5 inline-block mb-2'}>Contact Us:</h3>
                            <ul className={'list-inside list-disc pb-4 ml-5'}>
                                <li>If you have any questions or concerns about these Terms, please contact us at:</li>
                                <li>Email: info@zaffretech.co</li>
                                <li>Phone: +92-313-6235558</li>
                                <li>Address: 92 - E2 Block, Beas Ave, Wapda Town, Phase 1, Lahore</li>
                            </ul>
                        </li>
                        
                    </ol>
                    <p>By using our website and services, you acknowledge that you have read and understood these Terms and agree to be bound by them. Thank you for choosing Zaffre Tech!</p>
                </div>
            </main>
        </Fragment>
    );
}

TermsAndConditionPage.layout = LandingPage;