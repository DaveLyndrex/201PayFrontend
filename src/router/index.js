import Vue from "vue";
import VueRouter from "vue-router";

import Index from /* webpackChunkName: "Main Page" */ "@/views/Index.vue";
import Login from /* webpackChunkName: "Login" */ "@/views/Login.vue";
import Test from /* webpackChunkName: "Test" */ "@/views/Test.vue";
import EmployeeMain from /* webpackChunkName: "EmployeeMain" */ "@/views/employee/Index.vue";
import TimeKeepingMain from /* webpackChunkName: "TimeKeepingMain" */ "@/views/time-keeping/TimeKeeping.vue";
// import Shift from /* webpackChunkName: "Shift" */ "@/views/time-keeping/Shift.vue";
import LeaveApplicationMain from /* webpackChunkName: "LeaveApplicationMain" */ "@/views/leave-application/Index.vue";
import HumanResourcesMain from /* webpackChunkName: "HumanResourcesMain" */ "@/views/human-resources/Index.vue";
import BasicInfomation from /* webpackChunkName: "Basic Information" */ "@/views/employee/BasicInformation.vue";
import EmploymentData from /* webpackChunkName: "Employment Data" */ "@/views/employee/EmploymentData.vue";
import PayrollData from /* webpackChunkName: "Payroll Data" */ "@/views/employee/PayrollData.vue";
import CostCenter from /* webpackChunkName: "Cost Center" */ "@/views/employee/CostCenter.vue";
import Workflow from /* webpackChunkName: "Workflow" */ "@/views/employee/Workflow.vue";
import Address from /* webpackChunkName: "Address" */ "@/views/employee/Address.vue";
import EmergencyContact from /* webpackChunkName: "Emergency Contact" */ "@/views/employee/EmergencyContact.vue";
import PayComponent from /* webpackChunkName: "PayComponent" */ "@/views/employee/PayComponent.vue";
import Deduction from /* webpackChunkName: "Deduction" */ "@/views/employee/Deduction.vue";
import Dependent from /* webpackChunkName: "Dependent" */ "@/views/employee/Dependent.vue";
import Educational from /* webpackChunkName: "Educational" */ "@/views/employee/Educational.vue";
import Training from /* webpackChunkName: "Training" */ "@/views/employee/Training.vue";
import OtherData from /* webpackChunkName: "Other Data" */ "@/views/employee/OtherData.vue";
import JobHistory from /* webpackChunkName: "Job History" */ "@/views/employee/JobHistory.vue";
import Legislative from /* webpackChunkName: "Legislative" */ "@/views/employee/Legislative.vue";
import License from /* webpackChunkName: "License" */ "@/views/employee/License.vue";
import Visa from /* webpackChunkName: "Visa" */ "@/views/employee/Visa.vue";
import Phone from /* webpackChunkName: "Phone" */ "@/views/employee/Phone.vue";
import Passport from /* webpackChunkName: "Passport" */ "@/views/employee/Passport.vue";
import LeaveCredits from /* webpackChunkName: "Leave Credits" */ "@/views/employee/LeaveCredits.vue";
import Citizenship from /* webpackChunkName: "Citizenship" */ "@/views/employee/Citizenship.vue";
import NID from /* webpackChunkName: "NID" */ "@/views/employee/NID.vue";
import Ethnicity from /* webpackChunkName: "NID" */ "@/views/employee/Ethnicity.vue";
import ProfileMain from /* webpackChunkName: "Profile" */ "@/views/profile/Index.vue";
import LogsMain from /* webpackChunkName: "Logs" */ "@/views/logs/Index.vue";
import AccessLogs from /* webpackChunkName: "AccessLogs" */ "@/views/logs/AccessLogs.vue";
import ActivityLogs from /* webpackChunkName: "ActivityLogs" */ "@/views/logs/ActivityLogs.vue";
import ChangeLogs from /* webpackChunkName: "ChangeLogs" */ "@/views/logs/ChangeLogs.vue";
import Timesheet from "@/views/kiosk/Timesheet.vue";
import CertificateOfAttendant from "@/views/kiosk/CertificateOfAttendant.vue";
import Overtime from "@/views/kiosk/Overtime.vue";
import Leave from "@/views/kiosk/Leave.vue";
import KioskShift from "@/views/kiosk/Shift.vue";
import LeaveBalances from "@/views/kiosk/LeaveBalances.vue";
import Approval from "@/views/kiosk/AwaitingApproval.vue";
import KioskMain from /* webpackChunkName: "EmployeeMain" */ "@/views/kiosk/Index.vue";
import Setups from "@/views/human-resources/Setups.vue";
import Notifications from "@/views/human-resources/Notifications.vue";
import Templates from "@/views/human-resources/Templates.vue";
import ImportEmployee from "@/views/human-resources/ImportEmployee.vue";
import Reminders from "@/views/human-resources/Reminders.vue";
import TransferApprover from "@/views/human-resources/TransferApprover.vue";
import Report from "@/views/human-resources/Report.vue";
import LeaveRefresh from "@/views/human-resources/LeaveRefresh.vue";
import SetupAddressType from "@/views/human-resources/setups/AddressType.vue";
import SetupBusinessUnit from "@/views/human-resources/setups/BusinessUnit.vue";
import SetupBank from "@/views/human-resources/setups/Bank.vue";
import SetupCostCenter from "@/views/human-resources/setups/CostCenter.vue";
import SetupDivision from "@/views/human-resources/setups/Division.vue";
import SetupCivilStatus from "@/views/human-resources/setups/CivilStatus.vue";
import SetupCitizenship from "@/views/human-resources/setups/Citizenship.vue";
import SetupHolidayType from "@/views/human-resources/setups/HolidayType.vue";
import SetupProject from "@/views/human-resources/setups/Project.vue";

import SetupSuffix from "@/views/human-resources/setups/SuffixType.vue";
import SetupSiteLocation from "@/views/human-resources/setups/SiteLocation.vue";
import SetupWorkerType from "@/views/human-resources/setups/WorkerType.vue";
import SetupTraining from "@/views/human-resources/setups/Training.vue";
import SetupTimekeeping from "@/views/human-resources/setups/Timekeeping.vue";
import SetupRegularizationPA from "@/views/human-resources/setups/Regularization.vue";
import SetupVisa from "@/views/human-resources/setups/VisaSetup.vue";

import SetupBloodType from "@/views/human-resources/setups/BloodType.vue";
import SetupDesignation from "@/views/human-resources/setups/Designation.vue";
import SetupEmployeeStatus from "@/views/human-resources/setups/EmployeeStatus.vue";
import SetupGroupPersonalAccident from "@/views/human-resources/setups/GroupPersonalAccident.vue"
import EmployeeCustomFields from "@/views/human-resources/setups/EmployeeCustomFields.vue";
import Gender from "@/views/human-resources/setups/Gender.vue";
import Prefix from "@/views/human-resources/setups/Prefix.vue";
import Religion from "@/views/human-resources/setups/Religion.vue";
import HrEthnicity from "@/views/human-resources/setups/HrEthnicity.vue";
import EmploymentType from "@/views/human-resources/setups/EmploymentType.vue";
import Department from "@/views/human-resources/setups/Department.vue";
import GradeRate from "@/views/human-resources/setups/GradeRate.vue";
import LeaveCreditYear from "@/views/human-resources/setups/LeaveCreditYear.vue";
import SetupCompany from "@/views/human-resources/setups/CompanySetup.vue";
import SetupGrade from "@/views/human-resources/setups/GradeSetup.vue";
import JobCategory from "@/views/human-resources/setups/JobCategory.vue";
import JobCode from "@/views/human-resources/setups/JobCode.vue";
import LeaveType from "@/views/human-resources/setups/LeaveType.vue";
import ManagerType from "@/views/human-resources/setups/ManagerType.vue";
import Reason from "@/views/human-resources/setups/Reason.vue";
import Location from "@/views/human-resources/setups/Location.vue";
import Holiday from "@/views/human-resources/setups/Holiday.vue";
import JobFamilyName from "@/views/human-resources/setups/JobFamilyName.vue";
import SetupJobLevel from "@/views/human-resources/setups/JobLevel.vue";
import Region from "@/views/human-resources/setups/Region.vue";
import Period from "@/views/human-resources/setups/Period.vue";
// import SetupMain from "@/views/human-resources/setups/Index.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: "/home",
    },
    {
        path: "/home",
        component: Index,
        meta: {
            auth: true,
        },
        children: [{
                path: "/",
                redirect: "employee",
            },
            {
                path: "employee",
                name: "Employee",
                component: EmployeeMain,
                children: [{
                        path: "/",
                        redirect: "basic-information",
                    },
                    {
                        path: "basic-information",
                        name: "Employee Basic Information",
                        component: BasicInfomation,
                        meta: {
                            title: "Employee Basic Information",
                        },
                    },
                    {
                        path: "employment-data",
                        name: "employee-employment-data",
                        component: EmploymentData,
                        meta: {
                            title: "Employment Data",
                        },
                    },
                    {
                        path: "payroll-data",
                        name: "employee-payroll-data",
                        component: PayrollData,
                        meta: {
                            title: "Payroll Data",
                        },
                    },
                    {
                        path: "cost-center",
                        name: "employee-cost-center",
                        component: CostCenter,
                        meta: {
                            title: "Cost Center",
                        },
                    },
                    {
                        path: "workflow",
                        name: "employee-workflow",
                        component: Workflow,
                        meta: {
                            title: "Workflow",
                        },
                    },
                    {
                        path: "address",
                        name: "employee-address",
                        component: Address,
                        meta: {
                            title: "Address",
                        },
                    },
                    {
                        path: "emergency-contact",
                        name: "employee-emergency-contact",
                        component: EmergencyContact,
                        meta: {
                            title: "Emergency Contact",
                        },
                    },
                    {
                        path: "pay-component",
                        name: "employee-pay-component",
                        component: PayComponent,
                        meta: {
                            title: "Pay Component",
                        },
                    },
                    {
                        path: "deduction",
                        name: "employee-deductions",
                        component: Deduction,
                        meta: {
                            title: "Deduction",
                        },
                    },
                    {
                        path: "dependent",
                        name: "employee-dependents",
                        component: Dependent,
                        meta: {
                            title: "Dependent",
                        },
                    },
                    {
                        path: "educational",
                        name: "employee-educational",
                        component: Educational,
                        meta: {
                            title: "Educational",
                        },
                    },
                    {
                        path: "training",
                        name: "employee-trainings",
                        component: Training,
                        meta: {
                            title: "Training",
                        },
                    },
                    {
                        path: "other-data",
                        name: "employee-other-datas",
                        component: OtherData,
                        meta: {
                            title: "Other Data",
                        },
                    },
                    {
                        path: "citizenship",
                        name: "citizenship",
                        component: Citizenship,
                        meta: {
                            title: "Citizenship",
                        },
                    },
                    {
                        path: "job-history",
                        name: "employee-job-history",
                        component: JobHistory,
                        meta: {
                            title: "Job History",
                        },
                    },
                    {
                        path: "license",
                        name: "employee-license",
                        component: License,
                        meta: {
                            title: "License",
                        },
                    },
                    {
                        path: "visa",
                        name: "employee-visa",
                        component: Visa,
                        meta: {
                            title: "Visa",
                        },
                    },
                    {
                        path: "phone",
                        name: "employee-phone",
                        component: Phone,
                        meta: {
                            title: "Phone",
                        },
                    },
                    {
                        path: "passport",
                        name: "employee-passport",
                        component: Passport,
                        meta: {
                            title: "Passport",
                        },
                    },
                    {
                        path: "leave-credits",
                        name: "employee-leave-credits",
                        component: LeaveCredits,
                        meta: {
                            title: "Leave Credits",
                        },
                    },
                    {
                        path: "citizenship",
                        name: "employee-citizenship",
                        component: Citizenship,
                        meta: {
                            title: "Citizenship",
                        },
                    },
                    {
                        path: "nid",
                        name: "employee-nid",
                        component: NID,
                        meta: {
                            title: "NID",
                        },
                    },
                    {
                        path: "ethnicity",
                        name: "employee-ethnicity",
                        component: Ethnicity,
                        meta: {
                            title: "Ethnicity",
                        },
                    },
                    {
                        path: "legislative",
                        name: "employee-legislative",
                        component: Legislative,
                        meta: {
                            title: "Legislative",
                        },
                    },
                ],
            },
            {
                path: "kiosk",
                name: "Kiosk",
                component: KioskMain,
                meta: {
                    auth: true,
                },
                children: [{
                        path: "/home/kiosk",
                        redirect: "/home/kiosk/timesheet",
                    },
                    {
                        path: "timesheet",
                        name: "Timesheet",
                        component: Timesheet,
                        meta: {
                            title: "Timesheet",
                        },
                    },

                    {
                        path: "awaiting-approval",
                        name: "Awaiting Approval",
                        component: Approval,
                        meta: {
                            title: "Awaiting Approval",
                        },
                    },
                    {
                        path: "certificate-of-attendant",
                        name: "Certificate Of Attendant",
                        component: CertificateOfAttendant,
                        meta: {
                            title: "Certificate Of Attendant",
                        },
                    },
                    {
                        path: "leave",
                        name: "Leave",
                        component: Leave,
                        meta: {
                            title: "Leave",
                        },
                    },
                    {
                        path: "overtime",
                        name: "Overtime",
                        component: Overtime,
                        meta: {
                            title: "Overtime",
                        },
                    },
                    {
                        path: "shift",
                        name: "Shift",
                        component: KioskShift,
                        meta: {
                            title: "Shift",
                        },
                    },
                    {
                        path: "leave-balances",
                        name: "Leave Balances",
                        component: LeaveBalances,
                        meta: {
                            title: "Leave Balances",
                        },
                    },
                ],
            },

            {
                path: "time-keeping",
                name: "Time Keeping",
                component: TimeKeepingMain,
                meta: {
                    title: "Timekeeping Main",
                },
            },
            {
                path: "leave-application",
                name: "Leave Application",
                component: LeaveApplicationMain,
                meta: {
                    title: "LeaveApplication",
                },
            },


            // HR Setups Route

            // {
            //     path: "/home/human-resource/setups1",
            //     name: "Setups",
            //     component: SetupMain,
            //     meta: {
            //         auth: true,
            //     },
            //     children: [{
            //             path: "/home/human-resource/setups/address-type",
            //             name: "Address Type",
            //             component: SetupAddressType,
            //             meta: {
            //                 title: "Address Type",
            //             },
            //         },

            //         {
            //             path: "/home/human-resource/setups/bank",
            //             name: "Bank",
            //             component: SetupBank,
            //             meta: {
            //                 title: "Bank",
            //             },
            //         },

            //     ]
            // },


            {
                path: "/home/human-resource/setups/address-type",
                name: "Address Type",
                component: SetupAddressType,
                meta: {
                    title: "Address Type",
                },
            },


            {
                path: "/home/human-resource/setups/bank",
                name: "Bank",
                component: SetupBank,
                meta: {
                    title: "Bank",
                },
            },

            {
                path: "/home/human-resource/setups/business-unit",
                name: "Business Unit",
                component: SetupBusinessUnit,
                meta: {
                    title: "Business Unit",
                },
            },
            {
                path: "/home/human-resource/setups/cost-center",
                name: "Cost Center",
                component: SetupCostCenter,
                meta: {
                    title: "Cost Center",
                },
            },


            {
                path: "/home/human-resource/setups/civil-status",
                name: "Civil Status",
                component: SetupCivilStatus,
                meta: {
                    title: "Civil Status",
                },
            },
            {
                path: "/home/human-resource/setups/department",
                name: "Department",
                component: Department,
                meta: {
                    title: "Department",
                },
            },

            {
                path: "/home/human-resource/setups/division",
                name: "Division",
                component: SetupDivision,
                meta: {
                    title: "Division",
                },
            },
            {
                path: "/home/human-resource/setups/designation",
                name: "Designation",
                component: SetupDesignation,
                meta: {
                    title: "Designation",
                },
            },
            {
                path: "/home/human-resource/setups/employment-type",
                name: "Employment Type",
                component: EmploymentType,
                meta: {
                    title: "Employment Type",
                },
            },
            {
                path: "/home/human-resource/setups/grade-rate",
                name: "Grade Rate",
                component: GradeRate,
                meta: {
                    title: "Grade Rate",
                },
            },
            {
                path: "/home/human-resource/setups/leave-credit-year",
                name: "Leave Credit Year",
                component: LeaveCreditYear,
                meta: {
                    title: "Leave Credit Year",
                },
            },
            {
                path: "/home/human-resource/setups/company",
                name: "Company",
                component: SetupCompany,
                meta: {
                    title: "Company",
                },
            },
            {
                path: "/home/human-resource/setups/grade",
                name: "Grade",
                component: SetupGrade,
                meta: {
                    title: "Grade",
                },
            },
            {
                path: "/home/human-resource/setups/job-category",
                name: "Job Category",
                component: JobCategory,
                meta: {
                    title: "Job Category",
                },
            },
            {
                path: "/home/human-resource/setups/job-code",
                name: "Job Code",
                component: JobCode,
                meta: {
                    title: "Job Code",
                },
            },
            {
                path: "/home/human-resource/setups/leave-type",
                name: "Leave Type",
                component: LeaveType,
                meta: {
                    title: "Leave Type",
                },
            },
            {
                path: "/home/human-resource/setups/manager-type",
                name: "Manager Type",
                component: ManagerType,
                meta: {
                    title: "Manager Type",
                },
            },
            {
                path: "/home/human-resource/setups/reason",
                name: "Reason",
                component: Reason,
                meta: {
                    title: "Reason",
                },
            },
            {
                path: "/home/human-resource/setups/location",
                name: "Location",
                component: Location,
                meta: {
                    title: "Location",
                },
            },
            {
                path: "/home/human-resource/setups/holiday",
                name: "Holiday",
                component: Holiday,
                meta: {
                    title: "Holiday",
                },
            },
            {
                path: "/home/human-resource/setups/job-family-name",
                name: "Job Family Name",
                component: JobFamilyName,
                meta: {
                    title: "Job Family Name",
                },
            },


            {
                path: "/home/human-resource/setups/blood-type",
                name: "Blood Type",
                component: SetupBloodType,
                meta: {
                    title: "Blood Type",
                },
            },

            {
                path: "/home/human-resource/setups/gender",
                name: "Gender",
                component: Gender,
                meta: {
                    title: "Gender",
                },
            },

            {
                path: "/home/human-resource/setups/address-type",
                name: "Address Type",
                component: SetupAddressType,
                meta: {
                    title: "Address Type",
                },
            },
            {
                path: "/home/human-resource/setups/job-level",
                name: "Job Level",
                component: SetupJobLevel,
                meta: {
                    title: "Job Level",
                }
            },
            {
                path: "/home/human-resource/setups/prefix",
                name: "Prefix",
                component: Prefix,
                meta: {
                    title: "Prefix",
                },
            },

            {
                path: "/home/human-resource/setups/employee-status",
                name: "Employee Status",
                component: SetupEmployeeStatus,
                meta: {
                    title: "Employee Status",
                },
            },

            {
                path: "/home/human-resource/setups/citizenship",
                name: "Citizenship",
                component: SetupCitizenship,
                meta: {
                    title: "Citizenship",
                },
            },

            {
                path: "/home/human-resource/setups/holiday-type",
                name: "Holiday Type",
                component: SetupHolidayType,
                meta: {
                    title: "Holiday Type",
                },
            },

            {
                path: "/home/human-resource/setups/project",
                name: "Project",
                component: SetupProject,
                meta: {
                    title: "Project",
                },
            },

            {
                path: "/home/human-resource/setups/suffix",
                name: "Suffix",
                component: SetupSuffix,
                meta: {
                    title: "Suffix",
                },
            },

            {
                path: "/home/human-resource/setups/site-location",
                name: "Site Location",
                component: SetupSiteLocation,
                meta: {
                    title: "Site Location",
                },
            },

            {
                path: "/home/human-resource/setups/worker-type",
                name: "Worker Type",
                component: SetupWorkerType,
                meta: {
                    title: "Worker Type",
                },
            },

            {
                path: "/home/human-resource/setups/training",
                name: "Training",
                component: SetupTraining,
                meta: {
                    title: "Training",
                },
            },

            {
                path: "/home/human-resource/setups/timekeeping",
                name: "Timekeeping",
                component: SetupTimekeeping,
                meta: {
                    title: "Timekeeping",
                },
            },

            {
                path: "/home/human-resource/setups/regularization-pa",
                name: "Regularization PA",
                component: SetupRegularizationPA,
                meta: {
                    title: "Regularization PA",
                },
            },

            {
                path: "/home/human-resource/setups/person-visa",
                name: "Person Visa",
                component: SetupVisa,
                meta: {
                    title: "Person Visa",

                },
            },
            {
                path: "/home/human-resource/setups/group-personal-accident",
                name: "Group Personal Accident",
                component: SetupGroupPersonalAccident,
                meta: {
                    title: "Group Personal Accident",
                }
            },
            {
                path: "/home/human-resource/setups/employee-custom-fields",
                name: "Employee Custom Fields",
                component: EmployeeCustomFields,
                meta: {
                    title: "Employee Custom Fields",
                },
            },

            {
                path: "/home/human-resource/setups/ethnicitySetup",
                name: "Ethnicity",
                component: HrEthnicity,
                meta: {
                    title: "Ethnicity",
                },
            },

            {
                path: "/home/human-resource/setups/region",
                name: "Region",
                component: Region,
                meta: {
                    title: "Region",
                },
            },

            {
                path: "/home/human-resource/setups/religion",
                name: "Religion",
                component: Religion,
                meta: {
                    title: "Religion",
                },
            },

            {
                path: "/home/human-resource/setups/period",
                name: "Period",
                component: Period,
                meta: {
                    title: "Period",
                },
            },


            {
                path: "human-resource",
                name: "Human Resources",
                component: HumanResourcesMain,
                meta: {
                    auth: true,
                },


                children: [{
                        path: "/home/human-resource",
                        redirect: "/home/human-resource/setups",
                    },
                    {
                        path: "setups",
                        name: "setups",
                        component: Setups,
                        meta: {
                            title: "Setups",
                        },
                    },
                    {
                        path: "Notifications",
                        name: "Notifications",
                        component: Notifications,
                        meta: {
                            title: "Notifications",
                        },
                    },
                    {
                        path: "Templates",
                        name: "Templates",
                        component: Templates,
                        meta: {
                            title: "Templates",
                        },
                    },
                    {
                        path: "import-employee",
                        name: "Import Employee",
                        component: ImportEmployee,
                        meta: {
                            title: "Import Employee",
                        },
                    },
                    {
                        path: "Reminders",
                        name: "Reminders",
                        component: Reminders,
                        meta: {
                            title: "Reminders",
                        },
                    },
                    {
                        path: "transfer-approver",
                        name: "Transfer Approver",
                        component: TransferApprover,
                        meta: {
                            title: "Transfer Approver",
                        },
                    },
                    {
                        path: "Report",
                        name: "Report",
                        component: Report,
                        meta: {
                            title: "Report",
                        },
                    },
                    {
                        path: "leave-refresh",
                        name: "Leave Refresh",
                        component: LeaveRefresh,
                        meta: {
                            title: "Leave Refresh",
                        },
                    },
                ],
            },
            {
                path: "profile",
                name: "profile",
                component: ProfileMain,
                meta: {
                    auth: true,
                },
            },
            {
                path: "logs",
                name: "logs",
                component: LogsMain,
                meta: {
                    auth: true,
                },
                children: [{
                        path: "/home/logs",
                        redirect: "/home/logs/access-logs",
                    },
                    {
                        path: "access-logs",
                        name: "access-logs",
                        component: AccessLogs,
                        meta: {
                            title: "Access Logs",
                        },
                    },
                    {
                        path: "activity-logs",
                        name: "activity-logs",
                        component: ActivityLogs,
                        meta: {
                            title: "Activity Logs",
                        },
                    },
                    {
                        path: "change-logs",
                        name: "change-logs",
                        component: ChangeLogs,
                        meta: {
                            title: "Change Logs",
                        },
                    },
                ],
            },
        ],
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            auth: false,
        },
    },
    {
        path: "/test",
        name: "Test",
        component: Test,
        meta: {
            auth: true,
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;