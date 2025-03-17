
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from '@/components/theme/ThemeContext';

interface SearchButtonProps {
  onClick: () => void;
}

export const SearchButton = ({ onClick }: SearchButtonProps) => {
  const { theme } = useTheme();
  
  const neonCyan = theme?.neon_cyan || '#41f0db';
  const neonPurple = theme?.neon_purple || '#8000ff';

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative group hover:bg-transparent"
      onClick={onClick}
    >
      <Search className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-[#41f0db]" />
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10 rounded-full" />
    </Button>
  );
};
