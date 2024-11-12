import { configureStore } from "@reduxjs/toolkit";
import asset from "./slices/asset.slice";
import attendance from "./slices/attendance.slice";
import attendancerequest from "./slices/attendance-request.slice";
import auth from "./slices/auth.slice";
import biometric from "./slices/biometric.slice";
import changeshiftrequest from "./slices/change-shift-request.slice";
import customfield from "./slices/customfield.slice";
import department from "./slices/department.slice";
import employee from "./slices/employee.slice";
import feedback from "./slices/feedback.slice"
import gazetteholiday from "./slices/gazetteholiday.slice";
import helpdesk from "./slices/helpdesk.slice"
import leavepolicy from "./slices/leave-policy.slice";
import leaverequest from "./slices/leave-request.slice";
import onboardingoffboarding from "./slices/onboarding-offboarding.slice";
import project from "./slices/project.slice"
import job from "./slices/job.slice"
import remoteapplication from "./slices/remote-application.slice"
import remotecategory from "./slices/remote-category.slice"
import remoteteam from "./slices/remote-team.slice"
import remoterequest from "./slices/remote-request.slice"
import shift from "./slices/shiftplan.slice"
import shiftflag from "./slices/shift-flag.slice";
import task from "./slices/task.slice"
import taskboard from "./slices/taskboard.slice";
import taskraiseissue from "./slices/task-raise-issue.slice"

export default configureStore({
  reducer: {
    asset,
    attendance,
    attendancerequest,
    auth,
    biometric,
    customfield,
    changeshiftrequest,
    department,
    employee,
    feedback,
    gazetteholiday,
    helpdesk,
    job,
    leavepolicy,
    leaverequest,
    onboardingoffboarding,
    project,
    remoteapplication,
    remotecategory,
    remoteteam,
    remoterequest,
    shift,
    shiftflag,
    task,
    taskboard,
    taskraiseissue,
  },
});
