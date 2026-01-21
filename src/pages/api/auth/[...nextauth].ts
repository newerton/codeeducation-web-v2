import verifyJwt from '@utils/verify-jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import api from '@services/api';

const createOptions = (req: NextApiRequest) =>
  ({
    pages: {
      signIn: '/login',
    },
    providers: [
      Credentials({
        name: 'Login',
        credentials: {},
        async authorize(credentials: any) {
          const { data, status } = await api.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            credentials,
          );

          if (status === 200) {
            const accessToken = data.access_token;

            if (!verifyJwt(accessToken)) {
              return null;
            }

            const { data: userData } = await api.get(
              `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            );

            const json = {
              ...userData,
              jwt: accessToken,
            };
            return json;
          }

          return null;
        },
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
    session: {
      strategy: 'jwt',
      // Seconds - How long until an idle session expires and is no longer valid.
      // maxAge: 30 * 24 * 60 * 60, // 30 days
      // updateAge: 24 * 60 * 60, // 24 hours
    },

    // https://next-auth.js.org/configuration/options#jwt
    jwt: {
      secret: process.env.NEXTAUTH_SECRET,
      // Set to true to use encryption (default: false)
      // encryption: true,
      // You can define your own encode/decode functions for signing and encryption
      // if you want to override the default behaviour.
      // encode: async ({ secret, token, maxAge }) => {},
      // decode: async ({ secret, token, maxAge }) => {},
    },
    callbacks: {
      jwt: async ({ token, user }: any) => {
        if (req.url === '/api/auth/session?update') {
          const { status, data: userData } = await api.get(
            `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
            {
              headers: {
                Authorization: `Bearer ${token.jwt}`,
              },
            },
          );

          if (status === 200) {
            token.name = userData.first_name;
          }
        }
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.name = user?.first_name as string;
          token.first_name = user.first_name;
          token.last_name = user.last_name;
          token.jwt = user.jwt;
        }
        return Promise.resolve(token);
      },
      session: async ({ session, token }: any) => {
        session.jwt = token.jwt;
        session.id = token.id;
        return Promise.resolve(session);
      },
    },
  } as NextAuthOptions);

const NextAuthHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, createOptions(req));
};

export default NextAuthHandler;
