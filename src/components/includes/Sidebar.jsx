import { useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Attendance,
  Connect,
  Dashboard,
  Employees,
  HelpLine,
  Leave,
  Organization,
  Payroll,
  Projects,
  Recruitment,
  RemoteWork,
  Report,
} from "../svg";

export default function Sidebar() {
  const router = useRouter();
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);
  const [openSubIndex, setOpenSubIndex] = useState(null);

  const toggleVisibility = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const toggleVisibilityInnerSubMenu = (openSubIndex) => {
    setOpenSubIndex((prevIndex) =>
      prevIndex === openSubIndex ? null : openSubIndex
    );
  };

  const Navigation = [
    { icon: <Dashboard />, name: t("Dashboard"), href: "/dashboard" },
    {
      icon: <Employees />,
      name: t("Employees"),
      href: "/employees",
      subMenu: [
        { name: t("Employee Dashboard"), href: "/employees/dashboard" },
        { name: t("Employee List"), href: "/employees/list" },
        { name: t("Employee Role"), href: "/employees/roles" },
        { name: t("Re-Hire Employee"), href: "/employees/re-hire" },
        {
          name: t("Change Request"),
          innerSubMenu: [
            {
              name: t("Change Designation"),
              href: "/employees/change-request/designation",
            },
            {
              name: t("Change Department"),
              href: "/employees/change-request/department",
            },
            {
              name: t("Change Employee Code"),
              href: "/employees/change-request/code",
            },
            {
              name: t("Change Salary"),
              href: "/employees/change-request/salary",
            },
            {
              name: t("Change Grade"),
              href: "/employees/change-request/grade",
            },
            {
              name: t("Change Line Manager"),
              href: "/employees/change-request/line-manager",
            },
          ],
        },
        {
          name: t("Employee Resignation"),
          href: "/employees/resignation-request",
        },
        { name: t("Employee Transition"), href: "/employees/transition" },
        { name: t("Employee Transfer"), href: "/employees/transfer" },
        { name: t("Employee Settings"), href: "/employees/settings" },
      ],
    },
    {
      icon: <Attendance />,
      name: t("Attendance"),
      href: "/attendance",
      subMenu: [
        { name: t("Attendance Request"), href: "/" },
        { name: t("Exemption Request"), href: "/" },
        { name: t("Attendance Approval"), href: "/" },
        { name: t("Remote Work Request"), href: "/" },
        { name: t("Change Shift"), href: "/" },
        { name: t("Amend Attendance"), href: "/" },
        { name: t("Schedule"), href: "/" },
        { name: t("Close Attendance"), href: "/" },
        { name: t("Attendance Restrictions"), href: "/" },
        { name: t("Attendance Settings"), href: "/attendance/settings" },
      ],
    },
    {
      icon: <Leave />,
      name: t("Leave"),
      href: "/leave",
      subMenu: [
        { name: t("Leave Dashboard"), href: "/leaves/dashboard" },
        { name: t("Leave Policies"), href: "/leaves" },
        { name: t("Leave Request"), href: "/leaves/requests" },
        { name: t("Leave Approval"), href: "/leaves/approvals" },
        { name: t("CPL Request"), href: "/leaves/cpl-requests" },
        { name: t("Gazetted Holidays"), href: "/leaves/gazetted-holidays" },
        { name: t("Leave Setting"), href: "/leaves/settings" },
      ],
    },
    { icon: <Projects />, name: t("Projects"), href: "/projects" },
    { icon: <Connect />, name: t("Connect"), href: "/connect" },
    { icon: <RemoteWork />, name: t("Remote Work"), href: "/remote-work" },
    {
      icon: <Recruitment />,
      name: t("Recruitment"),
      href: "/recruitment/",
      subMenu: [
        { name: t("Dashboard"), href: "/recruitment/" },
        { name: t("Manage Jobs"), href: "/recruitment/manage-jobs" },
        { name: t("Manage Resumes"), href: "/recruitment/manage-resume" },
        { name: t("Candidates List"), href: "/recruitment/candidates" },
        { name: t("Shortlist candidates"), href: "/recruitment/shortlisted" },
        {
          name: t("Schedule Interview"),
          href: "/recruitment/schedule-interviews",
        },
        { name: t("Offer Approvals"), href: "/recruitment/offers-approvals" },
        { name: t("Experience Level"), href: "/recruitment/experience-level" },
        { name: t("Aptitude Results"), href: "/recruitment/aptitude-result" },
        { name: t("Evaluation"), href: "/recruitment/evaluation" },
      ],
    },
    {
      icon: <Payroll />,
      name: t("Payroll"),
      href: "/payroll",
      subMenu: [
        { name: t("Payroll Setup"), href: "/" },
        { name: t("Salary Setup"), href: "/" },
        { name: t("Run Payroll"), href: "/" },
        { name: t("Salary Deduction"), href: "/" },
        { name: t("Allowance/ Arrears"), href: "/" },
        { name: t("Payroll Approval"), href: "/" },
        { name: t("Tax Adjustment Request"), href: "/" },
        { name: t("Overtime Request"), href: "/" },
        { name: t("Reimbursement Request"), href: "/" },
        { name: t("Commission Request"), href: "/" },
        { name: t("Advance Salary Request"), href: "/" },
        { name: t("Loan Request"), href: "/" },
        { name: t("Loan Adjustment Request"), href: "/" },
        { name: t("PF Withdrawal Request"), href: "/" },
        { name: t("Payroll Setting"), href: "/" },
      ],
    },
    {
      icon: <Report />,
      name: t("Report"),
      href: "/report",
      subMenu: [
        {
          name: t("HR Reports"),
          innerSubMenu: [
            { name: t("Employee Change History"), href: "/" },
            { name: t("Hiring Details"), href: "/" },
            { name: t("Separation Details"), href: "/" },
            { name: t("Employee Role Report"), href: "/" },
            { name: t("Employee List"), href: "/" },
            { name: t("Employee Profile"), href: "/" },
            { name: t("Employee Dependent"), href: "/" },
            { name: t("Department Head Count"), href: "/" },
            { name: t("Employee Clearance"), href: "/" },
            { name: t("Employee Documents"), href: "/" },
          ],
        },
        { name: t("Employee Cards"), href: "/" },
        { name: t("Employee Reports"), href: "/" },
        { name: t("Attendance Reports"), href: "/" },
        { name: t("Leave Reports"), href: "/" },
        { name: t("Payroll Reports"), href: "/" },
        { name: t("Recruitment Reports"), href: "/" },
        { name: t("Separation Reports"), href: "/" },
        { name: t("Overtime Reports"), href: "/" },
        { name: t("Reports Setting"), href: "/" },
        { name: t("Employee Assets"), href: "/" },
        { name: t("Attendance Restriction"), href: "/" },
      ],
    },
    {
      icon: <Organization />,
      name: t("Organization"),
      href: "/organization",
      subMenu: [
        { name: t("System logs"), href: "/organization/system-logs" },
        { name: t("Announcements"), href: "/organization/announcements" },
        { name: t("Projects"), href: "/organization/projects" },
        { name: t("Tasks"), href: "/organization/tasks" },
        {
          name: t("Inventory"),
          innerSubMenu: [
            { name: t("Asset List"), href: "/organization/inventory" },
            {
              name: t("Asset History"),
              href: "/organization/inventory/asset-history",
            },
            {
              name: t("Repair History"),
              href: "/organization/inventory/repair-history",
            },
            {
              name: t("Delete History"),
              href: "/organization/inventory/delete-history",
            },
          ],
        },
        {
          name: t("Custom Fields"),
          innerSubMenu: [
            { name: t("Group"), href: "/organization/custom-fields/group" },
            {
              name: t("Designation"),
              href: "/organization/custom-fields/designation",
            },
            {
              name: t("Allowance Title"),
              href: "/organization/custom-fields/allowance-title",
            },
            {
              name: t("Deduction Title"),
              href: "/organization/custom-fields/deduction-title",
            },
            {
              name: t("Station"),
              href: "/organization/custom-fields/employee-station",
            },
            {
              name: t("Bank"),
              href: "/organization/custom-fields/employee-bank",
            },
            {
              name: t("Job Title"),
              href: "/organization/custom-fields/job-title",
            },
            {
              name: t("Job Field"),
              href: "/organization/custom-fields/job-field",
            },
            {
              name: t("Asset Type"),
              href: "/organization/custom-fields/asset-type",
            },
            {
              name: t("Asset Status"),
              href: "/organization/custom-fields/asset-status",
            },
            { name: t("Prefix"), href: "/organization/custom-fields/prefix" },
            {
              name: t("Employee Status"),
              href: "/organization/custom-fields/employee-status",
            },
            {
              name: t("Bank Branch"),
              href: "/organization/custom-fields/bank-branch",
            },
            { name: t("Client"), href: "/organization/custom-fields/clients" },
            { name: t("Country"), href: "/organization/custom-fields/country" },
            {
              name: t("Province"),
              href: "/organization/custom-fields/province",
            },
            { name: t("City"), href: "/organization/custom-fields/city" },
            { name: t("Area"), href: "/organization/custom-fields/area" },
            { name: t("Vendor"), href: "/organization/custom-fields/vendor" },
            { name: t("Region"), href: "/organization/custom-fields/region" },
            {
              name: t("Cost Center"),
              href: "/organization/custom-fields/cost-center",
            },
            {
              name: t("G.L Class"),
              href: "/organization/custom-fields/glclass",
            },
            {
              name: t("Documents"),
              href: "/organization/custom-fields/documents",
            },
            {
              name: t("Marital Type"),
              href: "/organization/custom-fields/marital-status",
            },
            {
              name: t("Exit Type"),
              href: "/organization/custom-fields/exit-type",
            },
            {
              name: t("Expense Unit"),
              href: "/organization/custom-fields/expense",
            },
            {
              name: t("Resign Type"),
              href: "/organization/custom-fields/resign-type",
            },
            {
              name: t("Division"),
              href: "/organization/custom-fields/division",
            },
            { name: t("Grade"), href: "/organization/custom-fields/grade" },
            { name: t("Floor"), href: "/organization/custom-fields/floor" },
            { name: t("Room"), href: "/organization/custom-fields/room" },
            {
              name: t("University"),
              href: "/organization/custom-fields/university",
            },
            { name: t("Gender"), href: "/organization/custom-fields/gender" },
            {
              name: t("Minimum Wage"),
              href: "/organization/custom-fields/minimum-wage",
            },
          ],
        },
        { name: t("Settings"), href: "/organization/settings" },
        { name: t("Departments"), href: "/organization/departments" },
      ],
    },
  ];

  return (
    <aside id="zt-sidebar" className="zt-sidebar">
      {Navigation.map((item, index) => (
        <AnimatePresence key={index}>
          {item.subMenu && openIndex === index && (
            <motion.div
              className="zt-subMenu"
              initial={{ opacity: 0, visibility: "hidden" }}
              animate={{ opacity: 1, visibility: "visible" }}
              exit={{ opacity: 0, visibility: "hidden" }}
              transition={{ duration: 0.3 }}
            >
              <strong className="block py-[6px] px-[12px] text-h4">
                {item.name}
              </strong>
              <ul className="zt-customScrollbar select-none">
                {item.subMenu.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className={`${
                      subItem.innerSubMenu && "zt-hasInnerDropDown"
                    }  ${subIndex === openSubIndex ? " zt-active" : ""}`}
                  >
                    {subItem.innerSubMenu ? (
                      <a
                        href="javascript:void(0);"
                        onClick={() => {
                          toggleVisibilityInnerSubMenu(subIndex);
                        }}
                      >
                        {subItem.name}
                      </a>
                    ) : (
                      <Link
                        href={subItem.href}
                        onClick={() => {
                          toggleVisibility(index);
                        }}
                      >
                        {subItem.name}
                      </Link>
                    )}

                    {subItem.innerSubMenu && openSubIndex === subIndex && (
                      <motion.div
                        className="zt-innerSubMenu"
                        initial={{ opacity: 0, visibility: "hidden" }}
                        animate={{ opacity: 1, visibility: "visible" }}
                        exit={{ opacity: 0, visibility: "hidden" }}
                        transition={{ duration: 0.3 }}
                      >
                        <ul>
                          {subItem.innerSubMenu.map(
                            (innerSubMenuItem, innerSubMenuIndex) => (
                              <li
                                key={innerSubMenuIndex}
                                className={
                                  router.asPath === innerSubMenuItem.href
                                    ? "zt-active"
                                    : ""
                                }
                              >
                                <Link
                                  href={innerSubMenuItem.href}
                                  onClick={() => {
                                    toggleVisibility(index);
                                  }}
                                >
                                  {innerSubMenuItem.name}
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      </motion.div>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      <div className="zt-sidebarHolder">
        <nav
          id="zt-sidebarNav"
          className="zt-customScrollbar zt-sidebarNav grow"
        >
          <ul className="mt-6">
            {Navigation.map((item, index) => (
              <li
                key={index}
                className={`${item.subMenu && "zt-hasDropDown"} ${
                  router.asPath.includes(item.href) && "zt-active"
                }`}
              >
                {item?.subMenu ? (
                  <a
                    data-title={item.name}
                    href="#"
                    onClick={() => toggleVisibility(index)}
                  >
                    <span className="zt-menuIcon">{item.icon}</span>
                    {/* <span className="zt-menuText">{item.name}</span> */}
                  </a>
                ) : (
                  <Link
                    data-title={item.name}
                    href={item.href}
                    onClick={() => toggleVisibility(index)}
                  >
                    <span className="zt-menuIcon">{item.icon}</span>
                    {/* <span className="zt-menuText">{item.name}</span> */}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <span className="px-2 flex flex-col">
          <Link href={"/help-desk"} className="btn-helpDesk text-white">
            <span className="zt-menuIcon text-white">
              <HelpLine />
            </span>
            {/* <span className="zt-menuText text-white">Help Desk</span> */}
          </Link>
        </span>
      </div>
    </aside>
  );
}
