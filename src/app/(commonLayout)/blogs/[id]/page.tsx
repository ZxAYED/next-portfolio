import BlogDetailPage from "@/components/blogs/BlogDetails";



const BlogDetail = async ({ params }: any) => {
  const blogId =await params.id;
  

  return ( 
    <div>
     <BlogDetailPage id={blogId} />
    </div>
  );
};

export default BlogDetail;
