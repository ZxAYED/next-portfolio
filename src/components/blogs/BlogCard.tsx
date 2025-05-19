import Image from "next/image";
import Link from "next/link";

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
      className="p-6 transition-all duration-300 rounded-lg shadow-lg hover:shadow-2xl "
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
        <p className="mt-2 text-xs text-gray-500 ">By {blog.author}</p>
        <Link href={`/blogs/${blog._id}`}>
          <p className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline">
            Read more
          </p>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
