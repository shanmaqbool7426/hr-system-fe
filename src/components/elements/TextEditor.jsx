import { InputErrorInfo } from "../svg"
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function TextEdior({ id, label, error, containerClass, className, ...props }) {
  return (
    <>
      <div className={`zt-formGroup ${containerClass}`}>
        {label && <label className="dark:text-themeGrayscale300" htmlFor={id}>
          {label} {props?.required && <sup className="text-[1.25rem] text-themeDanger">*</sup>}
        </label>}
        <ReactQuill id={id} {...props} />
      </div>
      {error && <span className="zt-errorMessage">
        <InputErrorInfo />
        {error}
      </span>}

    </>
  )
}
