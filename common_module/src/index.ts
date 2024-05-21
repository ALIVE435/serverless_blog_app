import z from "zod"
//backend will need these zod schema/variables
export const signupInp=z.object({
	email:z.string().email({ message: "Invalid email format" }),
	password:z.string().min(6),
	name:z.string().optional()
})
export const signinInp=z.object({
    email:z.string().email({ message: "Invalid email format" }),
	password:z.string()
})

export const createPost =z.object({
    title:z.string(),
    content:z.string(),
})

export const updatePost =z.object({
    title:z.string(),
    content:z.string(),
    id:z.string()
})

//type inference in zod, frontend will need these types
export type signupInp = z.infer<typeof signupInp>;
export type signinInp = z.infer<typeof signinInp>;
export type createPost= z.infer<typeof createPost>;
export type updatePost= z.infer<typeof updatePost>;