import { useFormik } from 'formik'
import React from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showLoading , hideLoading } from '../../Redux/alertSlice'


function Login() {
  
  const navigate = useNavigate();//path kodukkan

  // const {loading} = useSelector(state => state.alerts)
  // console.log(loading);
  
  const dispatch = useDispatch();
  
  const initialValues = {
    email: '',
    password: ''
  }

  const onSubmit = async (values) => {
    try{
      dispatch(showLoading());
       const response = await axios.post('/api/user/login',values)
       if(response.data.success){
          toast.success(response.data.message)
          localStorage.setItem('token',response.data.token)
          dispatch(hideLoading());
          navigate('/home')
       }else{
          toast.error(response.data.message)
          dispatch(hideLoading());
       }
    }catch(err){
      toast.error('somthing went wrong =',err);
      dispatch(hideLoading());
    }
  }

  const validate = values => {

    let errors = {};

    if (!values.email) {
      errors.email = "Required Email"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email format"
    }

    if (!values.password) {
      errors.password = "Required password"
    }

    return errors;

  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })


  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-pink-500'>
      <div className='w-96 p-5 bg-neutral-50 rounded-lg shadow-xl shadow-transparent'>
        <h1 className='font-sans text-3xl font-bold uppercase text-center mb-6'>Login</h1>
        <form onSubmit={formik.handleSubmit} className='flex  flex-col justify-center'>
          <div className='flex  flex-col justify-center mb-3'>
            <label htmlFor="" className='ml-2 font-sans text-sm font-medium'>Email</label>
            <input
              className=' rounded-xl p-1 ml-3 pl-3'
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='text-rose-600 pl-8 text-sm'>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className='flex  flex-col justify-center'>
            <label htmlFor="" className='ml-2 font-sans text-sm font-medium mb-3'>Password</label>
            <input
              className=' rounded-xl p-1 ml-3 pl-3'
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className='text-rose-600 pl-8 text-sm'>{formik.errors.password}</div>
            ):null}
          </div>


          <div className='mb-2 mt-2 flex justify-center '>
            <a href="" className='text-xs font-semibold text-gray-700 font-serif	'>Forgot password?</a>
          </div>

          <button type='submit'
            className='uppercase mt-5 mb-3 h-11 text-white text-lg font-medium font-sans bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl border'
          >
            Login
          </button>
          <div className='mb-3 mt-3 flex justify-center'>
            <p className='text-sm font-semibold font-serif	'>
              Don't have an account?
              <a href="/register" className='text-xs text-blue-700'>Register here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login