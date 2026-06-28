import AuthLayout from "@/components/AuthLayout";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to Genexcel Parent Companion."
      footerText="Don't have an account?"
      footerLinkText="Create account"
      footerLink="/signup"
    >
      <form className="space-y-5">
        <Input
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="parent@example.com"
          required
        />

        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          required
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