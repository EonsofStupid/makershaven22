import React from "react";
import { useAuthStore } from '@/lib/store/auth';
import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Layout: React.FC = () => {
  const { isLoading, user } = useAuthStore();

  return (
    <div className="layout">
      <Header user={user} />
      <main>
        {isLoading ? <div>Loading...</div> : <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
