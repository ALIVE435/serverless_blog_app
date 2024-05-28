import { Quote } from "../components/Quote"
import { Form } from "../components/Form"

export const Signup=()=>{
    return (
        <>
        <div className="flex h-screen">
            <div className="lg:basis-1/2 bg-gray-700 w-full">
               <Form type={"sign-up"}></Form> 
            </div>
            <div className="hidden basis-1/2 lg:block">
               <Quote/>
            </div>
        </div>
        </>
    )
}