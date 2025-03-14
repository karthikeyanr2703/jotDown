import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import createUser from "@/actions/createUser";
import Link from "next/link";

const Home = async () => {
  await createUser();
  return (
    <div className="flex flex-col items-center justify-center w-full sm:flex-row">
      <div className="w-full h-fit py-7 sm:w-1/2 pl-4 sm:h-[calc(100vh-60px)] sm:py-0">
        <div className="w-full  sm:mt-12 flex flex-col gap-1 items-start justify-center sm:gap-3 ">
          <div className="flex flex-row items-baseline justify-start text-5xl gap-2">
            <div className="hidden sm:inline-block w-24 h-11 rounded-full bg-pink-300  relative overflow-hidden shadow-md">
              <Image
                src="/images/gradient.jpg"
                fill={true}
                className="object-cover brightness-110"
                alt="pinkBg"
              />
            </div>
            <span className="inline-block">Capture your</span>
          </div>
          <div className="text-5xl leading-tight">journey and embrace</div>
          <div className="flex flex-row items-center justify-start text-5xl gap-2">
            <span>each moment</span>
            <Button
              variant="outlineHome"
              className="p-6 text-lg hidden sm:flex sm:items-center sm:justify-center  "
            >
              About Us
            </Button>
          </div>
          <div className="text-5xl leading-tight">of your life with JD</div>
        </div>
        <Link href="/journal/write">
          <Button className="mt-10 rounded-full flex items-center justify-center w-36 h-14">
            <div className="flex text-base flex-row items-center justify-center gap-1 w-full h-full tracking-wider">
              Start Free
              <MoveUpRight size={20} />
            </div>
          </Button>
        </Link>
      </div>
      <div className="w-full p-4 sm:p-1 sm:w-1/2 h-dvh sm:h-[calc(100vh-60px)] grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-4 sm:gap-2">
        <div className="relative hidden col-span-2 rounded-xl overflow-hidden shadow-md sm:block">
          <Image
            src={"/images/lightPurple.png"}
            fill={true}
            alt="purpleBg"
            className="object-cover opacity-90"
          />
          <div className="absolute top-0 left-0 w-full h-full">
            <p className="text-white text-4xl absolute top-6 left-6 font-extrabold">
              Are you ready to jot down your thoughts?
            </p>
            <p className="text-gray-100 font-semibold text-sm absolute bottom-3 left-6 w-[60%] tracking-wider">
              JotDown provides where you can record your ideas, memories, and
              thoughts.
            </p>
            <div className="bg-white rounded-full w-14 h-14 grid place-content-center absolute bottom-6 right-6 cursor-pointer">
              <Link href="/journal/write">
                <MoveUpRight size={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="relative rounded-xl overflow-hidden shadow-md">
          <Image
            src={"/images/lightblue.avif"}
            fill={true}
            alt="blueBg"
            className="object-cover opacity-85"
          />
          <div className="absolute top-4 left-4 bg-white rounded-full text-xl sm:text-xs p-2 tracking-wider">
            analytics
          </div>
          <p className="text-white text-4xl sm:text-2xl absolute top-1/3 left-4 font-bold w-[90%]">
            Mood analytics for tracking your well being and mental health
            journeys
          </p>
        </div>
        <div className="relative rounded-xl overflow-hidden shadow-md">
          <Image
            src={"/images/rightPink.avif"}
            fill={true}
            alt="pinkBg"
            className="object-cover"
          />
          <div className="absolute top-4 left-4 bg-white rounded-full text-xl sm:text-xs p-2 tracking-wider">
            Inspiration
          </div>
          <p className="absolute left-4 top-1/3 text-white text-3xl sm:text-xl w-[90%] font-semibold">
            Daily motivation is available to keep you going
          </p>
          <p className="bottom-1 absolute left-4 text-pink-600 text-xl sm:text-sm tracking-widest">
            This helps you stay on track and achieve your goals
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
