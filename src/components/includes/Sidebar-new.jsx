import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
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
  const router = useRouter()
  const route = router.asPath?.split('/')
  const { t } = useTranslation()
  const [selected, setSelected] = useState(route[1] || "")
  const [subMenu, setSubMenu] = useState(route.slice(0, 3).join('/'))
  const MiniBar = [
    { icon: Dashboard, name: t("Dashboard"), href: "/dashboard", page: true },
    { icon: Employees, name: t("Employees"), href: "employees" },
    { icon: Attendance, name: t("Attendance"), href: "attendance" },
    { icon: Leave, name: t("Leave"), href: "leave" },
    { icon: Projects, name: t("Operations"), href: "operations" },
    { icon: Connect, name: t("Connect"), href: "connect", },
    { icon: RemoteWork, name: t("Remote Work"), href: "remoteWork" },
    { icon: Recruitment, name: t("Recruitment"), href: "recruitment" },
    { icon: Payroll, name: t("Payroll"), href: "payroll" },
    { icon: Report, name: t("Report"), href: "report" },
    { icon: Organization, name: t("Organization"), href: "organization" }
  ]

  const Navigation = {
    employees: [
      { name: t("Employee Dashboard"), href: "/employees/dashboard" },
      { name: t("Employee List"), href: "/employees/list" },
      { name: t("Employee Role"), href: "/employees/roles" },
      {
        name: t("Change Request"),
        href: "/employees/change-request",
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
          { name: t("Change Grade"), href: "/employees/change-request/grade" },
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
      { name: t("Employee Onboarding"), href: "/employees/onboarding" },
      { name: t("Inactive Employee"), href: "/employees/inactive" },
      { name: t("Exit Clearance"), href: "/employees/exit-clearance" },
      {
        name: t("Employee Settings"), href: "/employees/settings",
        innerSubMenu: [
          { name: t("Approval Level"), href: "/employees/settings/approval-level", },
          { name: t("Employee Field Approval"), href: "/employees/settings/field-approval-settings" },
          { name: t("Exit/ Onboarding Assets"), href: "/employees/settings/exit-onboarding-assets" },
        ],
      },
    ],
    attendance: [
      { name: t("Attendance Dashboard"), href: "/attendance/dashboard" },
      { name: t("Attendance Request"), href: "/attendance/requests" },
      { name: t("Exemption Request"), href: "/attendance/exemptions" },
      {
        name: t("Remote Work Request"),
        href: "/attendance/remote-work-requests",
      },
      { name: t("Change Shift"), href: "/attendance/change-shift" },
      { name: t("Amend Attendance"), href: "/attendance/amend-attendance" },
      { name: t("Month Close"), href: "/attendance/month-close" },
      { name: t("Attendance Restrictions"), href: "/attendance/restrictions" },
      {
        name: t("Attendance Settings"), href: "/attendance/settings",
        innerSubMenu: [
          { name: t('Shift Plan'), href: "/attendance/settings/shift-plan" },
          { name: t('Request Reason Type'), href: "/attendance/settings/reason-type" },
          { name: t('Flags Setting'), href: "/attendance/settings/flags-setting" },
          { name: t('Attendance Penalty Rule'), href: "/attendance/settings/penalty-rule" },
          { name: t('General Settings'), href: "/attendance/settings/general-setting" },
          { name: t('Biometric Devices '), href: "/attendance/settings/biometric-setting" },
        ]
      },
    ],
    leave: [
      { name: t("Leave Dashboard"), href: "/leaves/dashboard" },
      { name: t("Leave Request"), href: "/leaves/requests" },
      { name: t("CPL Request"), href: "/leaves/cpl-requests" },
      { name: t("Gazetted Holidays"), href: "/leaves/gazetted-holidays" },
      {
        name: t("Leave Setting"), href: "/leaves/settings",
        innerSubMenu: [
          { name: t("Leave Policies"), href: "/leaves" },
          // { name: t('Leave Type Settings'), href: "/leaves/settings/type-setting" },
          { name: t('Employee Leave Quota'), href: "/leaves/settings/employee-leave-quota" },
          { name: t('General Leave Settings'), href: "/leaves/settings/general-setting" },
        ]
      },
    ],
    operations: [
      {
        name: t("Projects Management"), href: "/operations/projects",
        innerSubMenu: [
          { name: t('Dashboard'), href: "/operations/projects/dashboard" },
          { name: t("Projects"), href: "/operations/projects" },
          { name: t("Task Board"), href: "/operations/projects/task-board" },
          { name: t("Awaiting Tasks"), href: "/operations/projects/awaiting-tasks" },
          { name: t("Overdue Tasks"), href: "/operations/projects/overdue-tasks" },
          { name: t("Feedback"), href: "/operations/projects/feedback" },
          { name: t("Reported Task"), href: "/operations/projects/reported-task" },
        ]
      },
      {
        name: t("Helpdesk"), href: "/operations/helpdesk",
        innerSubMenu: [
          { name: t('Dashboard'), href: "/operations/helpdesk/dashboard" },
          { name: t("Tickets"), href: "/operations/helpdesk/tickets" },
        ]
      },
      {
        name: t("Procurement"), href: "/operations/procurement",
        innerSubMenu: [
          { name: t('Dashboard'), href: "/operations/procurement/dashboard" },
          { name: t('Vendors'), href: "/operations/procurement/vendors" },
          { name: t('Quotations'), href: "/operations/procurement/quotations" },
          { name: t('Quoted Prices'), href: "/operations/procurement/quoted-prices" },
          { name: t("Purchasing"), href: "/operations/procurement/purchasing" },
          { name: t("Maintenance"), href: "/operations/procurement/maintenance" },
          { name: t("Asset Repearing"), href: "/operations/procurement/asset-repearing" },
          { name: t("Rejected Items"), href: "/operations/procurement/rejected-items" },
        ]
      },
      {
        name: t("Inventory"), href: "/operations/inventory",
        innerSubMenu: [
          { name: t('Asset List'), href: "/operations/inventory" },
          { name: t('Asset History'), href: "/operations/inventory/asset-history" },
          { name: t('Repair History'), href: "/operations/inventory/repair-history" },
          { name: t('Delete History'), href: "/operations/inventory/delete-history" },
        ]
      },
      {
        name: t("Meal"), href: "/operations/meal",
        innerSubMenu: [
          { name: t("Meal Menu"), href: "/operations/meal/meal-menu" },
          { name: t("Employee Availing"), href: "/operations/meal/employee-availing" },
        ]
      },
    ],
    connect: [
      { name: t("Chat"), href: "/connect/chat" },
      { name: t("Call"), href: "/connect/call" },
    ],
    recruitment: [
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
    payroll: [
      { name: t("Payroll Setup"), href: "/payroll" },
      { name: t("Salary Setup"), href: "/payroll/salary-setup" },
      { name: t("Run Payroll"), href: "/payroll/run-payroll" },
      { name: t("Salary Deduction"), href: "/payroll/salary-deduction" },
      { name: t("Allowance/ Arrears"), href: "/payroll/allowance-arrears" },
      { name: t("Payroll Approval"), href: "/payroll/approval" },
      { name: t("Final Settlement"), href: "/payroll/final-settlement" },
      { name: t("Tax Adjustment Request"), href: "/payroll/tax-adjustment" },
      { name: t("Overtime Request"), href: "/payroll/overtime" },
      { name: t("Reimbursement Request"), href: "/payroll/reimbursement" },
      { name: t("Commission Request"), href: "/payroll/commission" },
      { name: t("Advance Salary Request"), href: "/payroll/advance-salary" },
      { name: t("Loan Request"), href: "/payroll/loan" },
      { name: t("Loan Adjustment Request"), href: "/payroll/loan-adjustment" },
      { name: t("PF Withdrawal Request"), href: "/payroll/pf-withdrawal" },
      { name: t("Payroll Setting"), href: "/payroll/setting" },
    ],
    remoteWork: [
      { name: t("Remote Work Dashboard"), href: "/remote-work" },
      { name: t("My Remote Work"), href: "/remote-work/my-remote-work" },
      { name: t("Screenshot"), href: "/remote-work/screenshot" },
      {
        name: t("Setting"), href: "/remote-work/setting",
        innerSubMenu: [
          // { name: t('Profile'), href: "/remote-work/setting/profile" },
          { name: t('Remote Employees'), href: "/remote-work/setting/remote-employees" },
          { name: t('Remote Teams'), href: "/remote-work/setting/teams" },
          { name: t('Account'), href: "/remote-work/setting/account" },
          { name: t('Apps'), href: "/remote-work/setting/apps" },
          { name: t('Category'), href: "/remote-work/setting/category" },
        ]
      },
    ],
    report: [
      {
        name: t("HR Reports"),
        innerSubMenu: [
          { name: t("Employee Change History"), href: "/report/hr-reports/employee-change-history" },
          { name: t("Hiring Details"), href: "/report/hr-reports/hiring-details" },
          { name: t("Separation Details"), href: "/report/hr-reports/separation-details" },
          { name: t("Employee Role Report"), href: "/report/hr-reports/employee-role-report" },
          { name: t("Employee List"), href: "/report/hr-reports/employee-list" },
          { name: t("Employee Profile"), href: "/report/hr-reports/employee-profile" },
          { name: t("Employee Dependent"), href: "/report/hr-reports/employee-dependent" },
          { name: t("Department Head Count"), href: "/report/hr-reports/department-head-count" },
          { name: t("Employee Clearance"), href: "/report/hr-reports/employee-clearance" },
          { name: t("Employee Documents"), href: "/report/hr-reports/employee-documents" },
        ]
      },
      { name: t("Employee Cards"), href: "/report/employee-cards" },
      { name: t("Employee Reports"), href: "/report/employee-reports" },
      { name: t("Attendance Reports"), href: "/report/attendance-reports" },
      { name: t("Leave Reports"), href: "/report/leave-reports" },
      { name: t("Payroll Reports"), href: "/report/payroll-reports" },
      { name: t("Recruitment Reports"), href: "/report/recruitment-reports" },
      { name: t("Separation Reports"), href: "/report/separation-reports" },
      { name: t("Overtime Reports"), href: "/report/overtime-reports" },
      { name: t("Reports Setting"), href: "/report/reports-setting" },
      { name: t("Employee Assets"), href: "/report/employee-assets" },
      { name: t("Attendance Restriction"), href: "/report/attendance-restriction" },
    ],
    organization: [
      { name: t("System logs"), href: "/organization/system-logs" },
      { name: t("Announcements"), href: "/organization/announcements" },
      {
        name: t("Custom Fields"), href: "/organization/custom-fields",
        innerSubMenu: [
          { name: t("Group"), href: "/organization/custom-fields/group" },
          { name: t("Designation"), href: "/organization/custom-fields/designation" },
          { name: t("Helpdesk Departement"), href: "/organization/custom-fields/helpdesk-departement" },
          { name: t("Helpdesk Categories"), href: "/organization/custom-fields/helpdesk-categories" },
          { name: t("Vendors Rating Values"), href: "/organization/custom-fields/vendors-rating-values" },
          { name: t("Onboarding Tasks"), href: "/organization/custom-fields/employee-onboarding" },
          { name: t("Exit Clearance"), href: "/organization/custom-fields/exit-clearance" },
          { name: t("Allowance Title"), href: "/organization/custom-fields/allowance-title" },
          { name: t("Deduction Title"), href: "/organization/custom-fields/deduction-title" },
          { name: t("Station"), href: "/organization/custom-fields/station" },
          { name: t("Bank"), href: "/organization/custom-fields/bank" },
          { name: t("Job Title"), href: "/organization/custom-fields/job-title" },
          { name: t("Job Field"), href: "/organization/custom-fields/job-field" },
          { name: t("Asset Type"), href: "/organization/custom-fields/asset-type" },
          { name: t("Asset Status"), href: "/organization/custom-fields/asset-status" },
          { name: t("Prefix"), href: "/organization/custom-fields/prefix" },
          { name: t("Employee Status"), href: "/organization/custom-fields/employee-status" },
          { name: t("Bank Branch"), href: "/organization/custom-fields/bank-branch" },
          { name: t("Client"), href: "/organization/custom-fields/clients" },
          { name: t("Country"), href: "/organization/custom-fields/country" },
          { name: t("Province"), href: "/organization/custom-fields/province" },
          { name: t("City"), href: "/organization/custom-fields/city" },
          { name: t("Departments"), href: "/organization/custom-fields/departments" },
          { name: t("Area"), href: "/organization/custom-fields/area" },
          { name: t("Vendor"), href: "/organization/custom-fields/vendor" },
          { name: t("Region"), href: "/organization/custom-fields/region" },
          { name: t("Cost Center"), href: "/organization/custom-fields/cost-center" },
          { name: t("G.L Class"), href: "/organization/custom-fields/glclass" },
          { name: t("Documents"), href: "/organization/custom-fields/documents" },
          { name: t("Marital Type"), href: "/organization/custom-fields/marital-status" },
          { name: t("Exit Type"), href: "/organization/custom-fields/exit-type" },
          { name: t("Expense Unit"), href: "/organization/custom-fields/expense" },
          { name: t("Resign Type"), href: "/organization/custom-fields/resign-type" },
          { name: t("Division"), href: "/organization/custom-fields/division" },
          { name: t("Grade"), href: "/organization/custom-fields/grade" },
          { name: t("Floor"), href: "/organization/custom-fields/floor" },
          { name: t("Room"), href: "/organization/custom-fields/room" },
          { name: t("University"), href: "/organization/custom-fields/university" },
          { name: t("Gender"), href: "/organization/custom-fields/gender" },
          { name: t("Minimum Wage"), href: "/organization/custom-fields/minimum-wage" }
        ].sort((a, b) => a.name.localeCompare(b.name))
      },
      {
        name: t("Settings"), href: "/organization/settings",
        innerSubMenu: [
          { name: t('System Configuration'), href: "/organization/settings/system-configuration" },
          { name: t('Email Settings'), href: "/organization/settings/email-settings" },
          { name: t('Company Settings'), href: "/organization/settings/company-settings" },
          { name: t('Biometric Device Settings'), href: "/organization/settings/biometric-device-settings" },
          { name: t('Card Template'), href: "/organization/settings/card-template" },
        ]
      },

      { name: t('Billing'), href: "/organization/billing" },
    ]
  }
  return (
    <aside id="zt-sidebar" className="flex bg-white max-h-screen">
      {/* Mini Sidebar */}
      <div className="border-r border-gray-50 flex flex-col py-4">
        <nav id="zt-sidebarNav" className="zt-customScrollbar grow">
          <ul className="flex flex-col items-center">
            {MiniBar.map((item, index) => (
              <li key={index} className={`px-5 py-3`}>
                {item?.page ?
                  <div className="relative group">
                    <Link data-title={item.name} href={item.href}
                      onClick={() => setSelected(null)}>
                      <span className={`zt-menuIcon text-themePrimary/45 hover:text-themePrimary ${router.asPath === item.href && "!text-themePurple"}`}><item.icon /></span>
                    </Link>
                    <div className="absolute bottom-full -left-3 transform mb-2 w-max bg-themePrimary text-white text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      {item.name}
                    </div>
                  </div>
                  :
                  <div className="relative group">
                    <a data-title={item.name} href="" onClick={(event) => {
                      event.preventDefault()
                      setSelected(item.href)
                    }}>
                      <span className={`zt-menuIcon text-themePrimary/45 hover:text-themePrimary ${router.asPath.includes(item.href) && "!text-themePurple"}`}><item.icon /></span>
                    </a>
                    <div className="absolute z-50 bottom-full -left-3 transform mb-2 w-max bg-themePrimary text-white text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      {item.name}
                    </div>
                  </div>
                }
              </li>
            ))}
          </ul>
        </nav>

        <span className="flex justify-center">
          <Link href={"/operations/helpdesk/tickets"} className="btn-helpDesk">
            <span className="zt-menuIcon text-white">
              <HelpLine width={28} height={28} />
            </span>
          </Link>
        </span>
      </div>

      {selected &&
        MiniBar.findIndex((item) => item.href === selected) !== -1 && (
          <div className="p-4 w-64 h-full overflow-y-scroll">
            <h4>{MiniBar.find((item) => item.href === selected)?.name}</h4>
            <ul className="flex flex-col gap-3">
              {Navigation[selected].map((item, index) => (
                <li key={index}>
                  <div className="flex">
                    {item?.innerSubMenu ? (
                      <a
                        className={`zt-sidebar-link ${router.asPath.includes(item.href) ? "zt-active" : ""
                          }`}
                        href=""
                        onClick={(event) => {
                          event.preventDefault();
                          if (subMenu === item.href) {
                            setSubMenu("");
                          } else {
                            setSubMenu(item.href);
                          }
                        }}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        className={`zt-sidebar-link ${router.asPath === item.href ? "zt-active" : ""
                          }`}
                        href={item.href}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>

                  {item?.innerSubMenu && (
                    <ul
                      className={`${subMenu === item.href ? "" : "hidden"
                        } transition-all`}
                    >
                      {item?.innerSubMenu.map((subItem, index2) => (
                        <li className="relative py-1" key={index2}>
                          <div
                            className={`absolute left-0  ${index2 === 0 ? "h-1/2 top-0.5" : "h-full -top-4"
                              }  border-l border-b w-4`}
                          ></div>
                          <span className="pl-4 zt-sidebar-link">
                            <Link
                              className={`zt-sidebar-link ${router.asPath === subItem.href
                                ? "zt-active"
                                : ""
                                }`}
                              href={subItem.href}
                            >
                              {subItem.name}
                            </Link>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
    </aside>
  );
}
