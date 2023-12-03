import { Inter } from "next/font/google";
import Nav from "~/components/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`font-sans ${inter.variable}`}>
      <Nav />
      <main className="flex min-h-screen flex-col items-center">
        {children}
      </main>
    </div>
  );
}
