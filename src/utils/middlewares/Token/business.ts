import TokenUtils from "../../TokenUtils";

export default async function (req, res, next) {
  const invalid = (expired = false) =>
    res.status(401).json({
      message: `${expired ? "Expired" : "Invalid"} institution session`,
    });

  const { business, needValidate } = req.headers;
  if (needValidate) {
    if (!business) return invalid(false);

    const { valid, expired, data } = await TokenUtils.validateToken({
      token: business,
    });
    if (!valid) return invalid(expired);

    req.business = data;
    return next();
  }
}
