// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { AppRouter } from "./config";
// import { loginServer } from "./actions";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   pages: {
//     signIn: AppRouter.login,
//     signOut: AppRouter.login,
//     newUser: AppRouter.login,
//     error: AppRouter.login,
//   },

//   secret: process.env.AUTH_SECRET,

//   providers: [
//     Credentials({
//       credentials: {
//         email: { label: "Email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize({ password, email }) {
//         if (typeof password !== "string" || typeof email !== "string") {
//           throw Error("Error 500, datos invalidos");
//         }
//         const res = await loginServer(email, password);
//         return res as any;
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//     maxAge: 3600,
//   },

//   callbacks: {
//     jwt({ token, user }) {
//       if (user) {
//         token.id = user.id as any;
//         token.nickname = user.nickname;
//         token.permisos = user.permisos;
//         token.token = user.token;
//       }
//       return token;
//     },
//     session({ session, token }) {
//       session.user = session.user || {};
//       session.user.id = token.id;
//       session.user.nickname = token.nickname;
//       session.user.permisos = token.permisos;
//       session.user.token = token.token;
//       return session;
//     },
//   },
// });
