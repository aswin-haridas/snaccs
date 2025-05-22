import React, { useState } from "react";
import { InputField, Button } from "@/components/ui";
import axios from "axios";

function LoginPage() {
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.target);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      const response = await axios.post("http://localhost:8000/signin", {
        username: data.username,
        password: data.password,
      });
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        const user = response.data.user;
        console.log(user);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="m-0 p-0 flex min-h-screen">
      <div className="w-1/2 flex items-center justify-center p-12">
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
          <h2 className="text-2xl font-semibold mb-8">Sign In</h2>
          <form method="POST" className="space-y-6" action={handleLogin}>
            <div className="text-left">
              <InputField
                type="text"
                name="username"
                placeholder="Username"
                required
                className="form-input w-full p-2"
              />
            </div>
            <div className="text-left">
              <InputField
                type="password"
                name="password"
                placeholder="Password"
                required
                className="form-input w-full p-2"
              />
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            <Button text="login" />
          </form>
          <p className="mt-6 text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-[#ec5228] hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
