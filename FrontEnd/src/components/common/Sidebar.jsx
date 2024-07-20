import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const Sidebar = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: signout } = useMutation({
		mutationFn: async () => {
			try {
				const res = await fetch("/api/auth/signout", {
					method: "POST",
				});
	
				const data = await res.json();
	
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
			} catch (error) {
				toast.error(error.message);
				throw error;
			}
		},
		onSuccess: () => {
			toast.success("Sign out successful");
			queryClient.setQueryData(["authUser"], null); // Clear authUser state
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
			navigate("/signin"); // Redirect to sign-in page
		},
		onError: (error) => {
			console.error("Sign out error:", error);
		}
	});
	const { data:authUser } = useQuery({ queryKey: ["authUser"] })

	return (
		<div className='md:flex-[2_2_0] w-20 text-center max-w-52'>
			<div className='sticky top-0 left-0 h-screen flex flex-col border-r border-third w- md:w-full'>
				<Link to='/' className='flex items-center gap-2 justify-center md:justify-start'>
					<div className="bg-third w-full flex justify-center md:w-12 lg:w-12 h-12">
						<img className="w-12 h-12" src="/709493_logo_512x512.png" alt="Logo" />
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
							to={`/profile/${authUser?.username}`}
							className='flex gap-3 justify-center md:justify-start lg:justify-start items-center hover:bg-third rounded-full md:rounded-none transition-all duration-300 py-2 pl-2 pr-2 md:w-full lg:w-full cursor-pointer'
						>
							<FaUser className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Profile</span>
						</Link>
					</li>
				</ul>
				{authUser && (
					<div className="mt-auto justify-around flex items-center">
						<Link
							to={`/profile/${authUser.username}`}
							className='flex gap-2 items-start transition-all duration-300 hover:bg-third py-2 px-4'
						>
							<div className='avatar hidden md:inline-flex'>
								<div className='w-8 rounded-full'>
									<img src={authUser.profileImage || "/avatar-placeholder.png"} alt="Profile" />
								</div>
							</div>
							<div className='flex justify-between flex-1'>
								<div className='hidden md:block'>
									<p className='text-white font-bold text-xs w-20 truncate'>{authUser.fullName}</p>
									<p className='text-slate-500 text-xs'>@{authUser.username}</p>
								</div>
							</div>
						</Link>
						<BiLogOut
							onClick={(e) => {
								e.preventDefault();
								signout();
							}}
							className='w-5 hover:text-third h-5 text-center cursor-pointer'
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
