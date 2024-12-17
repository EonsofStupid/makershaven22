import React from "react";
import { useAuthStore } from '@/lib/store/auth/store/auth-store';
import { Outlet } from "react-router-dom";
import { Header } from "@/components/site_layout/header";
import { Footer } from "@/components/site_layout/footer";

const Layout: React.FC = () => {
  const { isLoading, user } = useAuthStore();

  return (
    <div className="layout">
      <Header />
      <main>
        {isLoading ? <div>Loading...</div> : <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;