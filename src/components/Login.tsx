"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { pb } from "@/lib/pocketbase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClientResponseError } from "pocketbase";
import useTimeout from "@/utils/useTimeout";

type FormValues = {
  username: string;
  password: string;
};

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const { timeOutRef } = useTimeout();
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormValues>();

  const handleLogin: SubmitHandler<FormValues> = (data) => {
    console.log("forminput", data);
    pb.collection("users")
      .authWithPassword(data.username, data.password)
      .then((res) => {
        document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
        router.push("/");
      })
      .catch((res: ClientResponseError) => {
        if (res.status === 400) {
          setErrorMessage("Credentials not correct.");
        } else {
          setErrorMessage("Something went wrong. Please try again.");
          console.error(res.message);
        }
        timeOutRef.current = setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
            <span className="ml-1 text-indigo-600">.</span>
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-white"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  {...register("username")}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 bg-gray-800 px-2 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-gray-700  placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register("password")}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 bg-gray-800 px-2 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          {errorMessage && (
            <div className="mt-3 text-sm font-semibold text-red-500">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
