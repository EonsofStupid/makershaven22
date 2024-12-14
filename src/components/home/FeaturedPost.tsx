import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Star, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useAtom } from 'jotai';
import { userAtom } from "@/lib/store/atoms/auth";

export const FeaturedPost = () => {
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