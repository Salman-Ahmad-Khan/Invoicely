import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function Verify() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#f2f8fc,transparent)]"></div>
      </div>
      <Card className="w-[380px] px-5">
        <CardHeader className="text-center">
          <div className="mb-4 mx-auto flex size-20 items-center justify-center rounded-full bg-secondary">
            <Mail className="size-12 text-primary" />
          </div>

          <CardTitle className="text-2xl font-semibold text-gray-900">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-gray-600">
            A verification link has been sent to your email. Please check your
            inbox to proceed.
          </CardDescription>
        </CardHeader>

        {/* Content */}
        <CardContent>
          <div className="mt-4 rounded-md bg-secondary border border-primary-foreground p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground ml-3">
                Don’t forget to check your spam folder just in case!
              </p>
            </div>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="mt-6 flex flex-col gap-y-4">
          {/* Resend Email Link */}
          <p className="text-center text-sm text-gray-600">
            Didn’t receive an email?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Resend
            </Link>
          </p>

          {/* Back to Homepage Button */}
          {/* <Link
            href="/"
            className={buttonVariants({
              className: "w-full text-base font-medium",
              variant: "outline",
            })}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Homepage
          </Link> */}
        </CardFooter>
      </Card>
    </div>
  );
}