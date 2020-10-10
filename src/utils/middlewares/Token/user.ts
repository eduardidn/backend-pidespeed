import TokenUtils from "../../TokenUtils";

export default async function (req, res, next) {
  const { url } = req;

  if (
    req.method === "OPTIONS" ||
    (url && !(await TokenUtils.needValidate(url)))
  )
    return next();

  const invalid = (expired = false) =>
    res
      .status(401)
      .json({ message: `${expired ? "Expired" : "Invalid"} session` });

  const { authorization } = req.headers;

  if (!authorization) return invalid(false);

  const { valid, expired, data } = await TokenUtils.validateToken({
    token: authorization,
  });
  if (!valid) return invalid(expired);

  req.user = data;
  return next();
}
