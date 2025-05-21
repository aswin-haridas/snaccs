import React from "react";
import { InputField, Button } from "@/components/ui";

function SignupPage() {
  return (
    <div>
      <div className="m-0 p-0 flex min-h-screen">
        <div className="w-1/2  flex items-center justify-center p-12">
          <div className=" max-w-lg">
            <h1 className="text-4xl font-bold mb-6">
              Welcome to our Canteen Management System
            </h1>
            <p className="text-xl opacity-80">
              Sign in to our platform to enjoy seamless dining experience with
              easy ordering and payment.
            </p>
          </div>
        </div>

        <div className="w-1/2 flex justify-center items-center p-12">
          <div className="w-full max-w-md p-8 text-center border border-gray-200 rounded-xl shadow-xl bg-white">
            <h2 className="text-2xl font-semibold mb-8">Sign Up</h2>
            <form method="POST" className="space-y-6">
              <div className="text-left">
                <InputField
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className=" w-full p-2"
                />
              </div>
              <div className="text-left">
                <InputField
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                  className="w-full p-2"
                />
              </div>
              <div className="text-left">
                <InputField
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full p-2"
                />
              </div>
              <div className="text-left">
                <InputField
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  className="w-full p-2"
                />
              </div>
              <Button text="Sign Up" />
            </form>
            <p className="mt-6 text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-[#ec5228] hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
