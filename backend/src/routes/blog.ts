import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import authMiddleware from "../middleware";

type bindings={
    DATABASE_URL:string;
    JWT_SECRET:string;
}
type varibles={
    userId:string;
}

export const blogRouter = new Hono<{Bindings:bindings,Variables:varibles}>();//setting context of env variable here .toml file(https://hono.dev/getting-started/cloudflare-workers#load-env-when-local-development) and  upcoming data from middleware (https://hono.dev/api/context#contextvariablemap https://hono.dev/api/context#set-get)


blogRouter.use(authMiddleware)

blogRouter.put('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
});

blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findUnique({
		where: {
			id
		}
	});

	return c.json(post);
})