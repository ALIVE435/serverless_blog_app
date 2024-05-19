import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge' //not prisma/client it is edge for the serverless environment
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign,decode,verify} from "hono/jwt"
import { env } from 'hono/adapter'


// Create the main Hono app
const app = new Hono();

type Bindings={
	DATABASE_URL:string;
	JWT_SECRET:string;
}
app.post('/api/v1/signup', async (c) => {
	const secret=env<Bindings>(c);
	const prisma = new PrismaClient({
		datasourceUrl: secret.DATABASE_URL
	}).$extends(withAccelerate());

	const body = await c.req.json();
	console.log(body)
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password,
				name:body.name
			}
		});

		const jwt= await sign({
			id:user.id
		},secret.JWT_SECRET)
		return c.json(user)
	} catch(e) {
		c.text("invalid")
		return c.status(403);
	}
	//return c.text('signup route')
})

app.post('/api/v1/signin', (c) => {
	return c.text('signin route')
})

app.get('/api/v1/blog/:id', (c) => {
	const secret=env<Bindings>(c);
	const prisma = new PrismaClient({
		datasourceUrl: secret.DATABASE_URL
	}).$extends(withAccelerate())

	console.log(secret);
	const id = c.req.param('id')
	console.log(c.env);
	return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {

	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
	return c.text('signin route')
})

export default app;




/*here index.ts file/backend is not being written in express it is hono(or can say cloudflare), which will eventually access the database
via connection pool. Prisma-accelerate is another offering of prisma that creates connection pool, that connection
pool url put in .toml file is accessed by this file(cloudflare) in order to connect to the database. Here prisma 
client in this edge environment(serverless) is connected with accelerate using the pool url from .toml file.

## Initially hono is given access to the .toml file using Bindings https://hono.dev/getting-started/cloudflare-workers.
## Tyescript begins to complain if dont explicitly define the types of Bindings bcz hono doesn't have the the permission
to the .toml directly,it doesn't know what gonna come https://hono.dev/helpers/adapter#env https://github.com/honojs/hono/issues/799
## In each route, prisma client is initialised to have autogenerated client which hono use to talk to db, for that 
prisma client connect to db via prisma accelerate(connection pool) using connection pool url.
## After each change in the schema file we need to create migration using npm prisma generate dev --name "",
for this prisma looks to .env files to have accces to the db via db url directly
## Then we generate client using npm generate client --no engine, https://console.prisma.io/clw7qpnfy000cw80veen8hs39/clw7r1ozv002ew80v1g6q68ym/clw7r1ozv002fw80vzw1t24mu/accelerate/setup
 */