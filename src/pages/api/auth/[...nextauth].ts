import type { JwtPayload } from 'jwt-decode';
import jwt_decode from 'jwt-decode';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

import { PATH_AUTH } from '@/routes/path';
import type { ResLogin } from '@/shared/types/authType';

import { CodeSmoothApi } from '../../../api/codesmooth-api';

export default NextAuth({
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'crcedentials',
      // init object credentials for authorize
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Mật khẩu',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        try {
          const data: ResLogin = await CodeSmoothApi.login(
            credentials!.email,
            credentials!.password,
          ).then((res) => {
            return res.data; // return the data from the server response (token, user) as a object (token, user) with the type ResLogin
          });
          if (data) {
            const { access_token: accessToken, refresh_token: refreshToken } = data.token; // We get the access token and the refresh token from the data object.

            const accessTokenExpirationTime =
              (jwt_decode<JwtPayload>(accessToken).exp as number) * 1000 - 10;
            // minus 10 seconds before expiration time to prevent token expiration error in the browser side unit ms

            return {
              ...data.user,
              accessToken,
              accessTokenExpires: accessTokenExpirationTime,
              refreshToken,
            };
            // return new object user contain token
          }
          return null; // if the data is null, return null
        } catch (e: any) {
          throw new Error(e.response.data.message); // if the server response is an error, throw an error with the message from the server
        }
      },
    }),
  ],
  callbacks: {
    // The jwt() callback is called when a new token is created.
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          user,
        };
      }
      return token;
    },
    // The session() callback is called when a user logs in or log out
    async session({ session, token }) {
      // @ts-ignore
      if (session) {
        return {
          ...session,
          token,
        };
      }
      return session;
    },
  },
  // The signIn page is the page that the user is redirected to when they are not logged in.
  pages: {
    signIn: PATH_AUTH.login,
  },
  secret: 'next-auth-secret', // The secret is used to sign the tokens. It should be a long random string.
});
