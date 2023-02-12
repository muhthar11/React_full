import { useFormik } from "formik";
import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../Redux/alertSlice";
import { useState } from "react";

function Register() {
  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    // image: "",
  };

  const [image, setImage] = useState("");

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "c6moothr");

    axios
      .post("https://api.cloudinary.com/v1_1/dwguevp8x/image/upload", formData)
      .then((response) => {
        console.log(response);
      });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    try {
      dispatch(showLoading());
      // uploadImage();
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
    // if (!values.image) {
    //   errors.image = "Required";
    // }
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
                {formik.errors.name}{" "}
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
              {" "}
              Add Profile{" "}
            </label>
            <input
              className="rounded-xl p-1 ml-3 pl-3"
              type="file"
              onChange={(event) => {
                setImage(event.target.files[0]);
              }}
            />

            {formik.touched.image && formik.errors.image ? (
              <div className="text-rose-600 pl-8 text-sm ">
                {formik.errors.image}
              </div>
            ) : null}
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
