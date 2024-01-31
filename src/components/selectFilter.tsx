import React, { useEffect, useMemo, useRef, useState } from "react";

import classNames from "classnames";
import { Control, RegisterOptions, useController } from "react-hook-form";

export interface SelectValue {
  name: string;
  value: string;
}

type SelectFilterProps = {
  values: SelectValue[];
  searchPlaceholder: string;
  emptyPlaceholder: string;
  search: string;
  // eslint-disable-next-line
  control: Control<any>;
  name: string;
  rules?: Omit<
    // eslint-disable-next-line
    RegisterOptions<any, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
};

const SelectFilter = ({
  values,
  searchPlaceholder,
  emptyPlaceholder,
  search,
  control,
  name,
  rules,
}: SelectFilterProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [filterList, setFilterList] = useState<SelectValue[]>(values);

  const {
    field: { ref, onChange, onBlur, value },
    formState: { errors },
  } = useController({
    control: control,
    name: name,
    rules: rules,
  });

  const selectItem = (value: SelectValue) => {
    onChange(value.value);
    setIsExpanded((state) => !state);
  };

  useEffect(() => {
    if (isExpanded) {
      setSearchInput("");
      searchRef.current?.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    setFilterList(
      values.filter((f) =>
        f.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [searchInput, setFilterList, values]);

  const displayValue = useMemo(
    () => values.find((f) => f.value === value)?.name || emptyPlaceholder,
    [value, values, emptyPlaceholder]
  );

  const handleInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      e.preventDefault();
      firstButtonRef.current?.click();
    }
  };

  return (
    <>
      <button
        type="button"
        className="flex justify-between items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onClick={() => setIsExpanded((state) => !state)}
        onBlur={() => onBlur()}
      >
        {displayValue}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <input type="hidden" ref={ref} />
      <div
        className={classNames(
          "z-10 bg-white rounded-lg shadow w-full dark:bg-gray-700 mt-1",
          !isExpanded ? "hidden" : ""
        )}
      >
        <div className="p-3">
          <label htmlFor="input-group-search" className="sr-only">
            {search}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="input-group-search"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={searchPlaceholder}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => handleInputKey(e)}
              ref={searchRef}
              autoComplete="off"
              onFocus={(e) => (e.target.value = "")}
            />
          </div>
        </div>
        <ul
          className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownSearchButton"
        >
          {filterList.map((value, index) => {
            const isFirstOption = index === 0;
            const isOther = value.value === "other";
            return (
              <li key={index}>
                <button
                  type="button"
                  className={classNames(
                    "flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left",
                    isFirstOption ? "bg-gray-100 dark:bg-gray-600" : "",
                    isOther ? "bg-green-200 dark:bg-green-900" : ""
                  )}
                  onClick={() => selectItem(value)}
                  ref={isFirstOption ? firstButtonRef : undefined}
                >
                  <label
                    htmlFor="checkbox-item-11"
                    className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >
                    {value.name}
                  </label>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {errors[name] && (
        <p className="my-2 text-sm text-red-600 dark:text-red-500">{errors[name]?.message?.toString() || "Validation Error"}</p>
      )}
    </>
  );
};

export default SelectFilter;
