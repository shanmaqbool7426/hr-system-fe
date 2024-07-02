import { Tab } from '@headlessui/react' 


export default function Tabs({ children, tabs, panels, containerClasses, tabNavClasses, tabPanelClasses }) {
    return (
        <Tab.Group as={'div'} className={`${containerClasses}`}>
            <nav className={`${tabNavClasses ? tabNavClasses : 'zt-themeTabs'}`}>
                <Tab.List as={'ul'}>
                    {tabs.map((value, index) => (
                        <Tab as={'li'} key={index}>
                            {({ selected }) => (<button className={`${selected && "zt-activeTab"}`}>{value}</button>)}
                        </Tab>
                    ))}
                </Tab.List>
            </nav>
            {children ? children :
             <Tab.Panels className={`zt-themeTabPanels ${tabPanelClasses}`}>
                {panels.map((value, index) => (
                    <Tab.Panel className={'zt-themeTabPanel'} key={index}>
                        {value}
                    </Tab.Panel>
                ))}
            </Tab.Panels>}
        </Tab.Group>
    )
}