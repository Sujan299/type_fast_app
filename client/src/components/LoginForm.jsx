import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { setUserInformation } from '../redux/user/userInformationSlice';
import { useDispatch } from 'react-redux';


const LoginForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate()
    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:3000/auth/login", formData,
                {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    withCredentials: true
                }
            );
            const data = response.data;
            if(response.status === 200){
                dispatch(setUserInformation(data))
                navigate("/")
            }
        }catch(err){
            console.log("Error while creating an account !",err)
        }
    }
    // console.log(formData)
    return (
        <div className='w-[40vw] flex flex-col gap-6'>
            <div>
                <h2 className='text-3xl'>Login</h2>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input type="text" className="grow" placeholder="Email" name="email" value={formData.email} onChange={handleChange}/>
                    </label>
                </div>
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd" />
                        </svg>
                        <input type="password" className="grow" name="password" value={formData.password} onChange={handleChange} />
                    </label>
                </div>
                <div>
                    <button className="btn w-full" type='submit'>Login</button>
                </div>
            </form>
            <div>
                <button class="btn w-full flex items-center gap-2 bg-white border border-gray-300 shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-200">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" alt="Google Logo" />
                    <span class="text-gray-700 font-medium">Sign in with Google</span>
                </button>
            </div>
            <Link to='/signup' className='text-center'>Haven't an accout ? <span className='underline'>signup</span></Link>
        </div>
    )
}

export default LoginForm