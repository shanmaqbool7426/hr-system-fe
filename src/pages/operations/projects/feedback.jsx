import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Button, Tabs } from '@/components/elements'; 
import { Tab } from '@headlessui/react'
import FeedbackForm from '@/components/forms/projects/feedback';
import CompletedTaskModule from '@/modules/projects/completedTasks';
import CompletedProjectsModule from '@/modules/projects/completedProjects';

export default function FeedbackPage() {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState(false)
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  useEffect(() => {
    const savedTabIndex = localStorage.getItem('selectedTabIndex');
    if (savedTabIndex !== null) {
      setSelectedTabIndex(Number(savedTabIndex));
    }
  }, []);

  const handleTabChange = (index) => {
    setSelectedTabIndex(index);
    localStorage.setItem('selectedTabIndex', index);
  };
  return (
    <section className="flex flex-col grow relative">
      {/* {is_loading && <PageLoader/>} */}
      <div className="flex justify-between pb-6">
        <div className="flex flex-col">
          <h1 className="text-h4 mb-0">{t("Feedback")}</h1>
        </div>
        {/* <Button className={"btn btn-primary"} onClick={() => setFeedback(true)}>{t("Add Feedback")}</Button> */}
      </div>

      <Tabs
        containerClasses={'zt-themeTabsV2 grow'}
        tabNavClasses={'zt-themeTabNav'}
        tabs={["Completed Projects", "Completed Tasks"]}
        selectedIndex={selectedTabIndex}
        onChange={handleTabChange}
      >
        <Tab.Panels className={`zt-themeTabPanels zt-employeeTabsPanel !bg-transparent !p-0`}>
          <Tab.Panel className={'zt-themeTabPanel'}>
            <CompletedProjectsModule />
          </Tab.Panel>
          <Tab.Panel className={'zt-themeTabPanel'}>
            <CompletedTaskModule />
          </Tab.Panel>
        </Tab.Panels>

      </Tabs>
      {feedback && <FeedbackForm 
        onClose={() => { setFeedback(false) }}
      />}
    </section>
  )
}