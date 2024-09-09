import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Profile } from "../elements";
import { Edit } from "../svg";

export default function EmployeeInfo({ employee }) {
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);

  return (
    <>
      <span
        onClick={() => {
          setEdit(!edit);
        }}
        className={"text-themePurple cursor-pointer absolute top-5 right-5 z-10"}
      >
        <Edit width={"1.5rem"} height={"auto"} />
      </span>
      {edit ? (
        <div className={"px-4"}>
          <h2>Form would be here</h2>
        </div>
      ) : (
        <>
          <div className="px-4 border-r border-dashed border-themeGrayscale600">
            <Profile
              image={employee?.avatar}
              width={100}
              height={100}
              nameClass={`w-24 h-24 text-3xl`}
              name={employee?.firstName}
              lastName={employee?.lastName}
            />
            <div className="flex flex-col">
              <h2 className="mb-0 text-h5">{t(employee?.firstName + " " + employee?.lastName)}</h2>
              <p className="flex-col !items-start">
                <span>{t(employee?.department?.name)}</span>
                <strong className="text-themePurple">{t(employee?.designation?.title)}</strong>
              </p>
              <p className="mb-0 gap-4">
                <span>{t("Employee ID")}</span>
                <strong>{t(employee?.employeeId)}</strong>
              </p>
              <p className="gap-4">
                <span>{t("Joining Date")}</span>
                <time dateTime={t(employee?.joiningDate)}>{t(employee?.joiningDate)}</time>
              </p>
              <p className="mb-0">
                <span className="zt-tag zt-tag-purple">{t(employee?.employmentStatus)}</span>
              </p>
            </div>
          </div>

          <div className="px-4 border-l border-dashed border-themeGrayscale600">
            <ul>
              <li>
                <span>Email</span>
                <a className="text-sm text-themePurple" href="mailto:lincoln@gmail.com">
                  {t(employee?.email)}
                </a>
              </li>
              <li>
                <span>{t("Phone Number")}</span>
                <strong className="text-themePurple">{t(employee?.phone)}</strong>
              </li>
              <li>
                <span>{t("Birthday")}</span>
                <time dateTime={t(employee?.dob)}>{t(employee?.dob)}</time>
              </li>
              <li>
                <span>{t("Line Manager")}</span>
                <strong className="text-themePurple">{t(employee?.lineManager)}</strong>
              </li>
              <li>
                <span>{t("Address")}</span>
                <address>{t(employee?.address)}</address>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
}
