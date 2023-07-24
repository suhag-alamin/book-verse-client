import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSignupMutation } from "../redux/features/auth/authApi";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const Signup = () => {
  const [signup, { isSuccess, data }] = useSignupMutation();

  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { firstName, lastName, email, password } = data;
    const signUpData = {
      name: {
        firstName,
        lastName,
      },
      email,
      password,
    };
    console.log(signUpData);
    signup(signUpData);
  };

  console.log(isSuccess);
  console.log(data);

  return (
    <div className="w-full max-w-xl mx-auto p-6">
      <div className="mt-7 bg-white border border-bookVersePrimary rounded-xl shadow-sm">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 ">Sign in</h1>
            <p className="mt-2 text-sm text-gray-600 ">
              Already have an account?
              <Link
                className="text-bookVerseTertiary decoration-2 hover:underline font-medium ml-1"
                to="/login"
              >
                Login here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-y-4">
                <div className="flex gap-2">
                  <div className="w-full">
                    <label htmlFor="firstName" className="block text-sm mb-2 ">
                      First Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="firstName"
                        className="py-3 px-4 block w-full border border-bookVersePrimary rounded-md text-sm focus:border-bookVerseTertiary focus:ring-bookVerseTertiary"
                        required
                        {...register("firstName", {
                          required: true,
                        })}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label htmlFor="lastName" className="block text-sm mb-2 ">
                      Last Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="lastName"
                        className="py-3 px-4 block w-full border border-bookVersePrimary rounded-md text-sm focus:border-bookVerseTertiary focus:ring-bookVerseTertiary"
                        required
                        {...register("lastName", {
                          required: true,
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm mb-2 ">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      className="py-3 px-4 block w-full border border-bookVersePrimary rounded-md text-sm focus:border-bookVerseTertiary focus:ring-bookVerseTertiary"
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
                      className="py-3 px-4 block w-full border border-bookVersePrimary rounded-md text-sm focus:border-bookVerseTertiary focus:ring-bookVerseTertiary"
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

export default Signup;
