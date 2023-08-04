import Image from "next/image";
import { Inter } from "next/font/google";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import Header from "@/components/Header";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="">
      <Header />
      <div className="bg-black h-[90vh] w-full relative">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="grid gap-4 text-center">
            <p className="text-3xl text-white font-semibold">
              Sign in with GitHub to join the chat!
            </p>
            <Link
              className="text-gray-400 hover:text-green-200  transition-all duration-200"
              href="https://grafbase.com/?ref=chatbase"
              target="blank"
            >
              Powered by Grafbase & GraphQL Live Queries
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
