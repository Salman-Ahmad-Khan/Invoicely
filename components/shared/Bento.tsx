import Image from "next/image";
import ShimmerButton from "../ui/shimmer-button";
import BentoImage from "@/public/bento.jpg";
export default function Bento() {
  return (
    <div className="relative bg-black text-white  flex items-center justify-center mb-10 p-3 h-screen">
      <div className="absolute inset-0">
        <Image
          src={BentoImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="opacity-35  filter grayscale"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-12 max-w-4xl bg-gradient-to-br from-white via-gray-500 to-gray-00 text-transparent bg-clip-text">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          Your Business. Your Clients. <br />
          <span className="">One Free, Powerful Invoicing Platform.</span>
        </h1>
        <p className="text-gray-300 mb-6 text-lg sm:text-xl md:text-2xl">
          The simplest way to manage your finances.
        </p>
        <div className="flex justify-center">
          <ShimmerButton className="px-8 py-4 text-center text-base sm:text-lg md:text-xl font-semibold bg-primary text-white rounded-full hover:bg-primary/50 transition duration-300 ease-in-out">
            Send your first invoice today
          </ShimmerButton>
        </div>
      </div>
    </div>
  );
}
