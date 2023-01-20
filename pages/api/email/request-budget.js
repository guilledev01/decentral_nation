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
            // Send email confirmation to user
            // Send email to manager with user and project information
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
