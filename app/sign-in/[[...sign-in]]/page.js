import { SignIn } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <SignIn />
    </div>
  );
};

export default page;
