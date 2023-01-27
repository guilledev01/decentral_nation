export const openUrl = (url) => {
  window.open(`https://${url}`, "_blank");
};

export const middleware = (req, res) => {
  return new Promise((resolve, reject) => {
    !req.headers.authorization ||
    !req.headers["content-type"] ||
    req.headers["content-type"] !== "application/json" ||
    req.method !== "POST"
      ? reject()
      : resolve();
  });
};

export const verifyRecaptcha = async (token) => {
  const url = "https://www.google.com/recaptcha/api/siteverify";
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: JSON.stringify({
      secret: process.env.RE_CAPTCHA_SECRET_KEY,
      response: token,
    }),
  });
  return await response.json();
};
