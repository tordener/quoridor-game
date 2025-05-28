import { NextResponse } from 'next/server';
import {InsertUser} from '@/lib/db';
import bcrypt from 'bcryptjs';
import db from '@/lib/db';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const smtpUser = process.env.EMAIL_SERVER_LOGIN;
const smtpPass = process.env.EMAIL_SERVER_PSWD;
const verificationCode: string = generateVerificationCode(16);



function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function generateVerificationCode(strength: number): string{
    const letters: string[] = ['0','1','2','3','4','5','6','7','8','9','a','A','b','B'
        ,'C','c','D','d','E','e','f','F','g','G','H','h','I','i','J','j','K'
        ,'k','L','l','M','m','N','n','O','o','P','p','Q','q','R','r','S','s'
        ,'T','t','U','u','V','v','W','w','X','x','Y','y','Z','z'
    ];

    let verificationCode: string = "";
    for(let a = 0; a < strength; a++){
        let randomLocation: number = Math.floor(Math.random() * letters.length);
        let randomLetter: string = letters[randomLocation];
        verificationCode += randomLetter;
    }
    return verificationCode;
}

export async function POST(req: Request) {
    try {
        
        const body = await req.json();
        const {username, email, password} = body;
        console.log('Received body: ', body);

        if(!email || !password || !username || !isValidEmail(email)) {
            return NextResponse.json({error: 'Missing email or password'}, {status: 400});
        }
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            secure: false,
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });
        try {
            await transporter.sendMail({
                from: `quoridor <bartonix@gmail.com>`,
                to: email,
                subject: 'Quoridor user registration - Verify your email',
                html: `
                <table width="100%" height="300px" cellpadding="0" cellspacing="0" border="0" style="background-color: #111827; color: white;">
                    <tr>
                        <td align="center">
                        <table width="600" cellpadding="20" cellspacing="0" border="0" style="background-color: #1F2937; border-radius: 8px;">
                            <tr>
                                <td align="center" style="font-family: Arial, sans-serif; padding: 20px;">
                                    <p style="margin: 0 0 8px 0; font-size: 24px; font-weight: bold; color: white;">${username},</p>
                                    <p style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #9CA3AF;">Welcome to Quoridor!</p>
                                    <p style="margin: 0 0 16px 0; font-size: 14px; font-weight: 400; color: white;">Thanks for signing up. Click the button below to verify your email.</p>
                                    <a href="localhost:3000/verifyUser?user=${username}&verificationCode=${verificationCode}" style="display: inline-block; padding: 10px 20px; background-color: #06B6D4; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">Verify Email</a>
                                </td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                </table>
                `,
            });
            console.log(`E-mail sent to ${email}`);
        } catch (error) {
            console.error('Failed to send email:', error);
        }


        console.log('Checking existing user with email:' , email);
        const existingUser = await db
            .selectFrom('users')
            .selectAll()
            .where('email', '=', email)
            .executeTakeFirst();
        
            if(existingUser){
                return NextResponse.json({error: 'User already exists'}, {status: 409});
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser: InsertUser = {
                username,
                email,
                password: hashedPassword,
                verified: false,
                verification_code: verificationCode,
            };

            const insertedUser = await db
                .insertInto('users')
                .values(newUser)
                .returning(['id', 'username', 'email'])
                .executeTakeFirst();

                return NextResponse.json({message: 'User created', user: insertedUser}, {status: 201});
        } catch (error) {
            console.error('[REGISTER ERROR]', error);
            return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}