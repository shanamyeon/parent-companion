"use client";

import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import AuthLayout from "@/components/AuthLayout";
import Button from "@/components/Button";
import Input from "@/components/Input";

import {
  signupSchema,
  SignupFormData,
} from "@/schemas/signupSchema";

export default function SignupPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      reset();

      // Redirect after a short delay so the user can see the toast
      setTimeout(() => {
        router.push("/login");
      }, 1500);

    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const onError = (errors: FieldErrors<SignupFormData>) => {
    console.log("Validation Errors:", errors);
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="A clearer, closer view of your child's learning starts here."
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLink="/login"
    >
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit, onError)}
        className="space-y-4"
      >
        <Input
          label="Full name"
          placeholder="Enter your full name"
          registration={register("name")}
          error={errors.name?.message}
        />

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
          placeholder="Create a password"
          registration={register("password")}
          error={errors.password?.message}
        />

        <p className="text-xs leading-5 text-slate-400">
          By creating an account, you agree to our Terms and Privacy Policy.
        </p>

        <Button type="submit">
          Create account
        </Button>
      </form>
    </AuthLayout>
  );
}