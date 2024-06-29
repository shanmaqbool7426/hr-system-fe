import moment from 'moment';

export default function DisplayDate({ date, time, ...props }) {
    return <time dateTime={date} {...props}>
        {moment(date).format(time ? 'DD MMM YYYY hh: mm A' : 'DD MMM YYYY')}
    </time>
}

DisplayDate.defaultProps = {
    date: new Date,
    time: false
}