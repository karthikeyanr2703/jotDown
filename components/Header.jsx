"use client";
import { useUser } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import AvatarLoader from "./AvatarLoader";


const Header = () => {
  const { isLoaded } = useUser();
  return (
    <div className="flex flex-row items-center justify-between h-[60px] px-3">
      <Link href="/">
        <h1 className="font-extrabold text-4xl ">JotDown</h1>
      </Link>
      <div className="flex flex-row items-center justify-center gap-2">
        <Link href="/journal/write">
          <Button
            variant="navbar1"
            className="tracking-wider hidden sm:inline-block"
          >
            Create New
          </Button>
        </Link>
        <SignedOut>
          <SignInButton
            forceRedirectUrl={process.env.CLERK_SIGN_IN_FORCE_REDIRECT_URL}
            mode="redirect"
          >
            <Button variant="navbar2" className="tracking-wider">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>

        {isLoaded ? (
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
              }}
              fallback={<AvatarLoader />}
            />
          </SignedIn>
        ) : (
          <AvatarLoader />
        )}
      </div>
    </div>
  );
};

export default Header;
