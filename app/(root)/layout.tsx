
import Navbar from "../components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import { SessionProvider } from "next-auth/react";


export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionProvider>
      <main className="font-work-sans">
        <Navbar />
        {children}
        <AnimatedBackground/>
      </main>
    </SessionProvider>
  );
}
