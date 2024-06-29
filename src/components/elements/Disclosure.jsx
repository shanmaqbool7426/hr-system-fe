import { Disclosure } from '@headlessui/react'
import React from 'react'
import { ChevronDown } from '../svg'

const DisclosureComponent = ({ defaultOpen, disclosureTitle, children }) => {
    return (
        <Disclosure as="div" className='zt-themeDisclosure' defaultOpen={defaultOpen}>
            {({ open }) => (
                <>
                    <Disclosure.Button className="zt-themeDisclosureBtn">
                        <span className=''>
                            {disclosureTitle}
                        </span>
                        <ChevronDown className={`${open ?"rotate-180":""}`} />
                    </Disclosure.Button>
                    <Disclosure.Panel className="zt-themeDisclosurePanel">
                        {children}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default DisclosureComponent

