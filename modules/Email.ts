import sgMail from "@sendgrid/mail";

import { APP_URL } from "./../constants";
import { makeOneTimeCode } from "./OneTimeCodeHandler";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMailUserVerify = async (
  email: string,
  userName: string,
  mongoose: any
) => {
  try {
    const verificationCode = await makeOneTimeCode(email, 10, mongoose);

    const msg = {
      to: email,
      from: "Nomadable <noreply@nomadable.net>",
      subject: `Please Verify Your Account`,
      text: `${
        userName.length > 0 && `Hi ${userName},\n\n`
      }Thank you for joining Nomadable community! \nHere is the verification link to sign you up completely: \n\n ${APP_URL}/verify-account/${verificationCode} \n\nThanks,\nYuya Uzu from Nomadable`,
    };
    await sgMail.send(msg);
  } catch (err) {
    console.log(err);
  }
};
