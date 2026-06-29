"use client";
import AuthLayout from "@/components/AuthLayout";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  loginSchema,
  LoginFormData,
} from "@/schemas/loginSchema";

export default function LoginPage() {
  const router = useRouter();
  const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
});
const onSubmit = async (data: LoginFormData) => {
  const result = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });

  if (result?.error) {
    toast.error("Invalid email or password.");
    return;
  }

  toast.success("Login successful!");

  reset();

  setTimeout(() => {
    router.push("/dashboard");
  }, 1200);
};
const onError = (errors: FieldErrors<LoginFormData>) => {
  console.log(errors);
};
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to Genexcel Parent Companion."
      footerText="Don't have an account?"
      footerLinkText="Create account"
      footerLink="/signup"
    >
      <form
  noValidate
  onSubmit={handleSubmit(onSubmit, onError)}
  className="space-y-4"
>
        <Input
  label="Email address"
  type="email"
  placeholder="parent@example.com"
  registration={register("email")}
  error={errors.email?.message}
/>

        <Input
  label="Password"
  type="password"
  placeholder="Enter your password"
  registration={register("password")}
  error={errors.password?.message}
/>

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-500">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 accent-blue-600"
            />
            Keep me signed in
          </label>

          <button
            type="button"
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit">Sign in</Button>
      </form>
    </AuthLayout>
  );
}