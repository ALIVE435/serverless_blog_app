import { BlogCard } from "../components/BlogCard"
import { Appbar } from "../components/Appbar"
import { useBlogs } from "../hooks/index"
import { Skeleton } from "../components/BlogSkeleton";

interface Blog {
    id: string;
    content: string;
    title: string;
    author: {
        name: string;
    };
}


export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    // if (loading) return <div className="p-5 mt-[60px] font-bold">
    //     <Skeleton></Skeleton>
    // </div>
    console.log(import.meta.env.VITE_BACKEND_URL)

    return (
        <div className="box-border m-0 p-0 ">
            <div className="w-full max-w-full min-h-fit">
                <header className="relative h-auto">
                    <Appbar />
                </header>
                <div className="w-full mt-[60px]">
                    {loading ? <Skeleton /> :
                        <div className="md:w-5/6 w-full flex gap-x-1 p-2 mx-auto">
                            <div className="basis-3/4">
                                {blogs.map((blog: Blog, index: number) => (
                                    <BlogCard
                                        key={index}  // Adding a key is important when rendering lists
                                        id={blog.id}
                                        authorname={blog.author.name}  // Corrected to pass the author's name
                                        title={blog.title}
                                        content={blog.content}
                                        publishedDate="7 June 2024"
                                    />
                                ))}
                            </div>
                            <div className="w-1/4 border-1 rounded-md bg-stone-100 p-2">
                                <div className="h-full w-full inline-block relative ">
                                    <div className="sticky top-0">
                                        <div className="flex flex-col border-1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}