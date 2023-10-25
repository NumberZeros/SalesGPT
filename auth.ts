import NextAuth, { type DefaultSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
    } & DefaultSession['user']
  }
}

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental // will be removed in future
} = NextAuth({
  providers: [
    // GitHub,
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, email, password, 2FA token, etc.
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: any, req: any) {
        if (
          credentials.email === 'admin@gmail.com' &&
          credentials.password === 'admin'
        ) {
          return {
            id: new Date().getTime(),
            name: 'admin',
            email: credentials.email,
            name: 'Admin'
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    jwt({ token, profile }) {
      if (profile) {
        token.id = profile.id
        token.image = profile.avatar_url || profile.picture
      }
      return token
    },
    authorized({ auth }) {
      return !!auth?.user // this ensures there is a logged in user for -every- request
    }
  },
  pages: {
    signIn: '/sign-in' // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  }
})
