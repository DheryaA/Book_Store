import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {

  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
 const navigate= useNavigate()

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  }
const submit=async()=>{
  try {
      if(Values.username===""||Values.email===""|| Values.password===""||Values.address===""){
        alert("All fields are essential");
      }else{
        const response=await axios.post("http://localhost:1000/api/v1/sign-up",Values);
        alert(response.data.message);
        navigate("/login");
      }

  } catch (error) {
    alert(error.response.data.message);
  }
}

  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>Sign Up</p>
        <div className='mt-4'>
          <div>
            <label htmlFor='' className='text-zinc-400'>
              Username
            </label>
            <input
              type='text'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='username'
              name='username'
              value={Values.username}
              onChange={change}
              required />
          </div>

          <div className='mt-4'>
            <label htmlFor='' className='text-zinc-400'>
              Email
            </label>
            <input
              type='text'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='email'
              name='email'
              value={Values.email}
              onChange={change}
              required />
          </div>

          <div className='mt-4'>
            <label htmlFor='' className='text-zinc-400'>
              password
            </label>
            <input
              type='password'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='password'
              name='password'
              value={Values.password}
              onChange={change}
              required />
          </div>

          <div className='mt-4'>
            <label htmlFor='' className='text-zinc-400'>
              address
            </label>
            <input
              type="textarea"
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='address'
              name='address'
              value={Values.address}
              onChange={change}
              required />
          </div>
          <div className='mt-4'>
            <button onClick={submit} className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:text-blue-400'>
              Sign Up
            </button>
          </div>
          <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
            or
          </p>
          <p className=' flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
            Already have an account? &nbsp;
            <Link to="/login" className="hover:text-blue-500">
              <u>Login</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
