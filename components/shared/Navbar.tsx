
import Link from "next/link";
import ShimmerButton from "../ui/shimmer-button";

export function Navbar() {
  return (
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <h3 className="text-2xl uppercase font-semibold">
          Invoicely
        </h3>
      </Link>
      <Link href="/login" className="hidden md:block">
        <ShimmerButton className="hover:bg-primary/50 text-lg font-bold">Sign up</ShimmerButton>
      </Link>
    </div>
  );
}