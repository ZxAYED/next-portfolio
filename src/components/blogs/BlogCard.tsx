import Image from "next/image";
import Link from "next/link";
import ZButton from "../shared/ZButton";

export interface IBlogCardProps {
  title: string;
  content: string;
  author: string;
  imageUrl: string;
  _id: string;
}

const BlogCard = ({ blog }: { blog: IBlogCardProps }) => {
  return (
    <div
      className="p-6  md:p-0 relative  h-[550px]  md:h-[500px] "
    >
      <div className="relative w-full h-48">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          layout="fill"
          className="object-cover rounded-lg"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold">{blog.title}</h3>
        <p className="mt-2 text-sm">{blog.content.substring(0, 150)}...</p>
        <p className="mt-8 text-xs ">By {blog.author}</p>
        
      </div>
      <div className="absolute left-6 md:left-0 bottom-4">
          <Link href={`/blogs/${blog._id}`}>
           <ZButton name="Read More"></ZButton>
        </Link>
        </div>
    </div>
  );
};

export default BlogCard;
