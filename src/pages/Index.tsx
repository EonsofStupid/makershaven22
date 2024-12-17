import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuthStore } from '@/lib/store/auth-store';
import { FeaturedPost } from "@/components/home/FeaturedPost";
import { PostCard } from "@/components/home/PostCard";
import { motion } from "framer-motion";

const posts = [
  {
    id: 2,
    category: "Technology",
    title: "The Future of AI in Content Creation",
    excerpt: "Explore how artificial intelligence is revolutionizing the way we create and consume content.",
    date: "Mar 14, 2024"
  },
  {
    id: 3,
    category: "Design",
    title: "Mastering Modern UI/UX Principles",
    excerpt: "Learn the essential principles of modern user interface and experience design.",
    date: "Mar 13, 2024"
  },
  {
    id: 4,
    category: "Development",
    title: "Building Scalable Web Applications",
    excerpt: "Best practices and patterns for creating maintainable and scalable web applications.",
    date: "Mar 12, 2024"
  }
];

const Index = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#151A24] relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#41f0db]/10 via-[#ff0abe]/10 to-[#8000ff]/10" />
        
        {/* Content */}
        <div className="container relative z-10 mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FeaturedPost />
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
              >
                <PostCard {...post} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;