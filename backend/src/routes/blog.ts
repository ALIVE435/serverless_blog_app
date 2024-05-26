import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import authMiddleware from "../middleware";
import { createPost,updatePost } from "@alive435/medium-common";

type bindings={
    DATABASE_URL:string;
    JWT_SECRET:string;
}
type variables={
    userId:string;
}

export const blogRoute = new Hono<{Bindings:bindings,Variables:variables}>();//setting context of env variable, here .toml file(https://hono.dev/getting-started/cloudflare-workers#load-env-when-local-development) and  upcoming key(userId) we'r adding in middleware (https://hono.dev/api/context#contextvariablemap https://hono.dev/api/context#set-get)


blogRoute.use(authMiddleware) //passed in as callback

blogRoute.post('/',async(c)=>{
	const body = await c.req.json();
	const validate=createPost.safeParse(body);
	if(!validate.success){
		c.status(411);
		return c.json({
			message:validate.error.issues[0].message
		})
	}
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
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
	const validate= updatePost.safeParse(body);
	if(!validate.success){
		c.status(411);
		return c.json({
			message:validate.error.issues[0].message
		})
	}
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const updatedPost=prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title!=null?body.title:undefined,     //https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/null-and-undefined#null-and-undefined-in-a-graphql-resolver
			content: body.content!=null?body.content:undefined
		}
	});
	if(!updatedPost){
		c.status(404);
		return c.json({error:"post not found"})
	}
	return c.json({updatedPost});
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
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	
	try{
		const post = await prisma.post.findFirst({
			where: {
				id
			}
		});
		if(!post){
			c.status(404);
			return c.json({error:"post not found"})
		}
		return c.json(post);
	}catch(e){
		c.status(411);
		return c.json({error:"error while fetching blog"})
	}
});
