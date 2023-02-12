import { useFormik } from "formik";
import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../Redux/alertSlice";
import { useState } from "react";

function Register() {



  const countries = [
    { value: '', label: 'Select a country' },
    { value: 'USA', label: 'United States' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'India', label: 'India' },
    { value: 'China', label: 'China' },
    { value: 'Japan', label: 'Japan' }
  ];

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    image:"",
    country: "",
  };

  function convertBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    try {
      dispatch(showLoading());
      const base64 = await convertBase64(values.image)
      values.image = base64
      console.log("form data:", values);
      const response = await axios.post("/api/user/register", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error("somthing went wrong =", err);
    }
  };

  const validate = (values) => {
    let errors = {};

    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email format";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }

    if (!values.country) {
      errors.country = "Required";
    }
  
    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className=" w-96 p-6 shadow-lg bg-stone-50 rounded-lg shadow-gray-500">
        <h1 className="font-serifs text-xl font-bold text-center mb-5">
          Create your Free Account
        </h1>
        <form
          onSubmit={formik.handleSubmit}
          className="flex  flex-col justify-center "
          enctype="multipart/form-data"
        >
          <div className="flex  flex-col justify-center mb-3">
            <label className="font-serifs text-sm font-medium"> Name </label>
            <input
              className="rounded-xl p-1 ml-3 pl-3"
              type="text"
              name="name"
              placeholder="Your Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-rose-600 pl-8 text-sm ">
                {formik.errors.name}{" "}
              </div>
            ) : null}
          </div>

          <div className="flex  flex-col justify-center mb-3">
            <label className="font-serifs text-sm font-medium"> Email </label>
            <input
              className="rounded-xl p-1 ml-3 pl-3"
              type="email"
              name="email"
              placeholder="Your Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-rose-600 pl-8 text-sm ">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="flex  flex-col justify-center mb-3">
            <label className="font-serifs text-sm font-medium">
              {" "}
              Phone Number{" "}
            </label>
            <input
              className="rounded-xl p-1 ml-3 pl-3"
              type="number"
              name="phoneNumber"
              placeholder="Your phone number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="text-rose-600 pl-8 text-sm ">
                {formik.errors.phoneNumber}{" "}
              </div>
            ) : null}
          </div>

          <div className="flex  flex-col justify-center mb-3">
            <label className="font-serifs text-sm font-medium">
              {" "}
              Password{" "}
            </label>
            <input
              className="rounded-xl p-1 ml-3 pl-3"
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-rose-600 pl-8 text-sm ">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="flex  flex-col justify-center mb-3">
            <label className="font-serifs text-sm font-medium">
             Country
            </label>
          
             <select   
                className="rounded-xl p-1 ml-3 pl-3" 
                value={formik.values.country} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="country"
                >
                {countries.map(country => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
            </select>
            {formik.touched.country && formik.errors.country ? (
              <div className="text-rose-600 pl-8 text-sm ">
                {formik.errors.country}
              </div>
            ) : null}
          </div>

          <div className="flex  flex-col justify-center mb-3">
            <label className="font-serifs text-sm font-medium">
              {" "}
              Add Profile{" "}
            </label>
            
            <input
              className="rounded-xl p-1 ml-3 pl-3"
              type="file"
              accept=".png, .jpg, .jpeg"
              name="image" 
              onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
            />
            
          </div>

          <button
            type="submit"
            className=" uppercase font-serifs text-white  font-semibold mt-5 mb-3 bg-gradient-to-r from-sky-500 to-indigo-500 border-2 rounded-lg h-10"
          >
            Register
          </button>
        </form>
        <div className="font-serifs font-medium text-gray-500 flex justify-center mt-2">
          <p>
            {" "}
            Have already an account?
            <a className="text-gray-900" href="/">
              {" "}
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
