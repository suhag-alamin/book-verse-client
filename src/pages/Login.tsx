import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hook";
import { ICustomError } from "../types/globalTypes";

type FormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const [login, { isSuccess, isError, error, data }] = useLoginMutation();

  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (userData) => {
    setEmail(userData.email);
    login(userData);
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      const {
        data: { accessToken },
      } = data;

      dispatch(
        setCredentials({
          accessToken,
          email,
        })
      );
      // set token to local storage
      localStorage.setItem("accessToken", data.data.accessToken);

      toast.success("Login successful. Welcome back!");

      navigate("/");
    }
    if (isError) {
      const signUpError = error as ICustomError;

      toast.error(signUpError?.data?.message);
    }
  }, [isSuccess, navigate, isError, error, data, dispatch, email]);

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white border border-bookVersePrimary  rounded-xl shadow-sm">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 ">Sign in</h1>
            <p className="mt-2 text-sm text-gray-600 ">
              Don't have an account yet?
              <Link
                className="text-bookVerseTertiary decoration-2 hover:underline font-medium ml-1"
                to="/signup"
              >
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm mb-2 ">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      className="py-3 px-4 block w-full border border-bookVersePrimary  rounded-md text-sm focus:border-bookVerseTertiary focus:ring-bookVerseTertiary"
                      required
                      {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="block text-sm mb-2">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      className="py-3 px-4 block w-full border border-bookVersePrimary  rounded-md text-sm focus:border-bookVerseTertiary focus:ring-bookVerseTertiary"
                      required
                      {...register("password", {
                        required: true,
                      })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-bookVersePrimary text-white hover:bg-bookVerseTertiary focus:outline-none focus:ring-2 focus:ring-bookVerseTertiary focus:ring-offset-2 transition-all text-sm"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;