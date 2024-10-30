import { io } from "socket.io-client";
export const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL.replace("/api", ""));

export function capitalize(value) {
  if (value) {
    value = value.replace("_", " ")
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return ""
}


export function check_rights(user) {
  return user?.role?.rights === 'admin'
}
