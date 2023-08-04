import React from "react";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { signIn, useSession, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const clicked = () => {
    console.log("Clicked");
  };
  return (
    <div className="bg-[#161616] text-white py-4 tracking-wide border-b border-gray-600">
      <div className="max-w-[90%] mx-auto grid grid-cols-2 place-items-center">
        <div className="flex gap-2 justify-center items-center">
          <MdOutlineMarkUnreadChatAlt className="h-8 w-8 text-gray-300" />
          <p className="font-semibold text-xl">SmartChat</p>
        </div>
        <button
          className="bg-[#262626] rounded-md p-4 w-fit cursor-pointer"
          onClick={() => signIn("github")}
        >
          Sign in with GitHub
          {/* <p className="font-semibold text-lg">Sign in with GitHub</p> */}
        </button>
      </div>
    </div>
  );
};

export default Header;
