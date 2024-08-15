import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
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
    if (payload && typeof payload === 'string') {
      const index = list?.findIndex((item) =>
        item.value
          .replace(/\s+/g, "")
          .includes(payload?.toLowerCase()?.replace(/\s+/g, ""))
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
            <Combobox.Label
              className="dark:text-themeGrayscale300"
              htmlFor={id}
            >
              {label}{" "}
              {props?.required && (
                <sup className="text-[1.25rem] text-themeDanger">*</sup>
              )}
            </Combobox.Label>
          )}

          <div className="relative">
            <Combobox.Input
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
                <Combobox.Button className="zt-btnDownArrow">
                  <ChevronDown aria-hidden="true" />
                </Combobox.Button>
              </div>
            )}

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="zt-multiSelectList">
                {filtered?.length > 0 ? (
                  filtered.map((item, index) => (
                    <Combobox.Option
                      key={index}
                      value={item.value}
                      className={`hover:text-white ${comboClass}`}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
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
                    </Combobox.Option>
                  ))
                ) : (
                  <p className="select-none px-4 py-2 text-h6 font-semibold mb-0">
                    Nothing found.
                  </p>
                )}
              </Combobox.Options>
            </Transition>
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
