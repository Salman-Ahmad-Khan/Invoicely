import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { SubmitButton } from "../../components/shared/SubmitButtons";
import { auth, signIn } from "../utils/auth";

export default async function Login() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#f2f8fc,transparent)]"></div>
      </div>
      <div className="flex h-screen w-full items-center justify-center px-4">
        <Card className="max-w-sm">
        <CardHeader>
        <CardTitle className="text-3xl font-semibold text-gray-900">
          Create Your Account
        </CardTitle>
        <CardDescription className="text-gray-600">
          Join us today! Input your e-mail to get started.
        </CardDescription>
      </CardHeader>
          <CardContent>
            <form
              action={async (formData) => {
                "use server";
                await signIn("nodemailer", formData);
              }}
              className="flex flex-col gap-y-4"
            >
              <div className="flex flex-col gap-y-2">
              <Label className="text-sm text-gray-700 font-medium">Email Address</Label>
            <Input
              name="email"
              type="email"
              required
              placeholder="name@example.com"
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
            />
              </div>
              <SubmitButton text="Login" />
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}