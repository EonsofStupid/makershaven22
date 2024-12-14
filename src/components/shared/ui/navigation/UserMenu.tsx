import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/store/auth/use-auth";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { 
  User,
  Settings,
  LogOut,
  LayoutDashboard
} from "lucide-react";
import { toast } from "sonner";

interface UserMenuProps {
  onClose: () => void;
}

export const UserMenu = ({ onClose }: UserMenuProps) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Successfully signed out");
      navigate("/login");
      onClose();
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuContent align="end" className="w-56 glass-menu">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.email}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.role?.toUpperCase()}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => {
          navigate("/profile");
          onClose();
        }}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        
        {user?.role === 'admin' && (
          <DropdownMenuItem onClick={() => {
            navigate("/admin/dashboard");
            onClose();
          }}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem onClick={() => {
          navigate("/settings");
          onClose();
        }}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};