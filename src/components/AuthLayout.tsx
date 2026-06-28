import Link from "next/link";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerLink: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLink,
}: AuthLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-blue-50 p-4 sm:p-8">
      {/* Background decoration */}
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-200/50 blur-2xl" />
      <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-blue-300/40 blur-3xl" />

      <section className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white bg-white shadow-2xl shadow-blue-200/50 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Form section */}
        <div className="flex flex-col justify-center px-6 py-8 sm:px-10 lg:px-12">
          <Link href="/" className="mb-8 flex w-fit items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-xl font-black text-white shadow-lg shadow-blue-200">
              G
            </span>

            <span>
              <span className="block text-sm font-black tracking-wider text-slate-900">
                GENEXCEL
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Parent Companion
              </span>
            </span>
          </Link>

          <div className="w-full max-w-md">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-blue-600">
              Genexcel Parent Companion
            </p>

            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              {title}
            </h1>

            <p className="mb-6 mt-2 text-sm leading-6 text-slate-500">
              {subtitle}
            </p>

            {children}

            <p className="mt-7 text-center text-sm text-slate-500">
              {footerText}{" "}
              <Link
                href={footerLink}
                className="font-bold text-blue-600 hover:underline"
              >
                {footerLinkText}
              </Link>
            </p>
          </div>
        </div>

        {/* Illustration section */}
        <aside className="relative hidden min-h-[520px] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-blue-300 p-12 lg:flex">
          <div className="absolute right-10 top-10 h-24 w-24 rounded-full border border-white/70" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/40" />

          <div className="relative z-10 mb-10 max-w-lg text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600">
              Always by their side
            </p>

            <h2 className="mt-3 text-2xl font-black text-slate-900">
              Stay connected, wherever you are.
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
              Celebrate progress, receive important updates, and stay close to
              every step of your child&apos;s learning journey.
            </p>
          </div>

          {/* Dashboard illustration */}
          <div className="relative z-10 w-full max-w-lg">
            <div className="rounded-3xl border-4 border-blue-900 bg-white p-5 shadow-2xl shadow-blue-500/20">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="h-3 w-28 rounded-full bg-blue-200" />
                  <div className="mt-2 h-2 w-20 rounded-full bg-slate-100" />
                </div>

                <div className="h-10 w-10 rounded-full bg-blue-100" />
              </div>

              <div className="grid grid-cols-[1fr_130px] gap-5">
                <div className="space-y-4">
                  {[75, 55, 90, 65].map((width, index) => (
                    <div key={index}>
                      <div className="mb-2 h-2 w-16 rounded-full bg-slate-200" />
                      <div className="h-3 rounded-full bg-blue-100">
                        <div
                          className="h-3 rounded-full bg-blue-500"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid place-items-center">
                  <div className="relative grid h-28 w-28 place-items-center rounded-full bg-blue-100">
                    <div className="absolute inset-0 rounded-full border-[22px] border-blue-500 border-r-blue-200 border-t-blue-300" />
                    <div className="relative h-12 w-12 rounded-full bg-white" />
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="h-14 rounded-xl bg-blue-50" />
                <div className="h-14 rounded-xl bg-blue-100" />
                <div className="h-14 rounded-xl bg-blue-50" />
              </div>
            </div>

            <div className="absolute -bottom-7 -left-7 rounded-2xl bg-white p-4 shadow-xl">
              <div className="flex items-end gap-2">
                <span className="h-7 w-3 rounded bg-blue-300" />
                <span className="h-12 w-3 rounded bg-blue-600" />
                <span className="h-9 w-3 rounded bg-blue-400" />
                <span className="h-14 w-3 rounded bg-blue-500" />
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}