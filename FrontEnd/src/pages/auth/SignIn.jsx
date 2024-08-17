import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { mutate: signin, isLoading, isError, error } = useMutation({
        mutationFn: async ({ username, password }) => {
            try {
                const res = await fetch("/api/auth/signin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
            } catch (error) {
                throw new Error(error);
            }

        },
        onSuccess: () => {
            toast.success("User logged in successfully");
            queryClient.invalidateQueries({ queryKey: ["authUser"] });  // Set the authUser data immediately

        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData({
            ...formData, [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signin(formData);
    };

    return (
        <div className='w-full mx-auto flex justify-center h-screen'>
            <div className='flex flex-col w-full lg:flex-row md:flex-row gap-10'>
                <div className='w-full bg-third flex items-center justify-center'>
                    <img src='/709493_logo_512x512.png' />
                </div>
                <div className='flex mt-10 lg:mt-0 md:mt-0 px-3 w-full flex-col justify-center'>
                    <div className='mb-16 flex justify-start'>
                        <div>
                            <h1 className='font-medium mb-5 text-6xl'>Welcome To <span className='text-third'>thoughts</span> Website and Application</h1>
                            <p className='text-xl'>Here You can Write, share, document and explore a lot. Let's Go and gain the benefit</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className='flex flex-col w-full gap-5'>
                        <div className='w-full'>
                            <label htmlFor='username' className='text-lg pl-2 font-medium'>Username</label>
                            <input value={formData.username} onChange={handleChange} name='username' type="text" id='username' placeholder="Username.." className="mt-2 rounded-md input input-bordered w-full " />
                        </div>
                        <div className='w-full'>
                            <label htmlFor='password' className='text-lg pl-2 font-medium'>Password</label>
                            <input value={formData.password} onChange={handleChange} name='password' type="password" id='password' placeholder="Password" className="mt-2 rounded-md input input-bordered w-full" />
                        </div>
                        <div className='w-full flex justify-center'>
                            <button type="submit" className="px-20 py-3 text-white font-medium rounded-md bg-primary hover:bg-primary-dark">{isLoading ? "Loading..." : "Sign In"}</button>
                        </div>
                        {isError && <p className='text-third text-center'>{error.message}</p>}
                    </form>
                    <div className='flex justify-center mt-10'>
                        <p className='text-md'>Don't have an account? <Link to={'/signup'} className='text-third'>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
