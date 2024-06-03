import { BlogCard } from "../components/BlogCard"
import { Appbar } from "../components/Appbar"
import { useBlogs } from "../hooks/index"

interface Blog {
    id: string;
    content: string;
    title: string;
    author: {
        name: string;
    };
}


export const Blog = () => {
    const { loading, blogs } = useBlogs();
    if (loading) return <div className="p-5 font-bold">
        loading...
    </div>
    
    return (
        <div className="w-full h-auto border-4 p-3 border-red-600 rounded-sm">
            <header className="border-2 p-0 m-0 border-gray-600 rounded-sm h-auto">
                <Appbar />
            </header>
            <div className="w-full">
                <div className="flex gap-x-3 mx-auto px-7 h-auto  xl:w-4/5 sm:text-wrap break-words">
                    <div className="px-4 border-2 border-r-gray-200 w-3/4 ">
                        {blogs.map((blog:Blog,index:number) =>
                            <BlogCard key={index} id={blog.id} authorname={blog.author.name} title={blog.title} content={blog.content} publishedDate={"2 June 2024"} />
                        )}

                    </div>
                    <div className="bg-pink-200 w-1/4 border-4 p-1 border-green-600">
                        <div className="h-full w-full inline-block relative ">
                            <div className="sticky top-0">
                                <div className="flex flex-col border-2 border-blue-950">Lorem ipsum dolor sit amet  necessitatibus? Voluptate magnam porro quaerat deserunt. Mollitia expedita repellat soluta obcaecati quae ad rerum possimus aliquid fuga, laboriosam animi epellendus, aliquid eligendi eveniet dolores provident unde iusto quod. Esse, libero nemo autem nostrum quaerat beatae ex Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus impedit a minima dolorem, labore, ut, natus harum commodi totam officiis ipsam? Doloremque labore, temporibus tempore corrupti delectus similique voluptatum vel a facere dignissimos ad odit nihil! Doloremque reprehenderit obcaecati quibusdam eos veritatis enim cum, earum dignissimos neque aspernatur in, pariatur perferendis quaerat sed vitae hic numquam ipsum! Beatae, ipsam ex odit facilis magni in eum alias sint odio eius omnis laboriosam eveniet molestiae et, doloribus corporis excepturi quod exercitationem aperiam iste ratione. Voluptatem, quisquam porro ea repudiandae laudantium, ratione dolores reprehenderit eveniet, aspernatur blanditiis ipsum consectetur. Sit repellat architecto molestiae.commodi cumque error totam incidunt temporibus illo perferendis, alias dolorum!</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}