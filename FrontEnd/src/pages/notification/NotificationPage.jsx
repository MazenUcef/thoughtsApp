import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUser, FaHeart, FaComment } from "react-icons/fa";
import toast from "react-hot-toast";

const NotificationPage = () => {
    const queryClient = useQueryClient();

    const { data: notifications, isLoading } = useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            try {
                const res = await fetch('/api/notifications');
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
                return data;
            } catch (error) {
                throw new Error(error.message);
            }
        }
    });

    const { mutate: deleteNotification } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/notifications`, {
                    method: 'DELETE',
                });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            toast.success("Notification deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const deleteNotifications = () => {
        deleteNotification();
    };

    return (
        <div className='flex-[4_4_0] border-l border-r border-gray-700 min-h-screen'>
            <div className='flex justify-start md:justify-between lg:justify-between md:gap-0 lg:gap-0 gap-10 items-center p-4 border-b border-gray-700'>
                <p className='font-bold'>Notifications</p>
                <div className='dropdown'>
                    <div tabIndex={0} role='button' className='m-1'>
                        <IoSettingsOutline className='w-4' />
                    </div>
                    <ul
                        tabIndex={0}
                        className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
                    >
                        <li>
                            <a onClick={deleteNotifications}>Delete all notifications</a>
                        </li>
                    </ul>
                </div>
            </div>
            {isLoading && (
                <div className='flex justify-center h-full items-center'> 
                    <LoadingSpinner size='lg' />
                </div>
            )}
            {notifications?.length === 0 && <div className='text-center p-4 font-bold'>No notifications 🤔</div>}
            {notifications?.map((notification) => (
                <div className='border-b border-gray-700' key={notification._id}>
                    <div className='flex gap-2 p-4'>
                        {notification.type === "follow" && <FaUser className='w-7 h-7 text-third' />}
                        {notification.type === "like" && <FaHeart className='w-7 h-7 text-third' />}
                        {notification.type === "comment" && <FaComment className='w-7 h-7 text-third' />}
                        <Link to={`/profile/${notification.from.username}`}>
                            <div className='avatar'>
                                <div className='w-8 rounded-full'>
                                    <img src={notification.from.profileImage || "/avatar-placeholder.png"} />
                                </div>
                            </div>
                        </Link>
                        <div className='flex gap-1'>
                            <span className='font-bold'>@{notification.from.username}</span>{" "}
                            {notification.type === "follow" ? "followed you" :
                                notification.type === "like" ? "liked your post" :
                                    `commented: "${notification.comment.text}" on your post "${notification.comment.postId.title}"`}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotificationPage;
