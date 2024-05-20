import { createMiddleware } from 'hono/factory'
import { verify } from 'hono/jwt';

const authMiddleware= createMiddleware(async (c, next) => {
	const jwt = c.req.header('Authorization') || "";
	// if (!jwt) {
	// 	c.status(401);
	// 	return c.json({ error: "unauthorized" });
	// }
	const payload = await verify(jwt, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ message :"You are not logged in" });
	}
	c.set('userId', payload.id);
	await next()
});
export default authMiddleware;

//https://hono.dev/guides/middleware#middleware