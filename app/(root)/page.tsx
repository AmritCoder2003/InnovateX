import Image from "next/image";
import SearchForm from "../components/SearchForm";
import Link from "next/link";
import { title } from "process";
import  StartupCard  from "../components/StartupCard";
import {client} from "../../sanity/lib/client";
import {STARTUPS_QUERY} from "../../sanity/lib/queries";
import {StartupTypeCard} from "../components/StartupCard"
import {sanityFetch , SanityLive } from "../../sanity/lib/live";
import { auth } from "@/auth";
export default async function Home({searchParams}:{searchParams:Promise <{
  query?:string
}>}) {

  

  const query = (await searchParams).query;

  const params = {search: query || null};
  //const posts=await client.fetch(STARTUPS_QUERY);

  //console.log(JSON.stringify(posts,null,2));
  const session = await auth();
  console.log(session?.id);

  const {data :posts} = await sanityFetch({query:STARTUPS_QUERY,params});

  return (
   <>
    <section className="teal_container" >
      <h1 className="heading" > Empowering Tomorrow's Innovations, Today</h1>
      <p className="sub-heading !max-w-3xl ">
        Join the Revolution of Smart Solutions.
    </p>

      <SearchForm query={query} />

    </section>
    <section className="section_container" >
      <p className="text-30-semibold" >
        {query ? `Search Results for "${query}" `: "All Startups"}

      </p>
      <ul className="mt-7  card_grid">
        {posts?.length>0 ?(
          posts.map((post:StartupTypeCard,index:number)=>(
            <StartupCard  key={post?._id} post={post} />
          ))
        ):(
          <p className="no-results" > No results found</p>
        )
         
        }

      </ul>
    </section>
    <SanityLive/>
   </>
  );
}
