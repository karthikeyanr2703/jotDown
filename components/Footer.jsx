import dynamic from "next/dynamic";
const Footer = () => {
  return (
    <div className="grid bg-black text-white text-center w-full py-2 place-content-center">
      <h3 className="font-bold text-xl">JotDown</h3>
      <p className="font-light tracking-wider text-slate-400 text-xs">
        The most easy to use journaling app
      </p>
      <p className="text-sm tracking-wider font-bold">Let's jot</p>
      <div className="flex flex-row items-center justify-center gap-5">
        {/* <Link href="https://www.linkedin.com/in/karthikeyan273/" className="cursor-pointer">
          <Linkedin />
        </Link>
        <Link href="https://x.com/KarthikeyanR327">
        <Annoyed />
        </Link>
        <Link href="https://github.com/karthikeyanr2703">
          <Github />
        </Link> */}
      </div>
    </div>
  );
};

export default Footer;
