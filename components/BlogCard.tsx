import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Author, Blog } from "@/sanity/types";
import { Skeleton } from "@/components/ui/skeleton";

export type BlogTypeCard = Omit<Blog, "author"> & { author?: Author };

const BlogCard = ({ post }: { post: BlogTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  return (
    <li className="blog-card group">
      <div className="flex-between">
        <p className="blog-card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image || "/default-avatar.png"}
            alt={author?.name || "User avatar"}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="blog-card_desc">{description}</p>

        <Image
          src={image || "/default-image.png"}
          alt="placeholder"
          className="blog-card_img"
          width={600}
          height={400}
          style={{ objectFit: "cover" }}
        />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="blog-card_date text-16-medium">{category}</p>
        </Link>
        <Button className="blog-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="blog-card_skeleton" />
      </li>
    ))}
  </>
);

export default BlogCard;
