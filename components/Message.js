import classNames from "classnames";
import {
  differenceInHours,
  format,
  formatDistance,
  formatRelative,
  getDay,
  getISODay,
  isToday,
  isYesterday,
} from "date-fns";
import { isEmpty } from "lodash";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Message = ({ data, messageRef }) => {
  const postedDate = new Date(data?.createdAt);
  const currentDate = new Date();
  const [formattedDate, setFormattedDate] = useState("");
  const [isUserMessage, setIsUserMessage] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (currentDate) {
      if (differenceInHours(currentDate, postedDate) >= 1) {
        setFormattedDate(formatRelative(postedDate, currentDate));
      } else {
        setFormattedDate(
          formatDistance(postedDate, currentDate, { addSuffix: true })
        );
      }
    }
  }, [currentDate, postedDate]);

  useEffect(() => {
    if (!isEmpty(data) && !isEmpty(session)) {
      session.user.name === data?.username
        ? setIsUserMessage(true)
        : setIsUserMessage(false);
    }
  }, [data, session]);

  return (
    !isEmpty(data?.body) && (
      <div
        className={classNames(
          "py-1 grid",
          isUserMessage ? "place-items-end" : "place-items-start"
        )}
      >
        <div
          className={classNames(
            "flex gap-2 justify-start items-center  md:max-w-[60%]",
            isUserMessage && "flex-row-reverse"
          )}
        >
          <Link
            href={`https://github.com/${data?.username}`}
            target="blank"
            className="shrink-0"
          >
            <Image
              alt="message body"
              width={40}
              height={40}
              className="rounded-md"
              src={data?.avatar ? data.avatar : ""}
            />
          </Link>
          <div className="bg-[#075E54]  rounded-md p-3 break-all flex gap-2 justify-center items-center text-white">
            {!isUserMessage && (
              <p className="font-semibold shrink-0">{data?.username}:</p>
            )}
            <p className="">{data?.body}</p>
          </div>
        </div>
        <p className="flex text-sm text-gray-300 pt-1">{formattedDate}</p>
        <div ref={messageRef} />
      </div>
    )
  );
};

export default Message;
