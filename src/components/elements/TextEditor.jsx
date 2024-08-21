import { InputErrorInfo } from "../svg";
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function TextEditor({ id, label, error, containerClass, className, content, readOnly, ...props }) {


  return (
    <>
      <div className={`zt-formGroup ${containerClass}`}>
        {label && (
          <label className="dark:text-themeGrayscale300" htmlFor={id}>
            {label} {props?.required && <sup className="text-[1.25rem] text-themeDanger">*</sup>}
          </label>
        )}
        <ReactQuill readOnly={readOnly} id={id} value={content} {...props} />
      </div>
      {error && (
        <span className="zt-errorMessage">
          <InputErrorInfo />
          {error}
        </span>
      )}
    </>
  );
}
