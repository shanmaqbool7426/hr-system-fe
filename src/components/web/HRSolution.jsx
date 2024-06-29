import { ExpertSupport, PersonalizedSolutions, SeamlessIntegration, StreamlinedEfficiency } from '@/components/svg'
import React from 'react'

export default function HRSolution () {
  return (
    <section className='zt-section zt-section--HrSolution pb-20'>
      <div className='container'>
        <div className='zt-section__head text-center max-w-[1010px] w-full mx-auto pb-12'>
          <h2 className='mb-6'>Our comprehensive <span className='text-themeOrange'>AI-powered HR solution</span> delivers</h2>
          <p className='mb-0 px-[10%]'>Step into the forefront of HR management, where efficiency meets empowerment. Partner with us to reshape how you empower your workforce, unlocking time for innovation and business growth.</p>
        </div>

        <div className='zt-services grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-white'>
          <div className='zt-service rounded-2xl p-6' style={{background: 'linear-gradient(134.71deg, #F092B1 -1.52%, #F091B0 5.25%, #F08FAF 12.01%, #EF8AAC 18.78%, #EE84A7 25.55%, #ED7CA2 32.32%, #EB739B 39.09%, #EA6994 45.85%, #E85E8C 52.62%, #E75485 59.39%, #E54B7E 66.16%, #E44379 72.93%, #E33D74 79.7%, #E23871 86.46%, #E23670 93.23%, #E2356F 100%)'}}>
            <StreamlinedEfficiency />
            <div className='zt-service__content flex flex-col'>
              <h3 className='text-base text-white mt-3 mb-2'>Streamlined Efficiency</h3>
              <p className='mb-2 text-bmd'>Elevate productivity and operational effectiveness by optimizing workflows with our intuitive solutions designed for seamless operations.</p>
            </div>
          </div>

          <div className='zt-service rounded-2xl p-6' style={{background: 'linear-gradient(134.76deg, #8769FF 0%, #8769FF 6.56%, #8668FE 13.12%, #8466FC 19.68%, #8264F9 26.24%, #7F60F5 32.8%, #7B5DF1 39.36%, #7759ED 45.92%, #7354E8 52.49%, #6F50E3 59.05%, #6C4CDF 65.61%, #6849DC 72.17%, #6647D9 78.73%, #6445D7 85.29%, #6344D6 91.85%, #6344D6 98.41%)'}}>
            <PersonalizedSolutions />
            <div className='zt-service__content flex flex-col'>
              <h3 className='text-base text-white mt-3 mb-2'>AI-Powered HR Solution</h3>
              <p className='mb-2 text-bmd'>Experience the future of HR management with our AI-powered solution. Streamline processes, enhance decision-making, and boost productivity effortlessly.</p>
            </div>
          </div>

          <div className='zt-service rounded-2xl p-6' style={{background: 'linear-gradient(133.84deg, #56DAFF 0%, #56D9FE 6.67%, #54D8FD 13.33%, #51D5FA 20%, #4ED1F6 26.67%, #49CCF1 33.33%, #43C6EB 40%, #3DBFE4 46.67%, #37B8DD 53.33%, #31B1D7 60%, #2BABD0 66.67%, #26A6CB 73.33%, #23A2C7 80%, #209FC5 86.67%, #1E9EC3 93.33%, #1E9DC2 100%)'}}>
            <SeamlessIntegration />
            <div className='zt-service__content flex flex-col'>
              <h3 className='text-base text-white mt-3 mb-2'>Integrate with Any API Platform</h3>
              <p className='mb-2 text-bmd'>Seamlessly integrate with API enabled platforms to enhance connectivity and optimize functionality across diverse systems for streamlined operations.</p>
            </div>
          </div>

          <div className='zt-service rounded-2xl p-6' style={{background: 'linear-gradient(90deg, #F48F1B 0%, #F48F1B 6.67%, #F48D1B 13.33%, #F58B1C 20%, #F5871D 26.67%, #F6821E 33.33%, #F77D1F 40%, #F87720 46.67%, #F97122 53.33%, #FA6B23 60%, #FB6624 66.67%, #FC6125 73.33%, #FC5D26 80%, #FD5B27 86.67%, #FD5927 93.33%, #FD5927 100%)'}}>
            <ExpertSupport />
            <div className='zt-service__content flex flex-col'>
              <h3 className='text-base text-white mt-3 mb-2'>24/7 Dedicated Support</h3>
              <p className='mb-2 text-bmd'>Enjoy peace of mind with our 24/7 dedicated support, ensuring prompt assistance and expert guidance whenever you need it.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

