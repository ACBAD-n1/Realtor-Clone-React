import { signInWithPopup, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { serverTimestamp, doc, getDoc, setDoc } from 'firebase/firestore';
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import { db } from "../firebase"; // Adjust the path if it's different in your project
import { useNavigate } from 'react-router';


function OAuth() {
  const navigate = useNavigate()
  async function onGoogleClick(){
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      
      // Check For the user
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)

      if(!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });

      }
      navigate("/")
    } catch (error) {
      toast.error("Could not authorize With Google")
      console.log(error)
    }
  }
  return (
    <button onClick={onGoogleClick}
    type='button'
    className='flex
    items-center
    justify-center w-full 
    bg-red-700 text-white
    px-7 py-3 uppercase text-sm font-medium
    hover:bg-red-800
    active:bg-red-900 active:shadow-lg
    transition duration-150 ease-in-out rounded'>
        <FcGoogle  className='text-2xl bg-white rounded-full mr-2'/>
        Continue with Google
    </button>
  )
}

export default OAuth