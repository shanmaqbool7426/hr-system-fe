import 'rc-time-picker/assets/index.css';
// import RCTimePicker from 'rc-time-picker';
import moment from 'moment';

export default function TimePicker({
    label,
    value,
    onChange,
    className,
    disabled,
    required,
    ...props
}) {
    return <>Working on it</>
    // const now = moment().hour(0).minute(0);
    // return <div className='zt-formGroup'>
    //     {label && <label className="dark:text-themeGrayscale300" htmlFor={props?.id}>
    //         {label} {required && <sup className="text-[1.25rem] text-themeDanger">*</sup>}
    //     </label>}

    //     <RCTimePicker
    //         showSecond={false}
    //         defaultValue={now}
    //         className="zt-themeInput"
    //         value={moment(value)}
    //         onChange={onChange}
    //         format={'HH:mm'}
    //     />
    // </div>
}