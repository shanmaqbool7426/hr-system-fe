import { configureStore } from "@reduxjs/toolkit";
import asset from "./slices/asset.slice";
import attendance from "./slices/attendance.slice";
import auth from "./slices/auth.slice";
import biometric from "./slices/biometric.slice";
import customfield from "./slices/customfield.slice";
import department from "./slices/department.slice";
import employee from "./slices/employee.slice";
import leavepolicy from "./slices/leave-policy.slice";
import leaverequest from "./slices/leave-request.slice";
import shiftflag from "./slices/shift-flag.slice";
import gazetteholiday from "./slices/gazetteholiday.slice";
import project from "./slices/project.slice"
import taskboard from "./slices/taskboard.slice";
import task from "./slices/task.slice"

export default configureStore({
  reducer: {
    asset,
    attendance,
    auth,
    biometric,
    customfield,
    department,
    employee,
    gazetteholiday,
    leavepolicy,
    leaverequest,
    project,
    shiftflag,
    task,
    taskboard,
  },
});
