import { useState } from "react";
import { Combobox, Fragment, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import {
  ChevronDown,
  Check,
  InputErrorInfo,
  CloseCross,
} from "@/components/svg";

export default function SearchSelect({
  id,
  type,
  containerClass,
  list,
  value,
  onChange,
  label,
  placeholder,
  error,
  comboClass,
  ...props
}) {
  const [selectedItem, setSelectedItem] = useState(value);
  const [query, setQuery] = useState("");
  const filtered =
    query === ""
      ? list
      : list.filter((item) =>
        item.value
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );

  const getDisplayValue = (payload) => {
    if (payload && (typeof payload === 'string' || typeof payload === 'number')) {
      const index = list?.findIndex((item) =>
        item.value?.toString()
          .replace(/\s+/g, "")
          .includes(payload?.toString()?.toLowerCase()?.replace(/\s+/g, ""))
      );
      if (typeof list[index]?.display === "string") return list[index]?.display;
    }
    return value;
  };

  const changeHandler = (item) => {
    onChange && onChange(item);
    setSelectedItem(item);
  };
  const clearInput = () => {
    onChange && onChange("");
    setSelectedItem(null);
  };
  return (
    <div className={`zt-formGroup ${containerClass}`}>
      <Combobox value={selectedItem} onChange={changeHandler}>
        <>
          {label && (
            <label
              className="dark:text-themeGrayscale300"
              htmlFor={id}
            >
              {label}{" "}
              {props?.required && (
                <sup className="text-[1.25rem] text-themeDanger">*</sup>
              )}
            </label>
          )}

          <div className="relative">
            <ComboboxInput
              {...props}
              id={id}
              className={`zt-themeInput${error ? " zt-error" : ""}`}
              placeholder={placeholder || "Select"}
              displayValue={getDisplayValue}
              onChange={(event) => setQuery(event.target.value)}
            />

            {!props?.readOnly && (
              <div className="zt-actions">
                {value && (
                  <button className="zt-btnClearAll" onClick={clearInput}>
                    <CloseCross aria-hidden="true" />
                  </button>
                )}
                <ComboboxButton className="zt-btnDownArrow">
                  <ChevronDown className={'dark:text-white'} aria-hidden="true" />
                </ComboboxButton>
              </div>
            )}

            <ComboboxOptions className="zt-multiSelectList py-2">
              {filtered?.length > 0 ? (
                filtered.map((item, index) => (
                  <ComboboxOption
                    key={index}
                    value={item.value}
                    className={`hover:text-themeSuccess cursor-pointer px-4 py-2 flex items-center justify-between ${comboClass}`}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          {item.display}
                        </span>
                        {selected && (
                          <span className={`flex items-center pl-3`}>
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </ComboboxOption>
                ))
              ) : (
                <p className="select-none px-4 py-2 text-h6 font-semibold mb-0">
                  Nothing found.
                </p>
              )}
            </ComboboxOptions>
          </div>
        </>
      </Combobox>

      {error && (
        <span className="zt-errorMessage">
          <InputErrorInfo /> {error}
        </span>
      )}
    </div>
  );
}
