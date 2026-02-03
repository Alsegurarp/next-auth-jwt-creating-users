import Link from 'next/link'
import React from 'react'
import { ReactNode } from 'react'
import { getServerSession } from 'next-auth';
// TO GET INFO OF THE CURRENT SESSION from the server client
// import useSession from 'next-auth/react';

async function Navbar({ children }: { children: ReactNode }) {

    const session = await getServerSession();

  return (
    <>
      <nav className="bg-zinc-900 p-4">
        <div className="flex justify-between container mx-auto">
          <Link href={"/"}>
            <h2 className="font-bold text-xl text-white">
              Next Auth
            </h2>
          </Link>

          <ul className="flex gap-1">
            
            {session ? (<>
                <li className="px-3 py-1">
                    <Link href={"/dashboard/profile"}>
                        <h2 className="font-bold text-xl text-white">
                            Your profile
                        </h2>
                    </Link>
                </li>
                <li className="px-3 py-1">
              <Link href={"/about"}>
                <h2 className="font-bold text-xl text-white">
                  About
                </h2>
              </Link>
            </li>
                </>
            )  :
           
            (<>
            <li className="px-3 py-1">
              <Link href={"/login"}>
                <h2 className="font-bold text-xl text-white">
                  Login
                </h2>
              </Link>
            </li>
            <li className="px-3 py-1">
              <Link href={"/register"}>
                <h2 className="font-bold text-xl text-white">
                  Register
                </h2>
              </Link>
            </li>
            <li className="px-3 py-1">
              <Link href={"/about"}>
                <h2 className="font-bold text-xl text-white">
                  About
                </h2>
              </Link>
            </li>
            </>)
            }
          </ul>
        </div>
      </nav>
      {children}
    </>
  );
}

export default Navbar