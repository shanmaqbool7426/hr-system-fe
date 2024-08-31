import moment from "moment";

export default function ModifiedBy({ user, date }) {
  return (
    <div>
      <div className="text-lg">{user.firstName} {user.lastName}</div>
      <time dateTime={date} className="text-sm">
        {moment(date).format("DD MMM YYYY hh:mm A")}
      </time>
    </div>
  );
}
