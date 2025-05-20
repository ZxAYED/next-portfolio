import { getBlogs } from "@/Services/Blogs";
import BlogCard from "@/components/blogs/BlogCard";


export interface IBlogCardProps {
  title: string;
  content: string;
  author: string;
  imageUrl: string;
  _id: string;
}

// export async function generateMetadata()a: Promise<Metadata> {
//   return {
//     title: `Blogs - My Portfolio`,
//     description: `Blogs page for My Portfolio`,
//   };
// }

const BlogsPage = async () => {
 const blogsData = await getBlogs();

  return (
    <section className="px-4 pt-24 md:pt-40 mx-auto pb-60 md:px-0 max-w-7xl">
      <h1 className="mb-8 text-3xl font-bold text-center md:text-5xl md:text-start bg-gradient-to-r from-[#9333EA] to-[#3B82F6] bg-clip-text text-transparent backdrop-blur">Browse latest Blogs </h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogsData?.map((blog: IBlogCardProps) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default BlogsPage;
