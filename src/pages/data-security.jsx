import React, { Fragment } from "react"
import { useRouter } from "next/router"

import LandingPage from "@/layouts/LandingPage"
import Banner from "@/components/web/Banner"
import InnerBanner from "@/components/web/InnerBanner"
import Link from "next/link"

export default function DataSecurityPage () {
  const router = useRouter()
  const pageName = router.pathname.substring(1);

  return (
    <Fragment>
      <InnerBanner pageTitle={'Data Security'} />
      <main id="main" className={`main page landingPageLayout grow flex flex-col py-12 md:py-20 page-${pageName}`}>
        <div className={'container'}>
          <p>At Zaffre Tech, we understand that data security is paramount to the success and trust of your business. We are committed to ensuring that your data is protected with the highest standards of security and compliance. Our platform is designed with robust security features and practices that safeguard your sensitive information from threats and vulnerabilities.</p>
          <h2 className={'text-h4'}>Our Commitment to Data Security:</h2>
          <ol className={'list-inside list-decimal'}>
            <li>
              <h3 className={'text-h5 inline-block mb-2'}>Advanced Encryption:</h3>
              <ul className={'list-inside list-disc pb-4 ml-5'}>
                <li>Data Encryption: We use advanced encryption protocols to protect your data both in transit and at rest. This ensures that your sensitive information is secure from unauthorized access and breaches.</li>
                <li>Secure Sockets Layer (SSL): All data transmitted between your systems and our servers is encrypted using SSL, providing an additional layer of security.</li>
              </ul>
            </li>
            <li>
              <h3 className={'text-h5 inline-block mb-2'}>Regular Security Audits:</h3>
              <ul className={'list-inside list-disc pb-4 ml-5'}>
                <li>Vulnerability Assessments: We conduct regular security audits and vulnerability assessments to identify and address potential security risks proactively.</li>
                <li>Penetration Testing: Our team performs penetration testing to simulate cyber-attacks and ensure our defenses are strong and effective.</li>
              </ul>
            </li>
            <li>
              <h3 className={'text-h5 inline-block mb-2'}>Data Backup and Recovery:</h3>
              <ul className={'list-inside list-disc pb-4 ml-5'}>
                <li>Automated Backups: We perform automated and regular backups of your data to ensure that your information is always available and can be restored in case of any data loss or disaster.</li>
                <li>Disaster Recovery Plan: Our comprehensive disaster recovery plan ensures minimal downtime and quick restoration of services in case of an emergency.</li>
              </ul>
            </li>
            <li>
              <h3 className={'text-h5 inline-block mb-2'}>Compliance:</h3>
              <ul className={'list-inside list-disc pb-4 ml-5'}>
                <li>Regulatory Compliance: We adhere to industry standards, including ISO 27001 and PCI DSS, ensuring that your data handling practices meet the highest compliance requirements.</li>
              </ul>
            </li>
            <li>
              <h3 className={'text-h5 inline-block mb-2'}>Secure Data Centers:</h3>
              <ul className={'list-inside list-disc pb-4 ml-5'}>
                <li>Physical Security: Our data centers are equipped with robust physical security measures, including 24/7 monitoring, access control, and surveillance.</li>
                <li>Redundant Infrastructure: We utilize redundant infrastructure to ensure high availability and reliability of your data, minimizing the risk of data loss or downtime.</li>
              </ul>
            </li>
            <li>
              <h3 className={'text-h5 inline-block mb-2'}>User Activity Monitoring:</h3>
              <ul className={'list-inside list-disc pb-4 ml-5'}>
                <li>Audit Logs: Maintain detailed audit logs of user activities to monitor access and changes to your data. This helps in detecting any unauthorized or suspicious activities.</li>
                <li>Real-Time Alerts: Receive real-time alerts for any unusual activities, enabling quick response and mitigation of potential security threats.</li>
              </ul>
            </li>
            <li>
              <h3 className={'text-h5 inline-block mb-2'}>Data Anonymization and Masking:</h3>
              <ul className={'list-inside list-disc pb-4 ml-5'}>
                <li>Privacy Protection: Implement data anonymization and masking techniques to protect sensitive information while maintaining the usability of the data for analysis and reporting.</li>
                <li>Secure Data Handling: Ensure that personal and sensitive data is handled securely, reducing the risk of data exposure.</li>
              </ul>
            </li>
            <li>
              <h3 className={'text-h5 inline-block mb-2'}>Regular Updates and Patches:</h3>
              <ul className={'list-inside list-disc pb-4 ml-5'}>
                <li>Security Patches: We regularly update and patch our systems to protect against newly discovered vulnerabilities and threats.</li>
                <li>Continuous Improvement: Our commitment to continuous improvement ensures that our security measures evolve to meet emerging threats and best practices.</li>
              </ul>
            </li>
            <li>
              <h3 className={'text-h5 inline-block mb-2'}>Employee Training and Awareness:</h3>
              <ul className={'list-inside list-disc pb-4 ml-5'}>
                <li>Security Training: Our employees undergo regular security training to stay informed about the latest security threats and best practices.</li>
                <li>Security Culture: We foster a culture of security awareness within our organization, ensuring that every team member understands the importance of data security and their role in maintaining it.</li>
              </ul>
            </li>
          </ol>
          <p>At Zaffre Tech, your data security is our top priority. We are dedicated to providing a secure and reliable platform that you can trust. By leveraging advanced security technologies and practices, we ensure that your data remains protected and confidential at all times.</p>
          <strong className={'block'}>For more information about our data security practices or to address any specific security concerns, please contact us at info@zaffretech.co or visit our website at <Link href={'/'}>www.zaffretech.co</Link>.</strong>
        </div>
      </main>
    </Fragment>
  );
}

DataSecurityPage.layout = LandingPage;