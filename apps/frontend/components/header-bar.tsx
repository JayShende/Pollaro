import { auth } from "@/auth";
import { interFont } from "@/fonts/font";
import { cn } from "@/lib/utils";
import Image from "next/image";
import UserAvatar from "./ui/user-avatar";

const HeaderBar = async () => {
  const session = await auth();
  if (!session?.user) {
    return (
      <div className="bg-emerald-100 w-full h-10 flex items-center justify-center text-sm text-red-500">
        No active session
      </div>
    );
  }
  const { name, image, email } = session.user;
  if (name == null || name == undefined) {
    return;
  }
  if (email == null || email == undefined) {
    return;
  }
  if (image == null || image == undefined) {
    return;
  }
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "NA";
  if (initials == null || initials == undefined) {
    return;
  }
  return (
    <div className="bg-indigo-50 h-16 px-6 py-2 flex justify-between items-center">
      <div className="flex  items-center">
        <Image
          src="https://d2umaa5a4grwi8.cloudfront.net/projects/pollaro/assets/logo_2.png"
          width={60}
          height={60}
          alt="logo-pollaro"
        />
        <span
          className={cn(
            "text-2xl font-bold text-gray-900",
            interFont.className
          )}
        >
          Pollaro
        </span>
      </div>
      <div>
        <UserAvatar
          name={name}
          image={image}
          email={email}
          initials={initials}
        />
      </div>
    </div>
  );
};

export default HeaderBar;
