import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home/Home';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import NotificationPage from './pages/notification/NotificationPage';
import Sidebar from './components/common/Sidebar';
import RightPanel from './components/common/RightPanel';
import ProfilePage from './pages/profile/ProfilePage';
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './components/common/LoadingSpinner';

const App = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
				const data = await res.json();
				if (data.error) return null;
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				// console.log("authUser is here:", data);
				return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });
  // console.log(authUser);
  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <LoadingSpinner size='lg' />
      </div>
    );
  }

  return (
    <div className='flex w-full mx-auto'>
      {authUser && <Sidebar />}
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to='/signin' />} />
        <Route path='/signin' element={!authUser ? <SignIn /> : <Navigate to='/' />} />
        <Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to='/' />} />
        <Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to='/signin' />} />
        <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to='/signin' />} />
      </Routes>
      {authUser && <RightPanel />}
      <Toaster />
    </div>
  );
};


export default App;