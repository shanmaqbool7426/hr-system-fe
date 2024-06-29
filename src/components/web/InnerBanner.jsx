import React from 'react'

const InnerBanner = ({ pageTitle }) => {
  return (
    <section className={'zt-innerBanner'} style={{background: 'linear-gradient(90deg, #F48F1B 0%, #F48F1B 6.67%, #F48D1B 13.33%, #F58B1C 20%, #F5871D 26.67%, #F6821E 33.33%, #F77D1F 40%, #F87720 46.67%, #F97122 53.33%, #FA6B23 60%, #FB6624 66.67%, #FC6125 73.33%, #FC5D26 80%, #FD5B27 86.67%, #FD5927 93.33%, #FD5927 100%)'}}>
      <div className={'container py-20'}>
        <h1 className='text-h2 text-center text-white mb-0'>{pageTitle}</h1>
      </div>
    </section>
  )
}

export default InnerBanner