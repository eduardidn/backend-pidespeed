import TokenUtils from "../../TokenUtils";

export default async function (req, res, next) {
  const invalid = (expired = false) =>
    res.status(401).json({
      message: `${expired ? "Expired" : "Invalid"} institution session`,
    });

  const { admin, needValidate } = req.headers;
  if (needValidate) {
    if (!admin) return invalid(false);

    const { valid, expired, data } = await TokenUtils.validateToken({
      token: admin,
    });
    if (!valid) return invalid(expired);

    req.admin = data;
    return next();
  }
}
