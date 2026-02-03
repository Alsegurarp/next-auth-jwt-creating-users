'use client';
import axios, {AxiosError} from "axios";
import { FormEvent, useState } from "react";
// we must do the request to auth/signup - we could do it w fetch, but we will with axios
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


function RegisterPage() {
  const [error, setError] = useState();
  const router = useRouter();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget); 
    try {
        const signUpResponse = await axios.post('/api/auth/signup', {
        fullname: formData.get('fullname'),
        email: formData.get('email'),
        password: formData.get('password')
      });
      // from the response of the signup, we will do something with it
      const res = await signIn('credentials', {
        email: signUpResponse.data.email,
        password: formData.get("password"),
        redirect: false
      });

      if(res?.ok) return router.push("/dashboard");
        // si todo fue bien, redirige a ruta dashboard
      
      console.log(res);
      // the email used is the one from the signup response, and the password is the one the user declared to create his user 
    } catch (error) {
      console.log(error)
        if(error instanceof AxiosError) {
          setError(error.response?.data.message)
        }
      throw new Error('Something went wrong during axios');
    }
  }

  return (
    <div className="flex justify-center h-[100vh] items-center center ">
      <form onSubmit={handleSubmit} className="bg-neutral-800/20 space-y-5 px-8 py-4 w-3/12 rounded-md items-center text-center">
        {error && <div className="bg-red-500/90 text-white p-2 mb-2 rounded-md">{error}</div>}
        
        <h2 className="text-black items-center text-center text-lg">Register</h2>
        <input type="text" placeholder="John Connor" name="fullname" className="bg-zinc-200 w-full px-2 py-4 block mb-2 rounded-sm"/>
        <input type="text" placeholder="email@mail.com" name="email" className="bg-zinc-200 w-full px-2 py-4 block mb-2 rounded-sm"/>
        <input type="password" placeholder="********" name="password" className="bg-zinc-200 w-full px-2 py-4 block mb-2 rounded-sm"/>
        <button className="bg-indigo-400 hover:bg-indigo-600 w-full px-2 py-4 rounded-md text-white">
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterPage

