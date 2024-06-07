import {  Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardProps {
    id: string,
    authorname: string;
    title: string;
    content: string;
    publishedDate: string;
    key: number
}

export const BlogCard: React.FC<BlogCardProps> = ({
    id,
    authorname,
    title,
    content,
    publishedDate,
}) => {
    return (
        <div className="w-full border-b-2 border-slate-100 my-6">
            <div className="flex justify-start items-center ">
                <Link to="" className="flex justify-start items-center m-0 p-0">
                    <div className="">
                        <Avatar name={authorname} size={{ h: 6, w: 6 }} />
                    </div>
                    <div className="font-normal hover:underline pl-1 text-sm">{authorname}</div>
                </Link>
                <div className=" flex justify-center items-center pl-2"><Circle></Circle></div>
                <div className="pl-2 font-thin text-slate-400 text-sm">{publishedDate}</div>
            </div>
            <Link to={`/blog/${id}`} >
                <div className="text-xl font-semibold">
                    {title}
                </div>
                <div className="text-md font-thin">
                    {content.slice(0, 80) + "..."}
                </div>
            </Link>
            <div className=" text-slate-500 text-sm font-thin pt-1">
                {`${Math.ceil(content.length / 100)} minutes read`}
            </div>
        </div>
    )
}

function Circle() {
    return (
        <div className="w-1 h-1 rounded-full bg-gray-700 "></div>
    )
}

