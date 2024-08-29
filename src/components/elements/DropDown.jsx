import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react' 

export default function DropDown({ children, title, icon, items, size }) {
  return (
    <Menu as="div" className="zt-themeDropDown">
      <Menu.Button className="zt-btnDropDown select-none">{title} {icon}</Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {children ||
          <div className={`zt-themeDropDownList ${size}`}>
            <Menu.Items as='ul'>
              {items && items?.map((item, index) =>
                <Menu.Item as='li' className='w-full' key={index}>{({ active }) => item}</Menu.Item>
              )}
            </Menu.Items>
          </div>
        }
      </Transition>
    </Menu>
  )
}
