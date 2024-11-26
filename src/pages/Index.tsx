import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const FeaturedPost = () => (
  <div className="glass-card p-6 mb-12 animate-fadeIn">
    <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm mb-4">
      Featured
    </span>
    <h2 className="text-3xl font-bold mb-4">The Rise of Indie Podcasts in 2024</h2>
    <p className="text-foreground/80 mb-6">
      Discover how independent podcasters are reshaping the media landscape with unique
      perspectives and innovative content formats.
    </p>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-sm text-foreground/60">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Mar 15, 2024</span>
        </div>
        <div className="flex items-center text-sm text-foreground/60">
          <Clock className="w-4 h-4 mr-1" />
          <span>5 min read</span>
        </div>
      </div>
      <Link
        to="/post/1"
        className="flex items-center text-primary hover:text-primary/80 transition-colors"
      >
        Read More <ArrowRight className="w-4 h-4 ml-1" />
      </Link>
    </div>
  </div>
);

const PostCard = ({ delay }: { delay: number }) => (
  <div
    className="glass-card p-6 animate-fadeIn"
    style={{ animationDelay: `${delay}ms` }}
  >
    <img
      src="/lovable-uploads/d2f4faa8-dc73-4657-b7df-c57378581469.png"
      alt="Post thumbnail"
      className="w-full h-48 object-cover rounded-md mb-4"
    />
    <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm mb-4">
      TV Shows
    </span>
    <h3 className="text-xl font-bold mb-2">Must-Watch Series of the Month</h3>
    <p className="text-foreground/80 mb-4">
      Our curated list of the most compelling series that you shouldn't miss this month.
    </p>
    <div className="flex items-center justify-between">
      <div className="flex items-center text-sm text-foreground/60">
        <Calendar className="w-4 h-4 mr-1" />
        <span>Mar 14, 2024</span>
      </div>
      <Link
        to="/post/2"
        className="flex items-center text-primary hover:text-primary/80 transition-colors"
      >
        Read More <ArrowRight className="w-4 h-4 ml-1" />
      </Link>
    </div>
  </div>
);

const Index = () => {
  return (
    <Layout>
      <FeaturedPost />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <PostCard key={i} delay={i * 100} />
        ))}
      </div>
    </Layout>
  );
};

export default Index;