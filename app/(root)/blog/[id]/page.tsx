import { Suspense } from "react";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";\
import { client } from "@/sanity/lib/client";

import BlogCard, { BlogTypeCard } from "@/components/BlogCard";



export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

const [post, playlist] = await Promise.all([
  client.fetch(STARTUP_BY_ID_QUERY, { id }),
  client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks-new" }),
]);

if (!post) return notFound();

const editorPosts = playlist?.select ?? [];

const pitchContent = typeof post.pitch === "string" ? post.pitch : "";
const parsedContent = md.render(pitchContent);

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">date</p>

        <h1 className="heading-blog">{post.title}</h1>
        <p className="sub-heading-blog !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <Image
          src={post.image}
          alt="thumbnail"
          width={800}
          height={450}
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-bold">Blog Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="divider" />

        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Top Recommended Blogs</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: BlogTypeCard, i: number) => (
                <BlogCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

      </section>
    </>
  );
};

export default Page;
