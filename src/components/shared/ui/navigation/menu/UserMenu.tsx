import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/lib/store/auth-store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "../../avatar/UserAvatar";
import { UserMenuHeader } from "./UserMenuHeader";
import { UserMenuItem } from "./UserMenuItem";
import { Settings, LogOut } from "lucide-react";

interface UserMenuProps {
  user: {
    email?: string | null;
    role?: string;
    displayName?: string;
    avatarUrl?: string;
  };
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const navigate = useNavigate();
  const { signOut } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <UserAvatar user={user} />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="end">
        <UserMenuHeader user={user} />
        <DropdownMenuSeparator />
        
        <UserMenuItem
          icon={Settings}
          label="Settings"
          onClick={() => navigate("/settings")}
        />
        
        <DropdownMenuSeparator />
        
        <UserMenuItem
          icon={LogOut}
          label="Sign out"
          onClick={handleSignOut}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};