import React from "react";

type SubTitleProps = {
  children: React.ReactNode;
};
const SubTitle = ({ children }: SubTitleProps) => {
  return (


    <section className="flex items-center bg-gray-50 dark:bg-gray-900 w-full my-2">
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-full">
        <div className="flex-row items-center justify-between py-2 px-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
          {children}
        </div>
      </div>
    </section>
  );
};

export default SubTitle;
