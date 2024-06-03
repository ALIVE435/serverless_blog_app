import { signinInp ,signupInp } from "@alive435/medium-common"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import axios from "axios"

type props = {
    type: "sign-in" | "sign-up"
}

export const Form = ({ type }: props) => {
    const [postInputs, setPostInputs]= useState<signinInp | signupInp>(
        (type==="sign-up")?{
            name:"",
            email:"",
            password:""
        }:{
            email:"",
            password:""
        }
    );
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate=useNavigate();
    const sendRequest=async (e:React.MouseEvent<HTMLElement>)=>{
        //console.log(`${BACKEND_URL}/api/v1/user${type==="sign-in"?"/signin":"/signup"}`)
        setErrorMessage(null)
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user${type==="sign-in"?"/signin":"/signup"}`,postInputs);
            //console.log(response)
            const jwt=response.data.jwt;
            localStorage.setItem("token",jwt);
            navigate("/blogs")            
        }catch(e:any){
            //console.log(e.response.data.message);
            setErrorMessage(e.response.data.message)
        }
    }
    return (
        <section className="bg-inherit h-full">
            <div className="flex items-center justify-center h-full px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="px-6 py-3 space-y-4 md:space-y-6 sm:p-8 sm:py-5 box-border">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        {type === "sign-up" ? "Create an account" : "Enter Details"}
                        </h1>
                        <div className="space-y-2 md:space-y-3">
                            <div>
                                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">{type === "sign-up" ? "Your Email" : "Enter registered email-id"}</label>
                                <input type="email" name="email" id="email" onChange={(e)=>{
                                    setPostInputs({...postInputs,email:e.target.value})
                                }} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 box-border" placeholder="abc@gmail.com" required={true} />
                            </div>
                            {type==="sign-up"?<div>
                                <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Enter a username</label>
                                <input type="text" name="text" id="username" onChange={(e)=>{
                                    setPostInputs({...postInputs,name:e.target.value})
                                }} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 box-border" placeholder="aniket435" required={true} />
                            </div>:null}
                            <div>
                                <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">{type === "sign-up" ? "Create your password" : "Enter password"}</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" onChange={(e)=>{
                                    setPostInputs({...postInputs,password:e.target.value})
                                }} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 box-border" required={true}/>
                            </div>
                            {errorMessage?<div>{errorMessage}</div>:null}
                            {type==="sign-up"?<div className="flex items-center">
                                <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-3 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required={true} />
                                <label htmlFor="terms" className="ml-3 text-sm font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                            </div>:null}
                            <button type="submit" onClick={sendRequest} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                {type==="sign-up"?"Already have an account?":"To create your account "} <Link to={type==="sign-in"?"/signup":"/signin"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">{type==="sign-up"?"Login here":"Sign-up here"}</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

