import { Quote } from "../components/Quote"
import { Form } from "../components/Form"

export const Signin=()=>{
    return (
        <>
        <div className="flex h-screen">
            <div className="lg:basis-1/2 bg-gray-700 w-full">
               <Form type={"sign-in"}></Form> 
            </div>
            <div className="hidden basis-1/2 lg:block">
               <Quote/>
            </div>
        </div>
        </>
    )
}