import React from "react";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";

const Header = () => {
  const { data: session } = useSession();
  return (
    <div className="bg-[#161616] text-white py-2 md:py-4 tracking-wide border-b border-gray-600 sticky top-0 z-50">
      <div className="max-w-[90%] lg:max-w-[55%] mx-auto flex justify-between items-center">
        <div
          className="flex gap-2 justify-center items-center md:cursor-pointer"
          onClick={() => window.location.reload()}
        >
          <MdOutlineMarkUnreadChatAlt className="h-8 w-8 text-gray-300" />
          <p className="font-semibold text-xl ">SmartChat</p>
        </div>
        <div className="flex gap-4">
          {session && (
            <Image
              alt="profilePage"
              src={session.user.image}
              width={50}
              height={50}
              className="shrink-0 rounded-md w-12 h-12 md:w-12 md:h-12"
            />
          )}
          <button
            className="bg-[#262626] rounded-md p-2 md:p-3 w-fit cursor-pointer shrink-0 hover:bg-[#414040] transition-all duration-300"
            onClick={session ? () => signOut("github") : () => signIn("github")}
          >
            {session ? "Sign out" : "Sign in with GitHub"}
            {/* <p className="font-semibold text-lg">Sign in with GitHub</p> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
