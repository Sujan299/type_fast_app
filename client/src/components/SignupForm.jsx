import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        image: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
        email: "",
        password: "",
        provider: "local"
    });
    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    console.log(formData)
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:3000/auth/signup", formData,
                {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                    },
                  }
            );
            console.log(response)
            console.log(response.status);
            if(response.status === 201){
                // user created successfully and navigate it to somewhere
            }
        }catch(err){
            console.log("Error while creating an account !",err)
        }
    }
    return (
        <div className='w-[40vw] flex flex-col gap-6'>
            <div>
                <h2 className='text-3xl'>Create Account</h2>
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
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input type="text" className="grow" placeholder="Username" name='username' onChange={handleChange} value={formData.username}/>
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
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input type="text" className="grow" placeholder="email"  name='email' onChange={handleChange} value={formData.email}/>
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
                        <input type="password" className="grow"  name='password' onChange={handleChange} value={formData.password}/>
                    </label>
                </div>
                <div>
                    <input type="file" className="file-input w-full max-w-xs" />
                </div>
                <div>
                    <button className="btn w-full" type='submit'>Signup</button>
                </div>
            </form>
            <div>
                <button class="btn w-full flex items-center gap-2 bg-white border border-gray-300 shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-200">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" alt="Google Logo" />
                    <span class="text-gray-700 font-medium">Sign up with Google</span>
                </button>
            </div>
            <Link to='/login' className='text-center'>Already have an accout ? <span className='underline'>login</span></Link>
        </div>
    )
}

export default SignupForm