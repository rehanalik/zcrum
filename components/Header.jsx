import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import UserMenu from "./user-menu";
import { checkUser } from "@/lib/checkUser";
import UserLoading from "./user-loading";

const Header = async () => {
  await checkUser();
  return (
    <>
      <nav className="py-6 px-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src={"/logo2.png"}
            alt="Zcrum Logo"
            width={200}
            height={56}
            className="h-10 w-auto object-contain"
          ></Image>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/project/create">
            <Button
              variant="destructive"
              className="flex items-center gap-2 cursor-pointer"
            >
              <PenBox size={18} />
              <span>Create Project</span>
            </Button>
          </Link>
          <SignedOut>
            <SignInButton forceRedirectUrl="/onboarding">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserMenu />
          </SignedIn>
        </div>
      </nav>
      <UserLoading />
    </>
  );
};

export default Header;
