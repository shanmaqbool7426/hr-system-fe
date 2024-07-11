import { configureStore } from "@reduxjs/toolkit";
import asset from "./slices/asset.slice";
import auth from "./slices/auth.slice";
import biometric from "./slices/biometric.slice";
import customfield from "./slices/customfield.slice";
import department from "./slices/department.slice";
import employee from "./slices/employee.slice";
import leavepolicy from "./slices/leave-policy.slice";
import leaverequest from "./slices/leave-request.slice";
import project from "./slices/project.slice"

export default configureStore({
    reducer: {
        asset,
        auth,
        biometric,
        customfield,
        department,
        employee,
        leavepolicy,
        leaverequest,
        project,
    },
});
