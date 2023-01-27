import sgMail from "@sendgrid/mail";
import * as jose from "jose";
import { middleware } from "../../../utils/base";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  middleware(req, res).catch(() => {
    res.status(400).end();
  });
  if (req.headers.origin !== process.env.CORS_ORIGIN_INTERNAL) {
    return res.status(403).end();
  }
  const authorization = req.headers.authorization;
  const { iss, aud } = req.body;
  const alg = "RS256";
  const publicKey = await jose.importSPKI(process.env.RSA_PUBLIC_KEY, alg);
  return jose
    .jwtVerify(authorization, publicKey, {
      issuer: iss,
      audience: aud,
    })
    .then(async ({ payload }) => {
      const { fullName, email, message } = payload;
      const msg = {
        to: "guille1000142@gmail.com",
        from: "guilledevelop01@gmail.com",
        subject: "Contact support",
        text: `{fullName} ${email} ${message}`,
        html: `<h2>${fullName} ${email} ${message}</h2>`,
      };
      return sgMail
        .send(msg)
        .then(() => {
          return res.status(202).end();
        })
        .catch(() => {
          return res.status(500).end();
        });
    })
    .catch((err) => {
      return res.status(403).send({ err });
    });
}
