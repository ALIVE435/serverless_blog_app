import { useState, useEffect } from "react"
import axios from "axios"
import { useRecoilValue } from "recoil";
import { api} from "../atoms/blogList"
import { Blog } from "../pages/Blog";

interface Blog {
    id:string,
    content:string,
    title:string,
    author:{
        name:string
    }
}

export const useBlog = (id:string)=>{
    const [loading,setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    const url = useRecoilValue(api);

    useEffect(()=>{
        axios.get(`${url}${id}`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then(response=>{
            setBlog(response.data)
            setLoading(false);
        })
        .catch(err=>{
            console.log(err)
            setLoading(false)
        })
    },[])
    return{
        loading,
        blog
    }
}

export const useBlogs=()=>{
    const [loading,setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const url = useRecoilValue(api);

    useEffect(()=>{
        axios.get(`${url}bulk`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then(response=>{
            setBlogs(response.data)
            setLoading(false);
        })
        .catch(err=>{console.log(err)})
    },[])
    return{
        loading,
        blogs
    }
}

// const useBlog = ({id}:{id:string})=>{
//     const [loading,setLoading] = useState(true);
//     const [blog, setBlog] = useState<Blog>();

//     useEffect(()=>{
//         axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
//             headers:{
//                 Authorization:localStorage.getItem("token")
//             }
//         })
//         .then(response=>{
//             setBlog(response.data)
//             setLoading(false);
//         })
//         .catch(err=>{console.log(err)})
//     },[])
//     return{
//         loading,
//         blog
//     }

// }