import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { CodeSmoothApi } from '@/api/codesmooth-api';
import { PATH_AUTH } from '@/routes/path';

// const handleRefreshToken = async (token: JWT) => {
//   try {
//     const tokenData = await CodeSmoothApi.refreshToken({
//       refresh_token: token.refreshToken,
//     });

//     const {
//       access_token: accessToken,
//       refresh_token: refreshToken,
//       expiresIn: accessTokenExpires,
//     } = tokenData.data;
//     // const accessTokenExpirationTime =
//     //   (jwt_decode<JwtPayload>(accessToken).exp as number) * 1000 - 10;
//     return {
//       ...token,
//       accessToken,
//       accessTokenExpires,
//       refreshToken: refreshToken ?? token.refreshToken, // Fall back to old refresh token
//     };
//   } catch (error) {
//     return {
//       ...token,
//       error: ERROR_TOKEN,
//     };
//   }
// };

export const nextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'credentials',
      id: 'credentials',

      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@domain.com',
        },
        password: { label: 'Mật khẩu', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            return null;
          }
          const res = await CodeSmoothApi.login(credentials!.email, credentials!.password);

          if (res) {
            const {
              access_token: accessToken,
              refresh_token: refreshToken,
              expiresIn,
            } = res.data.token;

            const { id, email, username } = res.data.user;
            return {
              id,
              email,
              username,
              accessToken,
              expiresIn,
              refreshToken,
            };
          }
          return null; // Return null if the data is null or no user found
        } catch (e: any) {
          console.log('error', e);
          throw e; // Throw the error if the server response is an error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token, account }) {
      if (user && account) {
        token.accessToken = user.accessToken;
        token.userId = user.id;
        token.email = user.email;
        token.username = user.username;
        token.expiresIn = user.expiresIn;
        return token;
      }
      const expiresInToken = token?.expiresIn;
      const expirationTime = expiresInToken.exp * 1000;
      const currentTime = Date.now();

      // if (expirationTime && expirationTime - currentTime > 30 * 60 * 1000) {
      //   return handleRefreshToken(token);
      // }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken;
        session.user.userId = token.userId;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.error = token.error;
      }

      return session;
    },
  },

  pages: {
    signIn: PATH_AUTH.login,
  },

  secret: 'next-auth-secret',
};

export default NextAuth(nextAuthOptions);
