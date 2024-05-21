import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import authMiddleware from "../middleware";
import { createPost,updatePost } from "@alive435/medium-common";

type bindings={
    DATABASE_URL:string;
    JWT_SECRET:string;
}
type varibles={
    userId:string;
}

export const blogRoute = new Hono<{Bindings:bindings,Variables:varibles}>();//setting context of env variable here .toml file(https://hono.dev/getting-started/cloudflare-workers#load-env-when-local-development) and  upcoming key(userId) we'r adding in middleware (https://hono.dev/api/context#contextvariablemap https://hono.dev/api/context#set-get)


blogRoute.use(authMiddleware) //passed in as callback

blogRoute.post('/',async(c)=>{
	const body = await c.req.json();
	const {success}=createPost.safeParse(body);
	if(!success){
		c.status(411);
		return c.json({
			message:"inputs not correct"
		})
	}
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	
	const blog= await prisma.post.create({
		data:{
			title:body.title,
			content:body.content,
			authorId:c.get('userId')
		}
	});
	return c.json(blog)
})

blogRoute.put('/', async (c) => {
	const body = await c.req.json();
	const {success}= updatePost.safeParse(body);
	if(!success){
		c.status(411);
		return c.json({
			message:"inputs not correct"
		})
	}
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title!=null?body.title:undefined,     //https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/null-and-undefined#null-and-undefined-in-a-graphql-resolver
			content: body.content!=null?body.content:undefined
		}
	});

	return c.text('updated post');
});

//implement pagination : send first 5/7 posts if ask more then deliver  https://www.prisma.io/docs/orm/prisma-client/queries
blogRoute.get('/bulk',async(c)=>{     //http://localhost:8787/api/v1/blog/bulk  if controller cant reach here it'll move down
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const blogs =await prisma.post.findMany();
	return c.json(blogs);
})

blogRoute.get('/:id', async (c) => {     //http://localhost:8787/api/v1/blog/bulk anything after 'blog' will reach here
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	try{
		const post = await prisma.post.findFirst({
			where: {
				id
			}
		});
		return c.json(post);
	}catch(e){
		c.status(411);
		return c.json("error while fetching blog")
	}
});
