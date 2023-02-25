import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  secret: process.env.JWT_SECRET,
  // jwt: {
  //   secret: process.env.JWT_SECRET,
  // },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
      // @ts-ignore
      scope: 'read:user',
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      type: 'credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          value: 'guest@gmail.com',
          placeholder: 'email@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          value: '123456',
          placeholder: 'password',
        },
      },

      async authorize(credentials) {
        const { email, password } = credentials;
        if (email !== 'guest@gmail.com' || password !== '123456') {
          return null;
        }
        return {
          id: 1234,
          name: 'guest',
          email: 'guest@gmail.com',
          image:
            'https://api.dicebear.com/5.x/adventurer/svg?backgroundType=gradientLinear,solid',
        };
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refreshToken,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.tag = session.user.name
        .split(' ')
        .join('')
        .toLocaleLowerCase();
      session.user.uid = token.sub;
      return session;
    },
  },
});
