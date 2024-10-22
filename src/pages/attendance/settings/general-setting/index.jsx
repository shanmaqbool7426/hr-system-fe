import { SearchSelect } from "@/components/elements";
import DisclosureComponent from "@/components/elements/Disclosure";
import React from "react";
import { useTranslation } from "next-i18next"; 
export default function AttendanceGeneralSettingPage() {
  const { t } = useTranslation();
  const data = [
    { label: "Approval Level Type", placeholder: "Select One", value: "Complete" },
    { label: "Approval Type", placeholder: "Select One", value: "Complete" },
    { label: "Select Type", placeholder: "Select One", value: "Complete" },
    { label: "Approval Type 1", placeholder: "Select One", value: "Complete" },
    { label: "Select Type", placeholder: "Select One", value: "Complete" },
    { label: "Approval Type 2", placeholder: "Select One", value: "Complete" },
    { label: "Select Type", placeholder: "Select One", value: "Complete" },
    { label: "Employee", placeholder: "Select One", value: "Complete" },
]
  return (
    <section className="flex flex-col grow relative">
      <div className="flex justify-between pb-12">
        <div className="flex flex-col">
          <h1 className="text-h4 mb-0">{t("Attendance Settings")}</h1>
        </div>
      </div>
      <div className="zt-card grow">
        <div className="flex justify-between pb-6">
          <h2 className="text-h4 mb-0">{t("General Attendance Settings")}</h2>
        </div>
        <div className='flex flex-col gap-2'>
          <DisclosureComponent disclosureTitle={'Attendance Request Forwarding'} defaultOpen={true}>
            <div className='grid grid-cols-2 gap-4'>
              {data.map((ele, i) => (
                <SearchSelect key={i}
                  list={[{ value: `${ele.value}`, display: `${ele.value}` },]}
                  label={`${ele.label}`}
                  placeholder={`${ele.placeholder}`}
                  containerClass="!gap-2"
                />
              ))}
            </div>
          </DisclosureComponent>
          <DisclosureComponent disclosureTitle={'Exemption Request Forwarding'} defaultOpen={false}>
            <div className='grid grid-cols-2 gap-4'>
              {data.map((ele, i) => (
                <SearchSelect key={i}
                  list={[{ value: `${ele.value}`, display: `${ele.value}` },]}
                  label={`${ele.label}`}
                  placeholder={`${ele.placeholder}`}
                  containerClass="!gap-2"
                />
              ))}
            </div>
          </DisclosureComponent>
          <DisclosureComponent disclosureTitle={'Worksheet Request Forwarding'} defaultOpen={false}>
            <div className='grid grid-cols-2 gap-4'>
              {data.map((ele, i) => (
                <SearchSelect key={i}
                  list={[{ value: `${ele.value}`, display: `${ele.value}` },]}
                  label={`${ele.label}`}
                  placeholder={`${ele.placeholder}`}
                  containerClass="!gap-2"
                />
              ))}
            </div>
          </DisclosureComponent>
          <DisclosureComponent disclosureTitle={'Remote Work Request Forwarding'} defaultOpen={false}>
            <div className='grid grid-cols-2 gap-4'>
              {data.map((ele, i) => (
                <SearchSelect key={i}
                  list={[{ value: `${ele.value}`, display: `${ele.value}` },]}
                  label={`${ele.label}`}
                  placeholder={`${ele.placeholder}`}
                  containerClass="!gap-2"
                />
              ))}
            </div>
          </DisclosureComponent>
          <DisclosureComponent disclosureTitle={'Shift Request Forwarding'} defaultOpen={false}>
            <div className='grid grid-cols-2 gap-4'>
              {data.map((ele, i) => (
                <SearchSelect key={i}
                  list={[{ value: `${ele.value}`, display: `${ele.value}` },]}
                  label={`${ele.label}`}
                  placeholder={`${ele.placeholder}`}
                  containerClass="!gap-2"
                />
              ))}
            </div>
          </DisclosureComponent>
          <DisclosureComponent disclosureTitle={'Remote Work Request Forwarding'} defaultOpen={false}>
            <div className='grid grid-cols-2 gap-4'>
              {data.map((ele, i) => (
                <SearchSelect key={i}
                  list={[{ value: `${ele.value}`, display: `${ele.value}` },]}
                  label={`${ele.label}`}
                  placeholder={`${ele.placeholder}`}
                  containerClass="!gap-2"
                />
              ))}
            </div>
          </DisclosureComponent>

        </div>
      </div>
    </section>
  );
}
