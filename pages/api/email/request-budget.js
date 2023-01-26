import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    res.statusCode = 405;
    res.end();
  }
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.statusCode = 401;
    res.end();
  }
  const {
    fullName,
    companyName,
    email,
    projectName,
    projectDescription,
    domain,
  } = req.body;
  jwt.verify(
    authorization,
    process.env.SECRET_KEY_256,
    function (err, decoded) {
      if (err) {
        res.status(403).send();
        res.end();
      }
      if (!decoded.domain) {
        res.status(400).send();
        res.end();
      }
      if (decoded.domain !== domain) {
        res.status(403).send();
        res.end();
      }
      const msg = {
        to: "guilledevelop01@gmail.com",
        from: "guilledevelop01@gmail.com",
        subject: "Budget request",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
      };
      sgMail
        .send(msg)
        .then(() => {
          res.statusCode = 202;
          res.end();
        })
        .catch(() => {
          res.statusCode = 500;
          res.end();
        });
    }
  );
}
