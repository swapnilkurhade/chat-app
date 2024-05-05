import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import { useSignUp } from '../../hooks/useSignUp'

const SignUp = () => {

    const {loading, signup} =  useSignUp();

    const [inputs, setInputs] = useState({
        fullName : '',
        username : '',
        password : '',
        confirmPassword : '',
        gender : ''
    })

    const handleCheckBox = (gender) =>{
        setInputs({...inputs, gender})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log(inputs);
        await signup(inputs);
    }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-300'>
                SignUp
                <span className='text-blue-500'> ChatApp</span>
            </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Full Name</span>
                    </label>
                    <input type='text' name='fullName' placeholder='Enter Full Name' className='w-full h-10 input input-bordered'
                    value={inputs.fullName}
                    onChange={(e)=>{setInputs({...inputs, [e.target.name] : e.target.value})}}
                    required
                    ></input>
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input type='text' name='username' placeholder='Enter Username' className='w-full h-10 input input-bordered'
                        value={inputs.username}
                        onChange={(e)=>{setInputs({...inputs, [e.target.name] : e.target.value})}}
                        required
                    ></input>
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input type='password' name='password' placeholder='Enter Password' className='w-full h-10 input input-bordered'
                        value={inputs.password}
                        onChange={(e)=>{setInputs({...inputs, [e.target.name] : e.target.value})}}
                        required
                    ></input>
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Confirm Password</span>
                    </label>
                    <input type='password' name='confirmPassword' placeholder='Enter Password Again' className='w-full h-10 input input-bordered'
                        value={inputs.confirmPassword}
                        onChange={(e)=>{setInputs({...inputs, [e.target.name] : e.target.value})}}
                        required
                    ></input>
                </div>
                {/* Gender Checkbox */}
                <GenderCheckBox handleCheckBox={handleCheckBox} selectedGender={inputs.gender}/>

                <Link to={'/login'} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                    Already Have an account?
                </Link>

                <div>
                    <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>Sign Up</button>
                </div>
            </form>
      </div>
    </div>
  )
}

export default SignUp
