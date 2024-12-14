import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAtom } from 'jotai';
import { userAtom } from "@/lib/store/atoms/auth";
import { FeaturedPost } from "@/components/home/FeaturedPost";
import { PostCard } from "@/components/home/PostCard";

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
  },
  {
    id: 5,
    category: "Career",
    title: "Navigating the Tech Industry in 2024",
    excerpt: "Essential insights for tech professionals looking to advance their careers.",
    date: "Mar 11, 2024"
  },
  {
    id: 6,
    category: "Tools",
    title: "Essential Developer Tools for 2024",
    excerpt: "A comprehensive guide to the most important tools for modern development.",
    date: "Mar 10, 2024"
  },
  {
    id: 7,
    category: "Community",
    title: "Building a Strong Developer Network",
    excerpt: "Tips and strategies for connecting with other developers and growing your network.",
    date: "Mar 9, 2024"
  }
];

const Index = () => {
  const [user] = useAtom(userAtom);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <FeaturedPost />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <PostCard
              key={post.id}
              delay={i}
              {...post}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;