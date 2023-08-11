import Image from "next/image";
import React from "react";

const MessageSkeleton = () => {
  return (
    <div className="py-1 grid place-items-start">
      <div className="flex gap-2 justify-start items-center p-1  md:max-w-[70%] rounded-md ">
        <div className="bg-[#262626] animate-pulse rounded-md p-3 w-16 h-11"></div>
        <div className="bg-[#262626] animate-pulse rounded-md p-3 w-60 h-11">
          <p className="font-semibold shrink-0"></p>
          <p className=""></p>
        </div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
