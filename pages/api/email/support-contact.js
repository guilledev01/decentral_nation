import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const authorization = req.headers.authorization;
    const { fullName, companyName, email, projectName, projectDescription } =
      req.body;
    if (authorization) {
      jwt.verify(
        authorization,
        process.env.NEXT_PUBLIC_SECRET_KEY_256,
        function (err, decoded) {
          if (err) {
            res.status(403).send();
          }
          if (decoded) {
            const sgMail = require("@sendgrid/mail");
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
              to: "test@example.com", // Change to your recipient
              from: "test@example.com", // Change to your verified sender
              subject: "Sending with SendGrid is Fun",
              text: "and easy to do anywhere, even with Node.js",
              html: "<strong>and easy to do anywhere, even with Node.js</strong>",
            };
            sgMail
              .send(msg)
              .then(() => {
                console.log("Email sent");
              })
              .catch((error) => {
                console.error(error);
              });
          }
        }
      );
    } else {
      res.statusCode = 401;
      res.end();
    }
  } else {
    res.statusCode = 405;
    res.end();
  }
}
