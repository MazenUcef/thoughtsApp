import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SignIn = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData({
            ...formData, [name]: value
        })
    }
    const isError = false;
    return (
        <div className='w-full mx-auto flex justify-center h-screen'>
            <div className='flex flex-col w-full lg:flex-row md:flex-row gap-10'>
                <div className='w-full bg-third flex items-center justify-center'>
                    <img src='/709493_logo_512x512.png' />
                </div>
                <div className='flex mt-10 lg:mt-0 md:mt-0 px-3 w-full flex-col justify-center'>
                    <div className='mb-16 flex justify-start'>
                        <div >
                            <h1 className='font-medium mb-5 text-6xl'>Welcome To <span className='text-third'>toughts</span> Website and Application</h1>
                            <p className='text-xl'>Here You can Write, share, document and explore a lot. Let's Go and gain the benefit </p>

                        </div>
                    </div>
                    <form className='flex flex-col w-full gap-5'>
                        <div className='w-full'>
                            <label htmlFor='username' className='text-lg pl-2 font-medium'>Username</label>
                            <input value={formData.username} onChange={handleChange} name='username' type="text" id='username' placeholder="Username.." className="mt-2 rounded-md input input-bordered w-full " />
                        </div>
                        <div className='w-full'>
                            <label htmlFor='password' className='text-lg pl-2 font-medium'>Password</label>
                            <input value={formData.password} onChange={handleChange} name='password' type="password" id='password' placeholder="Password" className="mt-2 rounded-md input input-bordered w-full" />
                        </div>
                        <div className='w-full flex justify-center'>
                            <button type="submit" className="px-20 py-3 text-white font-medium rounded-md bg-primary hover:bg-primary-dark">Sign In</button>
                        </div>
                        {isError && <p className='text-red-500'>Something went wrong</p>}
                    </form>
                    <div className='flex justify-center mt-10'>
                        <p className='text-md'>Don't have an account? <Link to={'/signup'} className='text-third'>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn