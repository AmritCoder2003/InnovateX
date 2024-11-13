"use server";
import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slug from "slugify";
import slugify from "slugify";
import { author } from "@/sanity/schemaTypes/author";
import { writeClient } from "@/sanity/lib/write-client";
export const createPitch = async (state:any, form:FormData,pitch:string) => {
    const session = await auth();
    if(!session) {
        return parseServerActionResponse({
            error:"Not authenticated",
            status:"ERROR"
        });
    };
    const {title , description, category, link}= Object.fromEntries(
        Array.from(form).filter(([key]) => key !== "pitch"),
    );

    const slug =  slugify(title as string , { lower: true , strict: true });

    try{
        const startup = {
            title,
            slug:{
                _type:slug,
                current:slug
            },
            description,
            category,
            image:link,
            pitch,
            author:{
                _type:"reference",
                _ref:session?.id
            }
        }
        const result= await writeClient.create({
            _type:"startup",
            ...startup});

        return parseServerActionResponse({...result,error:"",status:"SUCCESS"});
    }catch(error){
        return parseServerActionResponse({error:
            JSON.stringify(error), status:"ERROR"});
    }
   
};

