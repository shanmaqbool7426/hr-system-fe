
import Link from "next/link";
import Profile from "../Profile";

export default function DisplayProfile({ user }) {
  return (
    <Link href={`/employees/details/${user._id}`} className="flex gap-2 items-center no-underline dark:text-white">
      <Profile image={user?.avatar} name={user.firstName} />
      <div className="text-left">
        <div>{`${user.firstName} ${user.lastName}`}</div>
        <div className="text-xs">{`${user.employeeCode}`}</div>
      </div>
    </Link>
  );
}
