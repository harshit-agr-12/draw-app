"use client";
import { Input } from "@repo/ui/input"
import { Button } from "@repo/ui/button"
import axios from "axios"
import { useRef, useState } from "react";
import Link from "next/link";

export default function AuthPage({ isSignup }: {
    isSignup: boolean
}) {
    const apiUrl = process.env.API_ENDPOINT;

    const emailRef = useRef<HTMLInputElement>(null);

    const nameRef = useRef<HTMLInputElement>(null);

    const passwordRef = useRef<HTMLInputElement>(null);

    const [error , setError] = useState("");

    const [isError , setIsError]= useState(false);

    async function handleSignup() {
        setIsError(false);
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const name = nameRef.current?.value
        if (isSignup) {

            try {
                const res = await axios.post(`http://localhost:3001/api/user/signup`, {
                    email : email,
                    password : password,
                    name : name
                })
            } catch (err:any) {;
                const message = err.response?.data?.message || "wrong input provided"
                setError(message);
                setIsError(true);
            }
        } else {

            try {
                const res = await axios.post(`http://localhost:3001/api/user/login`, {
                    email : email,
                    password : password,
                })

                
            } catch (err:any) {
                const message = err.response?.data?.message || "wrong input provided"
                setError(message);
                setIsError(true);
            }
        }
    }


    return (
        <div className="w-screen h-screen flex  justify-center items-center ">
            <div className="flex flex-col gap-4 p-4 rounded-xl bg-gray-800">
                {isSignup && <Input type="text" placeholder="name" ref={nameRef} />}    
                <Input type="text" placeholder="Email" ref={emailRef} />
                <Input type="password" placeholder="password" ref={passwordRef} />
                <Button onclick={handleSignup}  appName="signup" >{isSignup ? "Sign up" : "Sign in"}</Button>
                {isError && <p className="text-red-600">{error}</p>}
            </div>
        </div>
    )
}
