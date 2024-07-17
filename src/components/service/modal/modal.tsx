import classNames from "classnames";
import { PropsWithChildren } from "react";

type ModalProps = {
    title?: string;
    isOpened: boolean;
    onClose: () => void;
    footer: React.ReactNode;
}

const ModalGeneric = ({ children, title = "Poup", isOpened, footer, onClose }: PropsWithChildren<ModalProps>) => {
    return (
        <>
            <div
                id="popup-modal"
                tabIndex={-1}
                className={classNames(
                    "fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex",
                    isOpened ? "" : "hidden overflow-x-hidden"
                )}
            >
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="popup-modal"
                            onClick={onClose}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Fechar diálogo</span>
                        </button>

                        <div className="p-6 text-center mx-auto mb-4 text-gray-400  dark:text-gray-200">
                            {title}
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                {children}
                            </h3>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
            {isOpened ? (
                <div
                    modal-backdrop=""
                    className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"
                ></div>
            ) : (
                <></>
            )}
        </>
    );
}

export default ModalGeneric;