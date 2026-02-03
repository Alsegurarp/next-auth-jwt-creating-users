'use client';
import { FormEvent, useState } from "react";
// we must do the request to auth/signup - we could do it w fetch, but we will with axios
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget); 
    try {
      const res = await signIn('credentials', {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false
      });

      if(res?.error) return setError(res.error as string);

      if(res?.ok) return router.push("/dashboard/profile");
      
      console.log(res);
      // the email used is the one from the signup response, and the password is the one the user declared to create his user 
    } catch (error) {
      throw new Error(`Something went wrong during login: ${error}`);
    }
  }

  return (
    <div className="flex flex-col justify-center h-[100vh] items-center center">
      <form onSubmit={handleSubmit} className="bg-neutral-800/20 space-y-5 px-8 py-4 w-3/12 rounded-md items-center text-center">
        {error && <div className="bg-red-500/90 text-white p-2 mb-2 rounded-md">{error}</div>}
        
        <h2 className="text-black items-center text-center text-lg">Login</h2>
          <input type="text" placeholder="some@mail.com" name="email" className="bg-zinc-200 w-full px-2 py-4 block mb-2 rounded-sm"/>
          <input type="password" placeholder="********" name="password" className="bg-zinc-200 w-full px-2 py-4 block mb-2 rounded-sm"/>
          
          <button className="bg-indigo-400 hover:bg-indigo-600 w-full px-2 py-4 rounded-md text-white">
            Login
          </button>
      </form>
      <div className="flex flex-col bg-neutral-300 mt-6 p-4 rounded-md text-black space-y-6">
        <span className="text-lg text-center text-white rounded-md bg-red-700 border border-white px-4 py-2">Test it out</span>
        <p className="text-lg text-white rounded-md bg-gray-500/50 border border-gray-800 px-4 py-2">alex@mail.com</p>
        <p className="text-lg text-white rounded-md bg-gray-500/50 border border-gray-800 px-4 py-2">password: pepepepe</p>
      </div>
    </div>
  )
}

export default LoginPage;