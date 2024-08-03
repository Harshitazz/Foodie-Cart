"use client";

import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { submitContactForm } from "../_utils/GlobalApi";
import { useRouter } from "next/navigation";
import './ImageElement.css'
import Link from "next/link";
export default function RestaurantSignup() {
  const { user } = useUser();
  const router = useRouter();

  const [submitted, setSubmitted] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    aboutUs: "",
    password: "",
    c_password: "",
    address: "",
    workingHours: "",
    file: ""
  });
  const [passwordError, setPasswordError] = useState(false);


  // 
  const [previewUrl, setPreviewUrl] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const filePickerRef = useRef();
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dkhbiyylo");
      fetch("https://api.cloudinary.com/v1_1/dkhbiyylo/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setPreviewUrl(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      console.error("failed to upload")
      setPicLoading(false);
      return;
    }
  };
  // 


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValue.password !== formValue.c_password) {
      setPasswordError(true);
      return false;
    }
    try {
      const res = await submitContactForm(formValue, user.emailAddresses[0].emailAddress, pic);
      setFormValue({
        name: "",
        aboutUs: "",
        password: "",
        c_password: "",
        address: "",
        workingHours: "",
        file: ""
      });
      setSubmitted(true);
      localStorage.setItem("restaurantId", JSON.stringify(res.createRestro));
      return res;
    } catch (e) {
      console.error("Error occurred:", e);
    }
  };



  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
    const userData = JSON.parse(localStorage.getItem('restaurantId'))

  };



  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px] " >
        <form method="POST" onSubmit={handleSubmit} >

          <input
            style={{ display: 'none' }}
            ref={filePickerRef}
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
          <div className={`image-upload center`}>

            <div className="image-upload__preview" onClick={pickImageHandler}>
              {previewUrl && <img src={previewUrl} alt="Preview" />}
              {!previewUrl && <p>Please pick a Restaurant Pic.</p>}
            </div>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                htmlFor="address"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base"
                onChange={handleChange}
                value={formValue.address || ""}
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="workingHours"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                WorkingHours
              </label>
              <input
                type="text"
                name="workingHours"
                id="workingHours"
                placeholder="workingHours"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base"
                onChange={handleChange}
                value={formValue.workingHours || ""}
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
              {/*  */}
              <button

                type="submit"
                className="block rounded-md bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
              >
                Submit
              </button>
              {/* </Link> */}
              {
                submitted && (
                  <Link href={'restaurant/' + JSON.parse(localStorage.getItem('restaurantId')).id}>
                    add food item
                  </Link>
                )
              }
            </div>
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
