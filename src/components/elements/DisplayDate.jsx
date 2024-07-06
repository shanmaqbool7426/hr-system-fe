import moment from 'moment';

export default function DisplayDate({ date, time, timeOnly, ...props }) {
    return <time dateTime={date} {...props}>
        {timeOnly ? moment(date).format("HH:mm:ss") : moment(date).format(time ? 'DD MMM YYYY hh: mm A' : 'DD MMM YYYY')}
    </time>
}

DisplayDate.defaultProps = {
    date: new Date,
    time: false
}