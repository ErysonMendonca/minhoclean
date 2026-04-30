'use client';

import { AppProvider } from "@/lib/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BubbleBackground from "@/components/BubbleBackground";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminLogin = pathname === '/admin/login';

  return (
    <AppProvider>
      <BubbleBackground />
      {!isAdminLogin && <Header />}
      <main>{children}</main>
      {!isAdminLogin && <Footer />}
    </AppProvider>
  );
}
