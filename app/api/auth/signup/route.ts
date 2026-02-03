import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {

    const {fullname, password , email}: {fullname: string, password: string, email: string} = await request.json();
    console.log(fullname, password, email);
    
    if(!password ) return NextResponse.json ({
        message: 'Please, send a valid password'
    }, {status: 400});
    else if(password.length < 6) return NextResponse.json({
        message: 'Password must be at least 6 characters long'
    }, {status: 400});
    else if(!fullname) return NextResponse.json({
        message: 'Name field is required'
    }, {status: 400});
    else if(!email) return NextResponse.json({
        message: 'Email field is required'
    }, {status: 400});


    try {
    // conecta a la db antes que nada
    await connectDB();
    
        const findUserEmail = await User.findOne({email});
    // let's see if the user exists before creating a new one
    if(findUserEmail) return NextResponse.json({
        message: "This email is already in use for a user."
    }, {status: 400});
    // if there was no user with that email in the database, we create one

    // before saving the password in the db, we must encrypt it 
    const hashedPassword = await bcrypt.hash(password, 12);
    // this means, the password will be executed 12 times and 
    // will do an algorithm w it, that's what we will store

    const user = new User({
        email: email,
        fullname: fullname,
        password: hashedPassword
    })
    const savedUser = await user.save();
    console.log(savedUser)

    return NextResponse.json({
        email: savedUser.email, fullname: savedUser.fullname, id: savedUser._id
    });
    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            return NextResponse.json({
                message: {e}
            },{status: 400});
        }
    }
} 
