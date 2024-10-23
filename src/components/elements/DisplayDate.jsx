import moment from "moment";

export default function DisplayDate({
  date,
  time,
  timeOnly,
  className,
  ...props
}) {
  return (
    <time dateTime={date} {...props} className={`dark:text-white ${className}`}>
      {timeOnly
        ? moment(date).format("HH:mm:ss")
        : moment(date).format(time ? "DD MMM YYYY hh:mm A" : "DD MMM YYYY")}
    </time>
  );
}

DisplayDate.defaultProps = {
  date: new Date(),
  time: false,
  timeOnly: false,
};
