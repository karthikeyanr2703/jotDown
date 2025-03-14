import { SignUp } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="flex items-center justify-center w-full h-dvh">
      <SignUp />
    </div>
  );
};

export default page;
