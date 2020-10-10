import TokenUtils from "../../TokenUtils";

export default async function (req, res, next) {
  const invalid = (expired = false) =>
    res.status(401).json({
      message: `${expired ? "Expired" : "Invalid"} institution session`,
    });

  const { bussines, needValidate } = req.headers;
  if (needValidate) {
    if (!bussines) return invalid(false);

    const { valid, expired, data } = await TokenUtils.validateToken({
      token: bussines,
    });
    if (!valid) return invalid(expired);

    req.bussines = data;
    return next();
  }
}
