const List = () => (
  <div
    id="accordion-flush"
    data-accordion="collapse"
    data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
    data-inactive-classes="text-gray-500 dark:text-gray-400"
  >
    <h3>
      <button
        type="button"
        className="flex items-center justify-between w-full py-1 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
        data-accordion-target="#accordion-flush-body-1"
        aria-expanded="true"
        aria-controls="accordion-flush-body-1"
      >
        <span>What is Flowbite?</span>
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
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>
    </h3>
    <div className="hidden" aria-labelledby="accordion-flush-heading-1">
      <div className="py-5 border-b border-gray-200 dark:border-gray-700">
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Flowbite is an open-source library of interactive components built on
          top of Tailwind CSS including buttons, dropdowns, modals, navbars, and
          more.
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Check out this guide to learn how to{" "}
          <a
            href="/docs/getting-started/introduction/"
            className="text-blue-600 dark:text-blue-500 hover:underline"
          >
            get started
          </a>{" "}
          and start developing websites even faster with components on top of
          Tailwind CSS.
        </p>
      </div>
    </div>
    <h3>
      <button
        type="button"
        className="flex items-center justify-between w-full py-1 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
        data-accordion-target="#accordion-flush-body-1"
        aria-expanded="true"
        aria-controls="accordion-flush-body-1"
      >
        <span>What is Flowbite?</span>
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
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>
    </h3>
    <div className="hidden" aria-labelledby="accordion-flush-heading-1">
      <div className="py-5 border-b border-gray-200 dark:border-gray-700">
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Flowbite is an open-source library of interactive components built on
          top of Tailwind CSS including buttons, dropdowns, modals, navbars, and
          more.
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Check out this guide to learn how to{" "}
          <a
            href="/docs/getting-started/introduction/"
            className="text-blue-600 dark:text-blue-500 hover:underline"
          >
            get started
          </a>{" "}
          and start developing websites even faster with components on top of
          Tailwind CSS.
        </p>
      </div>
    </div>
    <h3>
      <button
        type="button"
        className="flex items-center justify-between w-full py-1 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
        data-accordion-target="#accordion-flush-body-1"
        aria-expanded="true"
        aria-controls="accordion-flush-body-1"
      >
        <span>What is Flowbite?</span>
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
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>
    </h3>
    <div className="hidden" aria-labelledby="accordion-flush-heading-1">
      <div className="py-5 border-b border-gray-200 dark:border-gray-700">
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Flowbite is an open-source library of interactive components built on
          top of Tailwind CSS including buttons, dropdowns, modals, navbars, and
          more.
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Check out this guide to learn how to{" "}
          <a
            href="/docs/getting-started/introduction/"
            className="text-blue-600 dark:text-blue-500 hover:underline"
          >
            get started
          </a>{" "}
          and start developing websites even faster with components on top of
          Tailwind CSS.
        </p>
      </div>
    </div>
  </div>
);

export default List;
