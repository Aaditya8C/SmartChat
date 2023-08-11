import { gql, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const AddNewMessage = gql`
  mutation AddNewMessage($username: String!, $avatar: URL, $body: String!) {
    messageCreate(
      input: { username: $username, avatar: $avatar, body: $body }
    ) {
      message {
        id
      }
    }
  }
`;

const ChatBox = () => {
  const { data: session } = useSession();
  const [body, setBody] = useState("");
  const [addNewMessage] = useMutation(AddNewMessage);

  const postMessage = (e) => {
    e.preventDefault();
    if(body){
      addNewMessage({
        variables: {
          username: session?.username ?? "",
          avatar: session.user.image,
          body,
        },
      });
      setBody("");
    }
  };
  return (
    <div className="bg-[#161616] text-white py-2 md:py-4 tracking-wide border-b border-gray-600 absolute bottom-0 inset-x-0 z-50">
      <form onSubmit={postMessage}>
        <div className="max-w-[90%] lg:max-w-[55%] mx-auto flex space-x-8 items-center">
          <div className="bg-[#262626] rounded-md p-3 md:p-4 w-full md:w-3/4">
            <input
              autoFocus
              type="text"
              placeholder="Write a message..."
              className="bg-[#262626] text-white placeholder:text-white outline-none w-full"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <button
            // type="submit"
            className="bg-[#262626] rounded-md p-3 md:p-4 w-1/4 cursor-pointer hover:bg-[#414040] transition-all duration-300"
            // onClick={session ? () => signOut("github") : () => signIn("github")}
          >
            <p className="font-semibold text-lg">Send</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
