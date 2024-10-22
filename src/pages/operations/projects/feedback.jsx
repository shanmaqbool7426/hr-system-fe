import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next';
import { Button, Tabs } from '@/components/elements'; 
import { Tab } from '@headlessui/react'
import TaskFeedbackForm from '@/components/forms/projects/taskFeedback';
import ProjectFeedbackForm from '@/components/forms/projects/projectFeedback';
import CompletedTaskModule from '@/modules/projects/completedTasks';
import CompletedProjectsModule from '@/modules/projects/completedProjects';

export default function FeedbackPage() {
  const { t } = useTranslation();
  const [taskFeedback, setTaskFeedback] = useState(false)
  const [projectFeedback, setProjectFeedback] = useState(false)
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
      <div className="flex justify-between pb-6">
        <div className="flex flex-col">
          <h1 className="text-h4 mb-0">{t("Feedback")}</h1>
        </div>
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
      {taskFeedback && <TaskFeedbackForm 
        onClose={() => { setTaskFeedback(false) }}
      />}
       {projectFeedback && <ProjectFeedbackForm
        onClose={() => { setProjectFeedback(false) }}
      />}
    </section>
  )
}