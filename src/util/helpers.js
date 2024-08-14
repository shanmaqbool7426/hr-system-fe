import axiosInstance from "./axios";

export function capitalize(value) {
  if (value)
    return value.charAt(0).toUpperCase() + value.slice(1);
  return ""
}


export function check_rights(user) {
  return user?.role?.rights === 'admin'
}
