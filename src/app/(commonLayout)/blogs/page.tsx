import { getBlogs } from "@/app/Services/Blogs";
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
    <section className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-center">Blog Posts</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogsData?.map((blog: IBlogCardProps) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default BlogsPage;
