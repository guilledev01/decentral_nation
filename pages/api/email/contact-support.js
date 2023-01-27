import sgMail from "@sendgrid/mail";
import * as jose from "jose";
import { middleware, verifyRecaptcha } from "../../../utils/base";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (msg) => {
  return sgMail.send(msg);
};

export default async function handler(req, res) {
  middleware(req, res).catch(() => {
    res.status(400).end();
  });
  if (req.headers.origin !== process.env.CORS_ORIGIN_INTERNAL) {
    return res.status(403).end();
  }
  const { authorization } = req.headers;
  const { iss, aud } = req.body;
  const publicKey = await jose.importSPKI(process.env.RSA_PUBLIC_KEY, "RS256");
  return jose
    .jwtVerify(authorization, publicKey, {
      issuer: iss,
      audience: aud,
    })
    .then(({ payload }) => {
      const { fullName, email, message, token } = payload;
      return verifyRecaptcha(process.env.RECAPTCHA_SECRET_KEY, token).then(
        (result) => {
          if (result.success) {
            const msgUser = {
              to: email,
              from: "guilledevelop01@gmail.com",
              subject: "Support Request Received",
              text: "Decentral Nation",
              html: `
                <html>
                  <head>
                    <title>Support Request Received</title>
                    <link href='https://fonts.googleapis.com/css2?family=Kanit&display=swap' rel='stylesheet'>
                    <style>
                      body {
                        font-family: 'Kanit', sans-serif;
                      }
                      h1 {
                        color: #000;
                        margin-top: 4rem;
                        margin-bottom: 2rem;
                        text-align: center;
                      }
                      h3 {
                        color: #000;
                        line-height: 0;
                      }
                    </style>
                  </head>
                  <body>
                    <h1>Thank you for contacting our support team</h1>
                    <div class="message" style="font-size: 16px; line-height: 1.5; color: #444; margin: 20px 0;">
                      <span>Dear <strong translate="no">${fullName}</strong>,</span>
                      <br><br>
                      <span>We have received your request and we're glad you reached out to us.</span>
                      <br><br>
                      <span>We understand the importance of your issue and we're committed to providing you with a prompt and efficient resolution. Your request has been received and is   being assigned to one of our support managers who will be in touch with you as soon as possible.</span>
                      <br><br>
                      <span>Best regards,</span>
                      <br><br>
                      <h3 translate="no">Decentral Nation</h3>
                      <img style="width: 100px; height: 100px;" src="http://cdn.mcauto-images-production.sendgrid.net/f220aee7412fb91a/a5a080dc-7b46-49de-80f9-88563179b22a/100x100.png" alt="decentral-nation" />
                    </div>
                    <footer style="font-size: 14px; color: #999; margin-top: 4rem; line-height: 1;">
                      <span>Please note that this email was generated automatically in response to your budget request.</span>
                      <br><br>
                      <span>There is no need to respond to this email.</span>
                      <br><br>
                      <span>Our team will review your request and will be in touch with you shortly to discuss your project in more detail and provide you with a budget estimate.</span>
                      <br><br>
                      <span>If you have any questions or concerns in the meantime, please don't hesitate to contact us at contact@decentralnation.com</span>
                    </footer>
                  </body>
                </html>
              `,
            };
            const msgTeam = {
              to: "guille1000142@gmail.com",
              from: "guilledevelop01@gmail.com",
              subject: "Support Request",
              text: "Decentral Nation",
              html: `
                Full name: <strong>${fullName}</strong>
                <br></br> 
                E-mail: <strong>${email}</strong>
                <br></br> 
                Message: <strong>${message}</strong>
              `,
            };
            return Promise.all([sendMail(msgUser), sendMail(msgTeam)])
              .then(() => {
                return res.status(202).end();
              })
              .catch((err) => {
                return res.status(500).send({ err });
              });
          } else {
            return res.status(403).end();
          }
        }
      );
    })
    .catch((err) => {
      return res.status(403).send({ err });
    });
}
