import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
  if (!credentials?.email || !credentials?.password) {
    return null;
  }

  const parent = await prisma.parent.findUnique({
    where: {
      email: credentials.email as string,
    },
  });

  if (!parent) {
    return null;
  }

  const passwordMatch = await bcrypt.compare(
    credentials.password as string,
    parent.passwordHash
  );

  if (!passwordMatch) {
    return null;
  }

  return {
    id: parent.id,
    name: parent.name,
    email: parent.email,
  };
}
    }),
  ],

  session: {
    strategy: "jwt",
  },
});