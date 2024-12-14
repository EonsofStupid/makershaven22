import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useAtom } from 'jotai';
import { userAtom } from "@/lib/store/atoms/auth";

interface PostCardProps {
  delay: number;
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
}

export const PostCard = ({ delay, id, category, title, excerpt, date }: PostCardProps) => {
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