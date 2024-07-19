import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import NotificationPage from './pages/notification/NotificationPage';
import Sidebar from './components/common/Sidebar';
import RightPanel from './components/common/RightPanel';
import ProfilePage from './pages/profile/ProfilePage';

const App = () => {
  return (
    <div className='flex w-full mx-auto'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/notifications' element={<NotificationPage />} />
        <Route path='/profile/:username' element={<ProfilePage />} />
      </Routes>
      <RightPanel />
    </div>
  )
}

export default App;