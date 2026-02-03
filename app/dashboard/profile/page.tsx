'use client'
import { signOut, useSession } from "next-auth/react"
// will give us data from the session, this is a hook


function ProfilePage() {
    const {data: session, status} = useSession();

    console.log(session, status);
  return (
    <div className="flex flex-col w-full px-8 py-6">
      <h2 className="text-3xl ">Hola, <span className="text-red-500">{session?.user?.email}</span></h2>
        <p className="text-2xl">Confirma tu informacion:</p>
        <pre className="bg-gray-800 text-white px-4 py-2 rounded-xl m-6">
          {JSON.stringify({session, status}, null, 2)}
        </pre>
        <div className="bg-gray-500 text-white text-md w-1/2 rounded-lg py-6 px-10">
          <ul className="">
            <li>User image: {session?.user?.image || ' No data'}</li>
            <li>User name: {session?.user?.name || ' No data'}</li>
            <li>MongoDB id: {session?.user?._id || ' No data'}</li>
          </ul>
        </div>
        <button onClick={() => signOut()} className="bg-red-400 hover:bg-red-600 py-2 px-4 rounded m-2 text-white w-30 h-14">sign out</button>
    </div>
  )
}

export default ProfilePage