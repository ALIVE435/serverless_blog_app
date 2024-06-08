import { useParams } from "react-router-dom"
import { useBlog } from "../hooks/index"
import { Appbar } from "../components/Appbar";
import { Avatar } from "../components/Avatar";
import { Skeleton } from "../components/BlogSkeleton";
interface Blog {
    id: string;
    content: string;
    title: string;
    author: {
        name: string;
    };
}

export const Blog = () => {
    const { id } = useParams<{ id: string }>()
    const { loading, blog } = useBlog(id ?? "bulk")
    //const { loading, blog } = useBlog({ id: "iwe" })

    return (
        <div className="box-border m-0 p-0">
            <div className="w-full max-w-full min-h-fit">
                <header className="relative h-auto">
                    <Appbar />
                </header>
            </div>
            {loading && !blog ? (
                <Skeleton/>
            ) : blog ? (
                <div className="w-full mt-10 min-h-[100vh] bg-slate-50 pt-12">
                    <div className="grid w-full gap-6 grid-cols-12 mx-auto px-10 max-w-screen-xl">
                        <div className="col-span-8 ">
                            <div className="text-5xl font-extrabold">{blog.title}</div>
                            <div className="text-slate-500 pt-2">Posted on 6 June 2024</div>
                            <div className="pt-4">{blog.content}</div>
                        </div>
                        <div className="col-span-4 px-4">
                            <div className="text-lg text-slate-600">
                                Author
                            </div>
                            <div className="flex w-full gap-1">
                                <div className="w-8 h-8 mt-5">
                                    <Avatar name={blog.author.name} size={{ w: 8, h: 8 }} />
                                </div>
                                <div>
                                    <div className="tetx-lg font-bold">{blog.author.name}</div>
                                    <div className="pt-2 tex-slate-500">Author details:Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas pariatur error officia! Totam cumque doloremque perferendis laudantium quasi veritatis quidem.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>No such Blog found</div>
            )}
        </div>
    )
}