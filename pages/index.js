import Image from "next/image";
import { Inter } from "next/font/google";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import Header from "@/components/Header";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ChatBox from "@/components/ChatBox";
import classNames from "classnames";
import MessageList from "@/components/MessageList";
import ChatLogo from "../public/chatTwo.png";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const { data: session } = useSession();
  return (
    <div
      className="h-screen relative"
      style={{ backgroundImage: `url(${ChatLogo.src})` }}
    >
      <Header />
      <div className="h-[calc(100vh-70px)] w-full ">
        {session ? (
          <div className={classNames(session ? "block" : "hidden")}>
            <MessageList />
            <ChatBox />
          </div>
        ) : (
          <div
            className={classNames(
              "absolute inset-0 justify-center items-center",
              session ? "hidden" : "flex"
            )}
          >
            <div className="grid gap-4 text-center">
              <p className="text-2xl lg:text-3xl text-white font-semibold">
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
        )}
      </div>
    </div>
  );
}
