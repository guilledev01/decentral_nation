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
