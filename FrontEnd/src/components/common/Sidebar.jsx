import XSvg from "../svgs/X";

import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
	const data = {
		fullName: "John Doe",
		username: "johndoe",
		profileImg: "/avatars/boy1.png",
	};

	return (
		<div className='md:flex-[2_2_0] w-20 text-center max-w-52'>
			<div className='sticky top-0 left-0 h-screen flex flex-col border-r border-third w- md:w-full'>
				<Link to='/' className='flex items-center gap-2 justify-center md:justify-start'>
					<div className="bg-third w-full flex justify-center md:w-12 lg:w-12 h-12">
						<img className="w-12 h-12 " src="/709493_logo_512x512.png" />
					</div>
					<h1 className="text-xl text-third hidden md:block lg:block font-semibold">thoughts</h1>
				</Link>
				<ul className='flex flex-col gap-3 mt-4'>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/'
							className='flex gap-3 justify-center md:justify-start lg:justify-start items-center hover:bg-third rounded-full md:rounded-none transition-all duration-300 py-2 pl-2 pr-2 md:w-full lg:w-full cursor-pointer'
						>
							<MdHomeFilled className='w-8 h-8' />
							<span className='text-lg hidden md:block'>Home</span>
						</Link>
					</li>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/notifications'
							className='flex gap-3 justify-center md:justify-start lg:justify-start items-center hover:bg-third rounded-full md:rounded-none transition-all duration-300 py-2 pl-2 pr-2 md:w-full lg:w-full cursor-pointer'
						>
							<IoNotifications className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Notifications</span>
						</Link>
					</li>

					<li className='flex justify-center md:justify-start'>
						<Link
							to={`/profile/${data?.username}`}
							className='flex gap-3 justify-center md:justify-start lg:justify-start items-center hover:bg-third rounded-full md:rounded-none transition-all duration-300 py-2 pl-2 pr-2 md:w-full lg:w-full cursor-pointer'
						>
							<FaUser className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Profile</span>
						</Link>
					</li>
				</ul>
				{data && (
					<Link
						to={`/profile/${data.username}`}
						className='mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-third py-2 px-4 rounded-full'
					>
						<div className='avatar hidden md:inline-flex'>
							<div className='w-8 rounded-full'>
								<img src={data?.profileImg || "/avatar-placeholder.png"} />
							</div>
						</div>
						<div className='flex justify-between flex-1'>
							<div className='hidden md:block'>
								<p className='text-white font-bold text-sm w-20 truncate'>{data?.fullName}</p>
								<p className='text-slate-500 text-sm'>@{data?.username}</p>
							</div>
							<BiLogOut className='w-5 h-5 cursor-pointer' />
						</div>
					</Link>
				)}
			</div>
		</div>
	);
};
export default Sidebar;