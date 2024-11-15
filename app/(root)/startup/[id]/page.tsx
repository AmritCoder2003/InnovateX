import { client } from '@/sanity/lib/client'
import React, { Suspense } from 'react'
import { STARTUP_BY_ID_QUERY ,PLAYLIST_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
//import { sanityFetch } from '@/sanity/lib/live'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import View from '@/app/components/View'
import markdownit from 'markdown-it'
import StartupCard ,{ StartupTypeCard} from '@/app/components/StartupCard'

const md = markdownit()

const page = async ({params}:{params: Promise <{id:string}>}) => {
    const id= (await params).id
    //const {data:post} =await client.fetch({STARTUP_BY_ID_QUERY,{id}})
    const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
    // console.log(post);
   const editorPostsResponse = await client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks" });
  const editorPosts = editorPostsResponse?.select || [];
  console.log(editorPosts);
    if(!post) return notFound();
    const parseContent = md.render(post?.pitch || "")
  return (
   <>
    <section className='teal_container !min-h-[230px] ' >
        <p className='tag' >{formatDate(post?._createdAt)}
           
        </p>
        <h2 className='heading' >{post?.title}</h2>
        <p className='sub-heading' >{post?.description}</p>
        
    </section>
    <section className='section_container' >
        <Image className='w-full h-auto rounded-xl ' src={post?.image} alt={post?.title} width={1000} height={1000} />
        <div className='space-y-5 mt-10 max-w-4xl mx-auto '  >
            <div className='flex-between gap-5'>
                    <Link href={`/user/${post?.author?._id}`} className='flex gap-2 items-center mb-3 ' >
                        <Image className='rounded-full drop-shadow-lg ' src={post?.author?.image || "/placeholder.png"} alt="placeholder" width={64} height={64} />
                        <div>
                            <p className='text-20-medium' >{post?.author?.name}</p>
                            <p className='text-16-medium !text-teal-700 ' >@{post?.author?.username}</p>
                            
                        </div>
                        
                    </Link>
                <p className='category-tag' >{post?.category}</p>
            </div>
            <h3 className='text-30-bold'>
                Pitch Details
            </h3>
            {parseContent ?  (
                <article className='prose max-w-4xl font-work-sans break-all'  dangerouslySetInnerHTML={{__html: parseContent}}/>
            ):(
                <p className='no-result' >No details available</p>
            )}
        </div>
        <hr className='divider' />

        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}


        <Suspense fallback={<Skeleton className='view_skeleton' />} >
            <View id={id} />
        </Suspense>
    </section>
    
   </>
  )
}

export default page
