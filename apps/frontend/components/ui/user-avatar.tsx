"use client";
import Image from "next/image";
import { signOut } from "next-auth/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { interFont } from "@/fonts/font";
import { Badge } from "./badge";

import { LuBadgeCheck } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { MdLogout } from "react-icons/md";

interface UserAvatarProps {
  name: string;
  email: string;
  image?: string;
  initials?: string;
}

const UserAvatar = ({ name, email, image, initials }: UserAvatarProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div>
          {image == undefined ? (
            <span className="bg-muted flex size-full items-center justify-center rounded-full">
              {initials}
            </span>
          ) : (
            <Image
              src={image}
              alt="profile-pic"
              width={45}
              height={45}
              className="rounded-full ring-2 ring-gray-600 sm:w-8 w-8 sm:h-8 h-8 "
            />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className=" w-fit mr-2 mt-1">
        <div className={cn("flex flex-col gap-y-2", interFont.className)}>
          <div className="mx-2 flex items-center gap-x-2">
            <span className="font-normal text-xs text-gray-500">{name}</span>
            <Badge className="bg-blue-600 text-white" variant="outline">
              <LuBadgeCheck /> Verified
            </Badge>
          </div>
          <div className="mx-2 text-gray-500 flex gap-x-2">
            <MdOutlineEmail className="text-indigo-600" />
            <span className="font-normal text-xs text-gray-500">{email}</span>
          </div>
          <div className="h-px w-full bg-gray-200"></div>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-x-2 rounded-lg border border-gray-300 px-4 py-2 text-xs text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer"
          >
            <MdLogout className="text-indigo-600" size={16} />
            Logout
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserAvatar;
