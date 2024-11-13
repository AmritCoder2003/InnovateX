import React from 'react'
import StartupForm from '@/app/components/StartupForm'
import { redirect } from 'next/navigation';

import {auth} from '@/auth'
const page = async() => {
  const session = await auth();
  if(!session){
      redirect('/')
  }
  return (
    <>
      <section className='teal_container !min-h-[230px] ' >
        <h1 className='heading' >
          Submit Your Startup
        </h1>
      </section>
      <StartupForm />
    </>
  )
}

export default page
