import { Navigation } from "./shared/ui/navigation/Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;