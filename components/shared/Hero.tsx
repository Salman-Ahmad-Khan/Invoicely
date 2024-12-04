
import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/public/INVOICELY.gif";
import ShimmerButton from "../ui/shimmer-button";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center">
      <div className="text-center">
        <span className="text-sm md:text-xl text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full">
          Introducing Invoicely 1.0
        </span>
        <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter">
        Quick and {" "}
        <span className="block mb-2 p-2 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 text-transparent bg-clip-text text-opacity-90">
  simple invoicing
</span>


        </h1>

        <p className="text-center text-sm md:text-2xl lg:text-2xl px-4 w-full pt-1">
      Effortlessly create invoices and get paid faster.
    </p>

    <div className="mt-7 mb-12 flex justify-center w-full px-4 sm:px-6 md:px-8">
  <Link href="/login">
    <ShimmerButton className="w-full sm:w-auto px-6 py-3 text-center text-base sm:text-lg md:text-xl font-semibold bg-primary text-white rounded-full hover:bg-primary/50 transition duration-300 ease-in-out">
      Send your first invoice today
    </ShimmerButton>
  </Link>
</div>

      </div>

      <div className="relative items-center w-full py-12 mx-auto mt-12">
      <svg
          className="absolute inset-0 -mt-24 blur-3xl"
          style={{ zIndex: -1 }}
          fill="none"
          viewBox="0 0 400 400"
          height="100%"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_10_20)">
            <g filter="url(#filter0_f_10_20)">
              <path
                d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                fill="#000000"
              ></path>
              <path
                d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                fill="#000000"
              ></path>
              <path
                d="M320 400H400V78.75L106.2 134.75L320 400Z"
                fill="#000000"
              ></path>
              <path
                d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                fill="#000000"
              ></path>
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="720.666"
              id="filter0_f_10_20"
              width="720.666"
              x="-160.333"
              y="-160.333"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              ></feBlend>
              <feGaussianBlur
                result="effect1_foregroundBlur_10_20"
                stdDeviation="80.1666"
              ></feGaussianBlur>
            </filter>
          </defs>
        </svg>
        <Image
          src={HeroImage}
          alt="Hero image"
          unoptimized={true}
          className="relative object-cover w-full border rounded-lg lg:rounded-2xl shadow-2xl"
        />
      </div>
    </section>
  );
}
