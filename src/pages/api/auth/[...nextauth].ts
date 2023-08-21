import type { JwtPayload } from 'jwt-decode';
import jwt_decode from 'jwt-decode';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { PATH_AUTH } from '@/routes/path';
import type { ResLogin } from '@/shared/types/authType';

import { StudentApi } from '../../../api/codedrafts-api';

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
          const data: ResLogin = await StudentApi.login(
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
          console.log('error', e);
          throw new Error(e.response.data.message); // if the server response is an error, throw an error with the message from the server
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET || '',
    }),
  ],

  callbacks: {
    // The jwt() callback is called when a new token is created.
    async jwt({ token, user }: any) {
      if (user) {
        if (user.id_token) {
          const data: ResLogin = await StudentApi.loginSocial({
            token: user.id_token,
            social: user.provider || 'google',
          }).then((res) => {
            return res.data; // return the data from the server response (token, user) as a object (token, user) with the type ResLogin
          });
          user.username = data.user.username;
          user.avatar = data.user.avatar;
          user.email = data.user.email;
          user.accessToken = data.token.access_token;
        }

        if (user.access_token) {
          const data: ResLogin = await StudentApi.loginSocial({
            token: user.access_token,
            social: user.provider || 'github',
          }).then((res) => {
            return res.data; // return the data from the server response (token, user) as a object (token, user) with the type ResLogin
          });
          user.username = data.user.username;
          user.avatar = data.user.avatar;
          user.email = data.user.email;
          user.accessToken = data.token.access_token;
        }

        if (user.social_user_id) {
          const data: ResLogin = await StudentApi.loginSocial({
            token: user.access_token,
            social: user.provider || 'facebook',
            social_user_id: user.social_user_id,
          }).then((res) => {
            return res.data; // return the data from the server response (token, user) as a object (token, user) with the type ResLogin
          });
          user.username = data.user.username;
          user.avatar = data.user.avatar;
          user.email = data.user.email;
          user.accessToken = data.token.access_token;
        }

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
          expires: token.accessTokenExpires as string,
        };
      }
      return session;
    },
    async signIn({ user, account }: any) {
      console.log({ user, account });
      if (account.provider === 'google') {
        user.id_token = account.id_token;
      }
      if (account.provider === 'github') {
        user.access_token = account.access_token;
      }
      if (account.provider === 'facebook') {
        user.access_token = account.access_token;
        user.social_user_id = account.id;
      }
      user.provider = account.provider;
      return true;
    },
  },
  // The signIn page is the page that the user is redirected to when they are not logged in.
  pages: {
    signIn: PATH_AUTH.login,
  },
  secret: 'next-auth-secret', // The secret is used to sign the tokens. It should be a long random string.
});
