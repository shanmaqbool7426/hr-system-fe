import { useState } from "react";
import { SwatchesPicker } from "react-color";

import { InputErrorInfo } from "../svg";
export default function ColorPicker({ label, type, name, value, error, disabled = false, className = '', containerClass, onChange, ...props }) {
    const [showPicker, setShowPicker] = useState(false);
    const changeHandler = (color) => {
        onChange(color.hex)
    }

    return (
        <div className={`zt-formGroup ${containerClass}`}>
            {label && <label className="dark:text-themeGrayscale300" htmlFor={props?.id}>
                {label} {props?.required && <sup className="text-[1.25rem] text-themeDanger">*</sup>}
            </label>}
            <div className="relative">
                <input
                    type="text"
                    readOnly
                    name={name}
                    className={`peer cursor-pointer zt-themeInput`}
                    style={{ backgroundColor: value }}
                    onFocus={() => setShowPicker(true)}
                    {...props}
                />
                {showPicker && (
                    <div className="absolute z-10 mt-2">
                        <SwatchesPicker
                            // disableAlpha
                            color={value}
                            onChange={changeHandler}
                            onChangeComplete={() => setShowPicker(false)}
                        />
                    </div>
                )}
            </div>

            {error && <span className="zt-errorMessage">
                <InputErrorInfo />
                {error}
            </span>}
        </div>
    )
}
