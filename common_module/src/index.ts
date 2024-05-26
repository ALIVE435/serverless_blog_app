import z from "zod"
//backend will need these zod schema/variables
export const signupInp=z.object({
	email:z.string().trim().email({ message: "Invalid email format" }),
	password:z.string()
    .min(8,{message:"password must contain atleast 8 character"})
    .regex(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/), {
      message: 'Password must be at least 8 characters long and contain at least one special symbol and one alphanumeric character.'
    }),
	name:z.string().trim().regex(new RegExp(/^\S.{0,}$/),{message:"username should have atleast one alphanumeric character"})
})
export const signinInp=z.object({
    email:z.string().trim().email({ message: "Invalid email format" }),
	password:z.string().trim()
})

export const createPost =z.object({
    title:z.string().trim().regex(new RegExp(/^\S.{0,}$/),{message:"title can't be null"}),
    content:z.string().trim().regex(new RegExp(/^\S.{0,}$/),{message:"content can't be left empty"})
})

export const updatePost =z.object({
    title:z.string().trim().regex(new RegExp(/^\S.{0,}$/),{message:"title can't be null"}),
    content:z.string().trim().regex(new RegExp(/^\S.{0,}$/),{message:"content can't be left empty"}),
    id:z.string()
})

//type inference in zod, frontend will need these types
export type signupInp = z.infer<typeof signupInp>;
export type signinInp = z.infer<typeof signinInp>;
export type createPost= z.infer<typeof createPost>;
export type updatePost= z.infer<typeof updatePost>;