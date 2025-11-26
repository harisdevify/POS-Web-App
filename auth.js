import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { apiFetch } from './lib/api';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize({ email, password }) {
        try {
          const user = await apiFetch('/pos-login', {
            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify({ email, password }),
          });

          console.log('Login response:', user);

          if (!user || !user.status) {
            console.log('Login failed:', user?.message);
            return null;
          }

          return {
            id: user.data.user_id.toString(),
            name: user.data.full_name,
            email: user.data.email,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
  },

  secret: process.env.NEXTAUTH_SECRET,
});
