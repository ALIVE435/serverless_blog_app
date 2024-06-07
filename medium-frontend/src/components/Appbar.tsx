import { Avatar } from "./Avatar"
import { Link, useNavigate } from "react-router-dom"


export const Appbar = () => {
    const navigate = useNavigate()
    return (
        <div className="w-full shadow-lg border-2 border-gray-200 rounded-xl shadow-slate-500/50 fixed top-0 z-10 flex px-3 py-2 bg-white items-center justify-between">
            <div className="basis-3/5 md:basis-1/4 flex items-center justify-start gap-3">
                <Link to="/blogs" className="flex items-center ">
                    <img className="w-12 h-12 " src="data:image/png;base64,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" alt="" />
                </Link>
                <div className="flex h-10 items-center gap-2 p-1 bg-gray-100 rounded-xl">
                    <button className="">
                        <img className="w-6 h-6 text-center " src="https://img.icons8.com/?size=48&id=XU3XKgdpT0qG&format=png" alt="" />
                    </button>
                    <input type="text" className="bg-inherit outline-none caret-gray-500 h-full font-thin placeholder:text-slate-900" placeholder="Search" />
                </div>
            </div>
            <div className="hidden sm:block sm:basis-2/4"></div>
            <div className="basis-1/4 flex flex-row-reverse items-center justify-start gap-3 mr-0">
                <div className="w-10 h-10 flex justify-center items-center ">
                    <Avatar name="Aniket" size={{ w: 10, h: 10 }}></Avatar>
                </div>
                <button>
                    <img className="w-6 h-6"src="https://img.icons8.com/?size=48&id=eMfeVHKyTnkc&format=png" alt="" />
                </button>
                <button onClick={()=>{navigate("/publish")}} className="rounded-2xl bg-slate-100 px-2 py-1 ">Write it</button>
            </div>
        </div>
    )
}