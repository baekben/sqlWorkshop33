/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SignUp({ setUserToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(null);
  const [success, setSucess] = useState(null);
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const name = username;
      const pass = password;
      console.log(typeof name, typeof pass);
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "*/*" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      console.log(response);
      const result = await response.json();
      setSucess(result);
      setUserToken(result.token);
    } catch (error) {
      setError(error);
    }
  }
  const passwordsMatch = password === passwordConfirm;
  return (
    <>
      <div className="loginContainerflex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="titleContainer flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <h1>Welcome</h1>
        </div>
        <div className="loginUser w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign Up
            </h2>
          </div>

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Username:{" "}
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
              />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password:{" "}
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Confirm Password:{" "}
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="password"
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                }}
                required
              />
            </label>
            <label>
              <button
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 my-3"
                type="submit"
                disabled={!passwordsMatch}
              >
                Sign In
              </button>
            </label>
          </form>
        </div>
        <div className="statusResponse">
          {!passwordsMatch && <p>Passwords do not match</p>}
          {error && <p>{error.message}</p>}
          {success && <p>{success.message}</p>}
        </div>
        <div className="existingUser">
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            {"Already have an account?"}
            <button
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              onClick={() => {
                navigate("/");
              }}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
