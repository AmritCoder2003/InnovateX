import React from 'react'
import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import {Button} from '../../components/ui/button'
import {Startup} from '../../sanity/types'
import { Author } from '../../sanity/types'

export type StartupTypeCard = Omit<Startup, "author"> & {
  author?: Author
  
};



const StartupCard = ({post}:{post:StartupTypeCard}) => {
    const {_createdAt,views,title,author,category,_id,image,description}= post;
  return (
    <li className='startup-card group' >
      <div className='flex-between' >
        <p className='startup_card_date' >
           {formatDate (_createdAt)}
        </p>
        <div className='flex  gap-2'>
            <EyeIcon className='size-6 text-teal-500 '/>
            <span className='text-16-medium' >{views}</span>
        </div>
      </div>
      <div className='flex-between  mt-5 gap-5' >
        <div className='flex-1' >
            <Link href={`/user/${author?._id}`}>
              <p className='text-16-medium line-clamp-1' >
                {author?.name}
              </p>
            </Link>
            <Link href={`/startup/${_id}`}>
               <h3 className='text-26-semibold line-clamp-1' >{title}</h3>
            </Link>
        </div>
        <Link href={`/user/${author?._id}`} >
           <Image className='rounded-full' src={author?.image || "/placeholder.png"} alt="placeholder" width={48} height={48} />
        </Link>
      </div>
      <Link href={`/startup/${_id}`} >
         <p className='startup-card_desc' >
            {description}
         </p>
         <Image className='startup-card_img' src={image || "/placeholder.png"} alt="placeholder" width={200} height={200} />
      </Link>
      <div className='flex-between mt-5 gap-3' >
        <Link href={`/?query=${category?.toLowerCase()}`} >
           <p className='text-16-medium ' >{category}</p>
        </Link>
        <Button className='startup-card_btn' asChild >
           <Link href={`/startup/${_id}`}>
             Details
           </Link>
        </Button>
      </div>
       
    </li>
  )
}

export default StartupCard
