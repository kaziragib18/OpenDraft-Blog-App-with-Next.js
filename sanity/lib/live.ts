import "server-only";
import { defineLive } from "next-sanity";
import { client } from "@/sanity/lib/client";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.NEXT_PUBLIC_SANITY_BROWSER_TOKEN,
});
