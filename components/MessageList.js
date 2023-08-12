import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { gql, useQuery } from "@apollo/client";
import { isEmpty } from "lodash";
import { useSession } from "next-auth/react";
import classNames from "classnames";
import { useInView } from "react-intersection-observer";
import MessageSkeleton from "./MessageSkeleton";

const MessageList = () => {
  const GetRecentMessageQuery = gql`
    query GetRecentMessages($last: Int) @live {
      messageCollection(last: $last) {
        edges {
          node {
            id
            username
            avatar
            body
            likes
            createdAt
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GetRecentMessageQuery, {
    variables: { last: 100 },
  });

  const [messageList, setMessageList] = useState([]);
  // const [skeletonLength, setSkeletonLength] = useState(10);
  // const bottomDiv = useRef(null);
  const [bottomDiv, inView, entry] = useInView({
    trackVisibility: true,
    delay: 500,
    // rootMargin:"400px",
    threshold: 0.5,
  });

  useEffect(() => {
    setMessageList([]);
    if (!isEmpty(data)) {
      data?.messageCollection?.edges.map((item) => {
        setMessageList((prev) => [...prev, item.node]);
      });
    }
  }, [data]);
  useEffect(() => {
    if (entry?.target) {
      entry.target.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [data, entry?.target]);

  const load = true;

  return (
    <div className="max-h-[calc(100vh-158px)] lg:max-h-[calc(100vh-180px)] max-w-[90%]  lg:max-w-[55%] flex mx-auto overflow-y-scroll scrollbar-none py-4">
      {!inView && !isEmpty(messageList) && isEmpty(error) && (
        <div className="absolute inset-x-0 bottom-20 md:bottom-28 z-50 flex justify-center items-center">
          <div
            className="bg-[#161616] hover:bg-[#272626] transition-all duration-300 lg:cursor-pointer text-white py-3 px-4 rounded-full text-sm"
            onClick={() =>
              entry?.target.scrollIntoView({ behavior: "smooth", block: "end" })
            }
          >
            <p>Scroll to see latest messages</p>
          </div>
        </div>
      )}
      <div className="grid gap-2 w-full">
        {!isEmpty(messageList)
          ? messageList.map((item, index) => {
              return (
                <div key={index}>
                  <Message key={index} data={item} messageRef={bottomDiv} />
                </div>
              );
            })
          : null}
      {loading && (
        <div className="">
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
        </div>
      )}
      </div>
      {
        error && (
          <p className="text-white text-lg">Seems like there is some issue.Please refresh the page.</p>
        )
      }
    </div>
  );
};

export default MessageList;
