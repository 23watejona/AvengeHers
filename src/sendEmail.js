import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import generateRandomString from './randomString.js';

export default function sendMail (to, subject, message){

    const transporter = nodemailer.createTransport({
        host : 'smtp.gmail.com',
        port : 465,
        auth : {
        	user : "avengehers1@gmail.com",
        	pass : "qdcl ygfp kqra ljqy"
        }
    })

    const options = {
        from : process.env.EMAIL_SENDER, 
        to,
        subject, 
        text: message,
    }
    /*transporter.sendMail(options, (error, info) =>{
        if(error) console.log(error)
        else console.log(info)
    })*/

}