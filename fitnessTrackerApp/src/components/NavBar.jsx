/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
export default function NavBar({ userToken }) {
  return (
    <>
      <div className="navBarContainer max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="NavBar hidden w-full md:block md:w-auto">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0  ">
            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 "
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/routines"
                className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0"
              >
                Routines
              </Link>
            </li>
            <li>
              <Link
                to="/activites"
                className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0"
              >
                Activities
              </Link>
            </li>
            <li>{userToken && <p>Logged In</p>}</li>
          </ul>
        </div>
      </div>
    </>
  );
}
