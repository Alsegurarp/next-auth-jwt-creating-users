import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {connectDB } from '@/libs/mongodb';
import User from '@/models/user';
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email", type: "email", placeholder:"jsmith"},
                password: {
                    label: "Password", type: "password", placeholder: "password"
                }
            },
            async authorize(credentials, req) {
                await connectDB();
                console.log(credentials)
                const userFound = await User.findOne({email: credentials?.email}).select(`+password`);
                // necesito traer el campo password, en mi model no lo retorna, pero lo necesito para comparar que las passwords matchean
                // vas a buscar un user en la db con el email que te mandan
                if(!userFound) throw new Error('Invalid credentials');

                const passwordMatches = await bcrypt.compare(credentials!.password, userFound.password)
                // compara password de la db con la password que estan usando para logear
                if(!passwordMatches) throw new Error('Invalid credentials');
                return userFound;
            }
        })
    ],
    callbacks: {
        jwt({
            token, // datos del token
            user, // datos que el client proviuder le pasa
        }) {
            if(user) token.user = user;
            return token;
        }, session({session, token}) {
            
            console.log(session, token)
            session.user = token.user as any;
            return session;
        },
    },
    pages: {
        // when the user has logged in, i want you to send him to:
        signIn: 'login',
    }
})

export {handler as GET, handler as POST}