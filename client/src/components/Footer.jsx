import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-y">
      <div className="mx-auto w-full max-w-7xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img
                src="data:image/jpeg;base64,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"
                className="mr-3 h-16"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Resources
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:underline">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Follow us
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/HassanAbid-dev"
                    className="hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Legal
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link to="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <Link to="#" className="text-gray-500 hover:text-gray-900">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </Link>
            <Link to="#" className="text-gray-500">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 21 16"
              >
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span className="sr-only">Discord community</span>
            </Link>
            <Link to="#" className="text-gray-500">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path
                  fillRule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Twitter page</span>
            </Link>
            <Link to="#" className="text-gray-500">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">GitHub account</span>
            </Link>
            <Link to="#" className="text-gray-500">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Dribbble account</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
