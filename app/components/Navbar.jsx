
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {auth, signIn, signOut} from '@/auth'


const Navbar = async () => {
    const session = await auth();
  return (
    <header className='px-5 py-3 bg-white  shadow-sm font-work-sans fade-in ' >
       <nav className='flex justify-between items-center'>
           <Link href='/' className='transition-transform duration-300 hover:scale-105' >
              <Image src='/default1.png' width={144} height={30} alt='logo'/>
           </Link>
           <div className='flex items-center gap-5 text-black font-work-sans  bold-medium ' >
               {session && session?.user?(
                <>
                   <Link href="startup/create"  className='hover:text-teal-600 transition-colors duration-300'>
                      <span>Create</span>
                   </Link>
                   <form  action={async () => { "use server"; await signOut( {redirectTo: "/"}  ) }}>
                      <button type='submit' className='hover:text-teal-600 transition-colors duration-300'>Logout</button>
                   </form >
                   <Link href={`/user/${session?.id}`} className='hover:text-teal-600 transition-colors duration-300'>
                      <span>{session?.user?.name}</span>
                   </Link>
                   
                </>
               ):(
                <>
                <form action={ async () => { "use server";
                     await signIn() } }>
                   <button type='submit' className='hover:text-teal-600 font-bold  transition-colors duration-300'>Login</button>
                </form >

                </>
               )}
           </div>
        </nav>
    </header>
  ) 
}

export default Navbar
