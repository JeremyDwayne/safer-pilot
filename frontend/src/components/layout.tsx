import { Inter } from "next/font/google";
import Nav from "~/components/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface Props {
  auth: boolean;
  children: React.ReactNode;
}

export default function Layout({ auth, children }: Props) {
  return (
    <div className={`font-sans ${inter.variable}`}>
      <Nav auth={auth} />
      <main className="flex min-h-screen flex-col items-center">
        {children}
      </main>
    </div>
  );
}
