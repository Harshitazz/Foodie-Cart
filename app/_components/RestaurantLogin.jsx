// RestaurantLoginForm.js
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { getRestaurantLogin } from '../_utils/GlobalApi';
import bcrypt from 'bcryptjs';

export default function RestaurantLogin() {
  const { user } = useUser();
  const [submitted, setSubmitted] = useState(false)

  const router = useRouter();
  const [formValue, setFormValue] = useState({
    name: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getRestaurantLogin(formValue)

      setFormValue({
        name: "",
        password:""

      });

      const restaurant = res.restros[0];
      if (restaurant) {
        const passwordMatch = await bcrypt.compare(formValue.password, restaurant.password);
        if (passwordMatch) {
          localStorage.setItem('restaurantId', JSON.stringify(restaurant.id));
          router.push('/');
          setSubmitted(true);

        } else {
          setError('Invalid credentiall');
        }
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.log(error.message);
    }
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
