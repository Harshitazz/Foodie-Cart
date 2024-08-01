"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { submitContactForm } from "../_utils/GlobalApi";
import { useRouter } from "next/navigation";

export default function RestaurantSignup() {
  const { user } = useUser();
  const router = useRouter();

  const [submitted, setSubmitted] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    aboutUs: "",
    password: "",
    c_password: "",
  });
  const [passwordError, setPasswordError] = useState(false);




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValue.password !== formValue.c_password) {
      setPasswordError(true)
      return false
    }
    try {
      const res = await submitContactForm(formValue, user.emailAddresses[0].emailAddress);
      setFormValue({
        name: "",
        aboutUs: "",
        password: "",
        c_password: "",
      });
      setSubmitted(true);
      localStorage.setItem("restaurantId", JSON.stringify(res.createRestro));
      router.push("/");
      return res;
    } catch (e) {
      console.error("Error occurred:", e);
    }
  };

  const handleChange = (e) => {
    console.log(user.emailAddresses[0].emailAddress)
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base"
              onChange={handleChange}
              value={formValue.name || ""}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="aboutUs"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              About Us
            </label>
            <input
              type="text"
              name="aboutUs"
              id="aboutUs"
              placeholder="About Us"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base"
              onChange={handleChange}
              value={formValue.aboutUs || ""}
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base"
              onChange={handleChange}
              value={formValue.password || ""}
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="c_password"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="c_password"
              id="c_password"
              placeholder="confirm password"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base"
              onChange={handleChange}
              value={formValue.c_password || ""}
              required
            />
            {passwordError && (
            <span className="text-xs text-red-600">
              Password and Confirm password does not match.
            </span>
          )}
          </div>


          <div>
            <button
              type="submit"
              className="block rounded-md bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </form>
        {submitted && (
          <div className="bg-green-600 text-white p-2 my-4 rounded-md">
            Form submitted successfully!
          </div>
        )}
      </div>
    </div>
  );
}
