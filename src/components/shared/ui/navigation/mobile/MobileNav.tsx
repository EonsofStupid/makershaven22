import React from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { MobileNavContent } from "./MobileNavContent";

export const MobileNav = () => {
  const { user } = useAuthStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <MobileNavContent user={user} />
      </SheetContent>
    </Sheet>
  );
};