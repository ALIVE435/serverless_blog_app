import { atom , selector} from 'recoil';

interface Blog {
    id: string;
    content: string;
    title: string;
    author: {
        name: string;
    };
}

export const blogList = atom<Blog[]>({
    key: 'blogState', // unique key for this atom
    default: [
        {
            id: '',
            content: '',
            title: '',
            author: {
                name: ''
            }
        }
    ]
});

export const blogId = atom({
    key:"id",
    default:""
})

export const blog = selector<Blog | undefined>({
  key: 'blog',
  get: ({ get }):Blog => {
    const blogs = get(blogList);
    const id= get(blogId);
    const desiredBlog = blogs.filter((blog:Blog)=>blog.id==id)
    return desiredBlog[0];
  },
});