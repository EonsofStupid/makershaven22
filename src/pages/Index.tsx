import { Link, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import { ArrowRight, Calendar, Clock, TrendingUp, Users, Star, MessageSquare } from "lucide-react";
import { useAtom } from 'jotai';
import { userAtom } from "@/lib/store/atoms/auth";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const FeaturedPost = () => {
  const [user] = useAtom(userAtom);

  const handleReadMore = () => {
    if (!user) {
      toast.error("Please sign in to read the full post", {
        description: "Create an account to access all content"
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-card p-8 mb-12 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-medium">
              Featured
            </span>
            <div className="flex items-center text-sm text-foreground/60">
              <Star className="w-4 h-4 mr-1.5 text-primary" />
              <span>Trending</span>
            </div>
          </div>

          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            The Rise of Indie Podcasts in 2024
          </h2>
          
          <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
            Discover how independent podcasters are reshaping the media landscape with unique
            perspectives and innovative content formats. Learn about the latest trends, tools,
            and strategies driving this creative revolution.
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-sm text-foreground/60">
                <Calendar className="w-4 h-4 mr-1.5" />
                <span>Mar 15, 2024</span>
              </div>
              <div className="flex items-center text-sm text-foreground/60">
                <Clock className="w-4 h-4 mr-1.5" />
                <span>5 min read</span>
              </div>
              <div className="flex items-center text-sm text-foreground/60">
                <MessageSquare className="w-4 h-4 mr-1.5" />
                <span>24 comments</span>
              </div>
            </div>
            
            <Link
              to={user ? "/post/1" : "/login"}
              onClick={!user ? handleReadMore : undefined}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
            >
              Read More 
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const PostCard = ({ delay, id, category, title, excerpt, date }: { 
  delay: number; 
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
}) => {
  const [user] = useAtom(userAtom);

  const handleReadMore = () => {
    if (!user) {
      toast.error("Please sign in to read the full post", {
        description: "Create an account to access all content"
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <Card className="glass-card h-full group">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img
            src={`https://source.unsplash.com/800x600/?technology,${id}`}
            alt="Post thumbnail"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="p-6">
          <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm mb-4">
            {category}
          </span>
          
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
          
          <p className="text-foreground/80 mb-4 line-clamp-3">
            {excerpt}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center text-sm text-foreground/60">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{date}</span>
            </div>
            
            <Link
              to={user ? `/post/${id}` : "/login"}
              onClick={!user ? handleReadMore : undefined}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
            >
              Read More 
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const Index = () => {
  const [user] = useAtom(userAtom);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

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

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <FeaturedPost />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <PostCard
              key={post.id}
              delay={i}
              id={post.id}
              category={post.category}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;