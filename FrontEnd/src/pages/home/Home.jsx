import React, { useState } from 'react'
import CreatePosts from './CreatePosts'
import Posts from '../../components/common/Posts'

const Home = () => {
    const [feedtype, setFeedType] = useState('forYou')
    return (
        <>
            <div className='flex-[4_4_0] mr-auto border-r border-third min-h-screen'>
                {/* HEADER */}
                <div className='flex w-full border-b border-third'>
                    <div
                        onClick={() => setFeedType("forYou")}
                        className='flex justify-center flex-1 p-3 hover:bg-fourth 
                    transition duration-300 cursor-pointer relative'>
                        For you
                        {
                            feedtype === "forYou" && (
                                <div className='
                                absolute bottom-0 w-10 h-1 rounded-full bg-third'></div>
                            )
                        }
                    </div>
                    <div onClick={() => setFeedType("following")} className='flex justify-center flex-1 p-3 hover:bg-fourth transition duration-300 cursor-pointer relative'>
                        Following
                        {
                            feedtype === "following" && (
                                <div className='absolute bottom-0 w-10 h-1 rounded-full bg-third'></div>
                            )
                        }
                    </div>
                </div>
                {/* CREATE POST INPUT */}
                <CreatePosts />
                {/* POSTS */}
                <Posts feedType={feedtype} />
            </div>
        </>
    )
}

export default Home