import React, { useState } from 'react'
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../firebase'; 
import { ToastContainer, toast } from 'react-toastify';



function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const {name, email, password} = formData;
  const navigate = useNavigate()
  function onChange(e) {
    setFormData((prevState) =>  ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault()

    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword
      (auth, email, password)
      updateProfile(auth.currentUser, {
        displayName: name
      })
      const user = userCredential.user 
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy)
      toast.success("Welcome To Realotor Clone")
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with the registration");
    }
  }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>
        Sign Up
      </h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto '>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img
           className='w-full rounded-2xl'
           src="https://images.unsplash.com/photo-1634979149798-e9a118734e93?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Key-image" 
           />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
          <input 
            type="text" id='name' 
            value={name} 
            onChange={onChange}
            placeholder='Full Name' 
            className='w-full px-4 py-2 mb-6 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
            />

            <input 
            type="email" id='email' 
            value={email} 
            onChange={onChange}
            placeholder='Email Address' 
            className='w-full px-4 py-2 mb-6 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
            />
            <div className='relative'>
            <input 
            type={showPassword ? "text" : "password" }
            id='password' 
            value={password} 
            onChange={onChange}
            placeholder='Password' 
            className='w-full px-4 py-2 mb-6 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
            />
            {showPassword ?(
              <FaEyeSlash className='absolute right-3 top-3 cursor-pointer'
              onClick={()=> setShowPassword((prevState) => !prevState)} />
            ) : (<FaEye  className='absolute right-3 top-3 cursor-pointer'
              onClick={()=> setShowPassword((prevState) => !prevState)} />) }
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p>
                Have an account?
                <Link to="/sign-in"
                className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'>
                  Sign In
                </Link>
              </p>
              <p>
                <Link to="/forgot-password"
                className='text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out ml-1'>
                  Forgot password?</Link>
              </p>
            </div>
            <button  className='w-full bg-blue-600 
          text-white px-7 py-3 
          text-sm font-medium 
          uppercase rounded 
          shadow-md hover:bg-blue-700 
          transition duration-150 ease-in-out 
          hover:shadow-lg active:bg-blue-800'
          type="submit">
            Sign Up
          </button>
          <div className='flex my-4 items-center 
            before:border-t before:flex-1  before:border-gray-300 
            after:border-t after:flex-1 after:border-gray-300'>
          <p className='text-center font-semibold mx-4'>OR</p>
        </div>
              <OAuth />
          </form>
        </div>

      </div>
    </section>
  )
}

export default SignUp