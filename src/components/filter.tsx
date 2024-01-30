import classNames from "classnames";
import { useState } from "react";

type FilterProps = {
  children: React.ReactNode;
  filterName?: string;
  defaultValue: boolean;
};
export const Filter = ({
  children,
  filterName = "Filtro",
  defaultValue,
}: FilterProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(defaultValue);
  return (
    <div id="accordion-collapse" data-accordion="collapse">
      <h2 id="accordion-collapse-heading-1">
        <button
          type="button"
          onClick={() => setIsOpened((state) => !state)}
          className={classNames(
            isOpened
              ? "flex items-center justify-between w-full p-5 font-medium rtl:text-right border border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              : "flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border  border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          )}
          data-accordion-target="#accordion-collapse-body-1"
          aria-expanded="true"
          aria-controls="accordion-collapse-body-1"
        >
          <span>{filterName}</span>
          {isOpened ? (
            <svg
              data-accordion-icon
              className="w-3 h-3 rotate-180 shrink-0"
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
                d="M9 5 5 1 1 5"
              />
            </svg>
          ) : (
            <svg
              data-accordion-icon=""
              className="w-3 h-3 shrink-0"
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
                d="M9 5 5 1 1 5"
              ></path>
            </svg>
          )}
        </button>
      </h2>
      <div
        id="accordion-collapse-body-1"
        className={classNames(!isOpened ? "hidden" : "")}
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div className="p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Filter;
